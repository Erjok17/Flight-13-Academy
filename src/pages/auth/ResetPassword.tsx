import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { Lock, Eye, EyeOff, Check, X, KeyRound } from 'lucide-react';
import { API_URL } from '../../config/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!email) navigate('/forgot-password');
  }, [email, navigate]);

  const passwordCriteria = {
    length: newPassword.length >= 6,
    letter: /[A-Za-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
  };

  const metCount = Object.values(passwordCriteria).filter(Boolean).length;
  const meetsAllRequirements = metCount === 4;

  const getStrength = () => {
    if (!newPassword) return { label: '', color: '#ddd', width: '0%' };
    if (!meetsAllRequirements) return { label: 'Weak', color: '#f44336', width: `${(metCount / 4) * 100}%` };
    if (newPassword.length >= 10) return { label: 'Strong', color: '#4CAF50', width: '100%' };
    return { label: 'Medium', color: '#FF9800', width: '75%' };
  };

  const strength = getStrength();

  const CriteriaRow = ({ met, label }: { met: boolean; label: string }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: met ? '#4CAF50' : '#999' }}>
      {met ? <Check size={13} /> : <X size={13} />}
      {label}
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!meetsAllRequirements) {
      setError('Password must be at least 6 characters and include a letter, a number, and a special character');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.error || 'Invalid or expired code');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />

      <section style={{ backgroundColor: 'var(--red)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Set New Password</h1>
        <p style={{ fontSize: '18px' }}>Enter the code sent to {email}</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '460px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>

            {success ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h2 style={{ fontSize: '22px', marginBottom: '12px' }}>Password Reset!</h2>
                <p style={{ color: '#666' }}>Redirecting you to sign in...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div style={{ backgroundColor: '#ffebee', color: '#d32f2f', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                    {error}
                  </div>
                )}

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Reset Code</label>
                  <div style={{ position: 'relative' }}>
                    <KeyRound size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="000000"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 40px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '18px',
                        letterSpacing: '4px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '8px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>New Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 40px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      {showPassword ? <EyeOff size={18} color="#888" /> : <Eye size={18} color="#888" />}
                    </button>
                  </div>

                  {newPassword && (
                    <div style={{ marginTop: '10px' }}>
                      <div style={{ width: '100%', height: '6px', backgroundColor: '#eee', borderRadius: '3px', overflow: 'hidden', marginBottom: '6px' }}>
                        <div style={{ width: strength.width, height: '100%', backgroundColor: strength.color, transition: 'all 0.3s' }} />
                      </div>
                      <p style={{ fontSize: '12px', fontWeight: 'bold', color: strength.color, marginBottom: '8px' }}>{strength.label}</p>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
                        <CriteriaRow met={passwordCriteria.length} label="At least 6 characters" />
                        <CriteriaRow met={passwordCriteria.letter} label="A letter" />
                        <CriteriaRow met={passwordCriteria.number} label="A number" />
                        <CriteriaRow met={passwordCriteria.special} label="A special character" />
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '24px', marginTop: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Confirm New Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading || code.length !== 6}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--red)',
                    color: 'white',
                    padding: '14px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginBottom: '16px',
                    opacity: isLoading || code.length !== 6 ? 0.6 : 1
                  }}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </button>

                <p style={{ textAlign: 'center' }}>
                  <Link to="/forgot-password" style={{ color: 'var(--red)', fontSize: '14px' }}>← Request a new code</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPassword;