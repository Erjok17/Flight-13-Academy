import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { API_URL } from '../../config/api';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState('player');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    age: '',
    position: '',
    jerseyNumber: '',
    height: '',
    weight: '',
    school: '',
    childName: '',
    childAge: '',
    childSchool: '',
    organization: '',
    role: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    setError('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    
    const phoneRegex = /^(\+256|0)[0-9]{9}$/;
    if (!phoneRegex.test(formData.phone)) newErrors.phone = 'Enter a valid phone number (e.g., 0780XXXXXX)';
    
    if (userType === 'player') {
      if (!formData.age) newErrors.age = 'Age is required for players';
      if (!formData.position) newErrors.position = 'Position is required';
    }
    
    if (userType === 'parent' && !formData.childName) {
      newErrors.childName = 'Child name is required';
    }
    
    if (userType === 'scout' && !formData.organization) {
      newErrors.organization = 'Organization name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
          phone: formData.phone,
          userType: userType,
          age: formData.age,
          position: formData.position,
          jerseyNumber: formData.jerseyNumber,
          height: formData.height,
          weight: formData.weight,
          school: formData.school,
          childName: formData.childName,
          childAge: formData.childAge,
          childSchool: formData.childSchool,
          organization: formData.organization,
          scoutRole: formData.role,
        })
      });

      const data = await response.json();
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setSuccess('Registration successful! Redirecting...');
        setTimeout(() => {
          navigate('/account');
        }, 1500);
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('Network error. Please make sure the backend server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const userTypes = [
    { id: 'player', label: 'Player / Athlete', desc: 'Ages 5-18, register for programs and track progress' },
    { id: 'parent', label: 'Parent / Guardian', desc: 'Register your child for programs and manage payments' },
    { id: 'scout', label: 'Scout / Talent Seeker', desc: 'Discover talented athletes for recruitment' },
    { id: 'general', label: 'General User', desc: 'Browse and purchase merchandise' }
  ];

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />
      
      <section style={{
        backgroundColor: 'var(--red)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Create Account</h1>
        <p style={{ fontSize: '18px' }}>Join the Flight 13 community</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            
            {error && (
              <div style={{ backgroundColor: '#ffebee', color: '#d32f2f', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            {success && (
              <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                {success}
              </div>
            )}

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#333' }}>I am a...</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                {userTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setUserType(type.id)}
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: userType === type.id ? '2px solid var(--red)' : '1px solid #ddd',
                      backgroundColor: userType === type.id ? 'rgba(211,47,47,0.05)' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      textAlign: 'center'
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '8px' }}>
                      {type.id === 'player' && '🏀'}
                      {type.id === 'parent' && '👨‍👩‍👧'}
                      {type.id === 'scout' && '🔍'}
                      {type.id === 'general' && '🛒'}
                    </div>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px', color: userType === type.id ? 'var(--red)' : '#333' }}>
                      {type.label}
                    </div>
                    <div style={{ fontSize: '11px', color: '#888' }}>{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name *</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 40px',
                      border: errors.fullName ? '1px solid #d32f2f' : '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                    placeholder="John Doe"
                  />
                </div>
                {errors.fullName && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.fullName}</p>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email *</label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 40px',
                        border: errors.email ? '1px solid #d32f2f' : '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone Number *</label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 40px',
                        border: errors.phone ? '1px solid #d32f2f' : '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                      placeholder="+256 XXX XXX XXX"
                    />
                  </div>
                  {errors.phone && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</p>}
                </div>
              </div>

              {userType === 'player' && (
                <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                  <h4 style={{ marginBottom: '16px', color: '#333' }}>Player Information</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Age *</label>
                      <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="e.g., 15" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                      {errors.age && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.age}</p>}
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Position *</label>
                      <select name="position" value={formData.position} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}>
                        <option value="">Select Position</option>
                        <option value="Point Guard">Point Guard</option>
                        <option value="Shooting Guard">Shooting Guard</option>
                        <option value="Small Forward">Small Forward</option>
                        <option value="Power Forward">Power Forward</option>
                        <option value="Center">Center</option>
                      </select>
                      {errors.position && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.position}</p>}
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Jersey Number</label>
                      <input type="text" name="jerseyNumber" value={formData.jerseyNumber} onChange={handleChange} placeholder="e.g., 23" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Height</label>
                      <input type="text" name="height" value={formData.height} onChange={handleChange} placeholder="e.g., 6'2" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Weight</label>
                      <input type="text" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g., 165 lbs" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>School</label>
                      <input type="text" name="school" value={formData.school} onChange={handleChange} placeholder="School name" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                  </div>
                </div>
              )}

              {userType === 'parent' && (
                <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                  <h4 style={{ marginBottom: '16px', color: '#333' }}>Child Information</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Child's Name *</label>
                      <input type="text" name="childName" value={formData.childName} onChange={handleChange} placeholder="Child's full name" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                      {errors.childName && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.childName}</p>}
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Child's Age</label>
                      <input type="number" name="childAge" value={formData.childAge} onChange={handleChange} placeholder="Age" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Child's School</label>
                      <input type="text" name="childSchool" value={formData.childSchool} onChange={handleChange} placeholder="School name" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                  </div>
                </div>
              )}

              {userType === 'scout' && (
                <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                  <h4 style={{ marginBottom: '16px', color: '#333' }}>Scout Information</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Organization *</label>
                      <input type="text" name="organization" value={formData.organization} onChange={handleChange} placeholder="e.g., NBA Africa, College Name" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                      {errors.organization && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.organization}</p>}
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Role/Title</label>
                      <input type="text" name="role" value={formData.role} onChange={handleChange} placeholder="e.g., Talent Scout, Recruiter" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                  </div>
                </div>
              )}

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 40px',
                      border: errors.password ? '1px solid #d32f2f' : '1px solid #ddd',
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
                {errors.password && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.password}</p>}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Confirm Password *</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 40px',
                      border: errors.confirmPassword ? '1px solid #d32f2f' : '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer' }}
                  >
                    {showConfirmPassword ? <EyeOff size={18} color="#888" /> : <Eye size={18} color="#888" />}
                  </button>
                </div>
                {errors.confirmPassword && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.confirmPassword}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
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
                  marginBottom: '20px',
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>

              <p style={{ textAlign: 'center', color: '#666' }}>
                Already have an account?{' '}
                <button
                  onClick={handleSignIn}
                  style={{ 
                    color: 'var(--red)', 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                    padding: 0,
                    fontSize: '16px'
                  }}
                >
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;