import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState('parent');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'parent',
    childName: '',
    childAge: '',
    childSchool: '',
    scoutOrganization: '',
    scoutRole: '',
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
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem('user', JSON.stringify({ email: formData.email, name: formData.fullName, type: userType }));
      navigate('/');
    }, 1500);
  };

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
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
              {[
                { id: 'parent', label: '👨‍👩‍👧 Parent/Guardian', desc: 'Register your child for programs' },
                { id: 'scout', label: '🔍 Scout/Talent Seeker', desc: 'Discover talented athletes' },
                { id: 'general', label: '🛒 General User', desc: 'Browse and purchase merchandise' }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setUserType(type.id)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    border: userType === type.id ? '2px solid var(--red)' : '1px solid #ddd',
                    backgroundColor: userType === type.id ? 'rgba(211,47,47,0.05)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>{type.label}</div>
                  <div style={{ fontSize: '11px', color: '#888' }}>{type.desc}</div>
                </button>
              ))}
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

              {userType === 'parent' && (
                <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                  <h4 style={{ marginBottom: '16px', color: '#333' }}>Child Information (Optional)</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input
                      type="text"
                      name="childName"
                      placeholder="Child's Name"
                      value={formData.childName}
                      onChange={handleChange}
                      style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                    <input
                      type="number"
                      name="childAge"
                      placeholder="Age"
                      value={formData.childAge}
                      onChange={handleChange}
                      style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                    <input
                      type="text"
                      name="childSchool"
                      placeholder="School"
                      value={formData.childSchool}
                      onChange={handleChange}
                      style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                  </div>
                </div>
              )}

              {userType === 'scout' && (
                <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '12px' }}>
                  <h4 style={{ marginBottom: '16px', color: '#333' }}>Scout Information</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <input
                      type="text"
                      name="scoutOrganization"
                      placeholder="Organization/Team"
                      value={formData.scoutOrganization}
                      onChange={handleChange}
                      style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
                    <input
                      type="text"
                      name="scoutRole"
                      placeholder="Role (e.g., Talent Scout)"
                      value={formData.scoutRole}
                      onChange={handleChange}
                      style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                    />
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
                Already have an account? <Link to="/login" style={{ color: 'var(--red)' }}>Sign In</Link>
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