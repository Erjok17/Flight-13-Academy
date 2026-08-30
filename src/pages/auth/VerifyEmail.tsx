import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { MailCheck } from 'lucide-react';
import { API_URL } from '../../config/api';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';

  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!email) navigate('/register');
  }, [email, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/account');
      } else {
        setError(data.error || 'Invalid or expired code');
      }
    } catch (err) {
      console.error('Verify error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${API_URL}/api/auth/resend-code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('A new code has been sent to your email.');
      } else {
        setError(data.error || 'Failed to resend code');
      }
    } catch (err) {
      console.error('Resend error:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />

      <section style={{ backgroundColor: 'var(--red)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Verify Your Email</h1>
        <p style={{ fontSize: '18px' }}>We sent a code to {email}</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '440px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <MailCheck size={40} color="var(--red)" style={{ marginBottom: '16px' }} />

            {error && (
              <div style={{ backgroundColor: '#ffebee', color: '#d32f2f', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                {error}
              </div>
            )}

            {message && (
              <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                style={{
                  width: '100%',
                  padding: '16px',
                  fontSize: '28px',
                  letterSpacing: '10px',
                  textAlign: 'center',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}
              />

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
                {isLoading ? 'Verifying...' : 'Verify Account'}
              </button>
            </form>

            <p style={{ fontSize: '14px', color: '#666' }}>
              Didn't get a code?{' '}
              <button
                onClick={handleResend}
                disabled={isResending}
                style={{ color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
              >
                {isResending ? 'Sending...' : 'Resend code'}
              </button>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default VerifyEmail;