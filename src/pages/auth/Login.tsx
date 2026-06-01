import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      // In real app, verify credentials with Supabase
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);
      navigate('/account');
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
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Welcome Back</h1>
        <p style={{ fontSize: '18px' }}>Sign in to your Flight 13 account</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            
            {error && (
              <div style={{ backgroundColor: '#ffebee', color: '#d32f2f', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 40px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
                  <span style={{ fontSize: '14px', color: '#666' }}>Remember me</span>
                </label>
                <Link to="/forgot-password" style={{ fontSize: '14px', color: 'var(--red)' }}>Forgot Password?</Link>
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
                  opacity: isLoading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <LogIn size={18} />
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>

              <p style={{ textAlign: 'center', color: '#666' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--red)' }}>Create Account</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;