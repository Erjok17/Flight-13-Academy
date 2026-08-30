const jwt = require('jsonwebtoken');
const { supabase, supabaseAdmin } = require('../config/supabase');
const { generateCode, sendVerificationEmail, sendPasswordResetEmail } = require('../utils/email');
const { OAuth2Client } = require('google-auth-library');

const CODE_EXPIRY_MINUTES = 15;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register user
const register = async (req, res) => {
  try {
    const { email, password, fullName, phone } = req.body;

    console.log('Register request received:', { email, fullName, phone });

    // Server-side password strength check (mirrors frontend rules)
    const hasLetter = /[A-Za-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    if (!password || password.length < 6 || !hasLetter || !hasNumber || !hasSpecial) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters and include a letter, a number, and a special character'
      });
    }

    // Check if user exists - check both profiles and auth.users
    const { data: existingUser, error: findError } = await supabase
      .from('profiles')
      .select('id, email_verified')
      .eq('email', email)
      .maybeSingle();

    if (existingUser) {
      // If user exists and is verified, reject
      if (existingUser.email_verified) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Stale unverified account - clean it up and let this registration proceed
      console.log('Removing stale unverified account for:', email);
      
      // Delete from auth_codes first (if table exists)
      try {
        await supabaseAdmin.from('auth_codes').delete().eq('user_id', existingUser.id);
      } catch (err) {
        console.log('No auth_codes to delete or table missing');
      }
      
      // Delete from profiles
      await supabaseAdmin.from('profiles').delete().eq('id', existingUser.id);
      
      // Delete from auth.users
      try {
        await supabaseAdmin.auth.admin.deleteUser(existingUser.id);
      } catch (err) {
        console.log('Auth user already deleted or not found');
      }
    }

    // Create user in Supabase Auth using admin client
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName }
    });

    if (authError) {
      console.error('Auth error:', authError);
      return res.status(400).json({ error: authError.message });
    }

    // Create profile using admin client (bypasses RLS) - unverified by default
    const profileData = {
      id: authData.user.id,
      email,
      full_name: fullName,
      phone,
      role: 'user',
      email_verified: false,
      created_at: new Date(),
      updated_at: new Date()
    };

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert([profileData])
      .select()
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return res.status(500).json({ error: 'Failed to create profile: ' + profileError.message });
    }

    // Generate and store verification code
    const code = generateCode();
    const expiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);

    const { error: codeError } = await supabaseAdmin
      .from('auth_codes')
      .insert([{
        user_id: authData.user.id,
        email,
        code,
        type: 'email_verification',
        expires_at: expiresAt,
      }]);

    if (codeError) {
      console.error('Code storage error:', codeError);
      return res.status(500).json({ error: 'Failed to generate verification code' });
    }

    // Send verification email
    try {
      await sendVerificationEmail(email, fullName, code);
    } catch (emailError) {
      console.error('Failed to send verification email:', emailError);
      // Don't fail registration if email fails - user can request a resend
    }

    console.log('User registered, verification pending:', email);

    res.status(201).json({
      success: true,
      message: 'Account created. Please check your email for a verification code.',
      requiresVerification: true,
      email
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error during registration: ' + error.message });
  }
};

// Verify email with code
const verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and code are required' });
    }

    const { data: codeRow, error: codeError } = await supabaseAdmin
      .from('auth_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('type', 'email_verification')
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (codeError) throw codeError;
    if (!codeRow) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }

    // Mark code as used
    await supabaseAdmin
      .from('auth_codes')
      .update({ used: true })
      .eq('id', codeRow.id);

    // Mark profile as verified
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .update({ email_verified: true })
      .eq('id', codeRow.user_id)
      .select()
      .single();

    if (profileError) throw profileError;

    // Issue JWT now that they're verified
    const token = jwt.sign(
      { id: profile.id, email: profile.email, role: profile.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: 'Email verified successfully',
      token,
      user: {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        role: profile.role
      }
    });
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(500).json({ error: 'Server error during verification' });
  }
};

// Resend verification code
const resendCode = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, full_name, email_verified')
      .eq('email', email)
      .single();

    if (profileError || !profile) {
      return res.status(404).json({ error: 'No account found with that email' });
    }

    if (profile.email_verified) {
      return res.status(400).json({ error: 'This account is already verified' });
    }

    const code = generateCode();
    const expiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);

    const { error: codeError } = await supabaseAdmin
      .from('auth_codes')
      .insert([{
        user_id: profile.id,
        email: profile.email,
        code,
        type: 'email_verification',
        expires_at: expiresAt,
      }]);

    if (codeError) throw codeError;

    await sendVerificationEmail(profile.email, profile.full_name, code);

    res.json({ success: true, message: 'A new code has been sent to your email' });
  } catch (error) {
    console.error('Resend code error:', error);
    res.status(500).json({ error: 'Server error while resending code' });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Login request received:', email);

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      console.error('Auth error:', authError);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.error('Profile fetch error:', profileError);
    }

    if (profile && profile.email_verified === false) {
      return res.status(403).json({
        error: 'Please verify your email before logging in.',
        requiresVerification: true,
        email: profile.email
      });
    }

    const token = jwt.sign(
      { id: authData.user.id, email, role: profile?.role || 'user' },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    console.log('User logged in successfully:', email);

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: authData.user.id,
        email,
        fullName: profile?.full_name,
        role: profile?.role || 'user'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login: ' + error.message });
  }
};

// Continue with Google
const googleAuth = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ error: 'Missing Google credential' });
    }

    // Verify the token with Google directly - this is what makes it secure,
    // never trust the frontend's claim of who the user is
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, email_verified: googleVerifiedEmail } = payload;

    if (!googleVerifiedEmail) {
      return res.status(400).json({ error: 'Google account email is not verified' });
    }

    // Check if this email already has a profile
    const { data: existingProfile } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    let profile = existingProfile;

    if (!profile) {
      // New user via Google - create both the auth user and profile
      const randomPassword = require('crypto').randomBytes(32).toString('hex');

      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: randomPassword,
        email_confirm: true,
        user_metadata: { full_name: name }
      });

      if (authError) {
        console.error('Google auth - create user error:', authError);
        return res.status(500).json({ error: 'Failed to create account' });
      }

      const { data: newProfile, error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert([{
          id: authData.user.id,
          email,
          full_name: name,
          phone: null,
          role: 'user',
          email_verified: true, // Google already verified this email
          created_at: new Date(),
          updated_at: new Date()
        }])
        .select()
        .single();

      if (profileError) {
        console.error('Google auth - create profile error:', profileError);
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
        return res.status(500).json({ error: 'Failed to create profile' });
      }

      profile = newProfile;
    } else if (!profile.email_verified) {
      // Existing but unverified account signing in with Google - trust Google's verification
      const { data: updatedProfile, error: updateError } = await supabaseAdmin
        .from('profiles')
        .update({ email_verified: true })
        .eq('id', profile.id)
        .select()
        .single();

      if (!updateError) profile = updatedProfile;
    }

    const token = jwt.sign(
      { id: profile.id, email: profile.email, role: profile.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      message: 'Signed in with Google',
      token,
      user: {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        role: profile.role
      }
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ error: 'Server error during Google sign-in' });
  }
};

// Request password reset - sends a code
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, full_name')
      .eq('email', email)
      .maybeSingle();

    // Always respond the same way whether or not the account exists,
    // so this endpoint can't be used to check which emails are registered
    if (!profile) {
      return res.json({ success: true, message: 'If an account exists with that email, a reset code has been sent.' });
    }

    const code = generateCode();
    const expiresAt = new Date(Date.now() + CODE_EXPIRY_MINUTES * 60 * 1000);

    const { error: codeError } = await supabaseAdmin
      .from('auth_codes')
      .insert([{
        user_id: profile.id,
        email: profile.email,
        code,
        type: 'password_reset',
        expires_at: expiresAt,
      }]);

    if (codeError) throw codeError;

    try {
      await sendPasswordResetEmail(profile.email, profile.full_name, code);
    } catch (emailError) {
      console.error('Failed to send password reset email:', emailError);
    }

    res.json({ success: true, message: 'If an account exists with that email, a reset code has been sent.' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ error: 'Server error while processing request' });
  }
};

// Reset password using the code
const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ error: 'Email, code, and new password are required' });
    }

    // Same strength rule as registration
    const hasLetter = /[A-Za-z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    const hasSpecial = /[^A-Za-z0-9]/.test(newPassword);

    if (newPassword.length < 6 || !hasLetter || !hasNumber || !hasSpecial) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters and include a letter, a number, and a special character'
      });
    }

    const { data: codeRow, error: codeError } = await supabaseAdmin
      .from('auth_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .eq('type', 'password_reset')
      .eq('used', false)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (codeError) throw codeError;
    if (!codeRow) {
      return res.status(400).json({ error: 'Invalid or expired code' });
    }

    // Mark code as used
    await supabaseAdmin
      .from('auth_codes')
      .update({ used: true })
      .eq('id', codeRow.id);

    // Actually change the password via the admin API - user isn't authenticated
    // at this point, so this is the only way to set it
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      codeRow.user_id,
      { password: newPassword }
    );

    if (updateError) {
      console.error('Password update error:', updateError);
      return res.status(500).json({ error: 'Failed to reset password' });
    }

    res.json({ success: true, message: 'Password reset successfully. You can now sign in.' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Server error while resetting password' });
  }
};

// Get current user
const getMe = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const updates = req.body;
    
    delete updates.id;
    delete updates.created_at;
    delete updates.role; // prevent self-promotion via profile update
    delete updates.email_verified; // prevent self-verification via profile update

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, message: 'Profile updated successfully', user: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    await supabase.auth.signOut();
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  verifyEmail,
  resendCode,
  googleAuth,
  forgotPassword,
  resetPassword,
  getMe,
  updateProfile,
  logout
};