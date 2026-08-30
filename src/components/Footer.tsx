import { Link } from 'react-router-dom';
import { Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--red)', 
      color: 'white',
      padding: 'clamp(40px, 8vw, 60px) 0 clamp(20px, 5vw, 30px)',
      width: '100%'
    }}>
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 20px)'
      }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(30px, 6vw, 40px)',
          marginBottom: 'clamp(30px, 6vw, 40px)'
        }}>
          
          {/* Column 1: Academy Info */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: 'clamp(1.3rem, 4vw, 1.5rem)', 
              marginBottom: '20px',
              fontWeight: 'bold',
              letterSpacing: '1px'
            }}>
              FLIGHT 13
            </h3>
            <p style={{ 
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
              lineHeight: '1.6',
              opacity: 0.9,
              maxWidth: '300px',
              margin: '0 auto'
            }}>
              Elite basketball program focused on skill development and basketball knowledge for young athletes.
            </p>
            <p style={{ 
              fontSize: 'clamp(0.8rem, 2.5vw, 0.9rem)', 
              marginTop: '15px',
              fontStyle: 'italic',
              opacity: 0.9
            }}>
              "It's a process."
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: 'clamp(1.1rem, 3.5vw, 1.2rem)', 
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              CONTACT US
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <Phone size={18} color="white" />
                <a 
                  href="tel:+256780898611" 
                  style={{ 
                    color: 'white', 
                    textDecoration: 'none',
                    opacity: 0.9,
                    transition: 'opacity 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.9'}
                >
                  +256 780 898611
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                <MapPin size={18} color="white" />
                <div>
                  <div style={{ opacity: 0.9 }}>Abja Parks, Naalya Estate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: 'clamp(1.1rem, 3.5vw, 1.2rem)', 
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              QUICK LINKS
            </h3>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: 'center'
            }}>
              <li><Link to="/" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Home</Link></li>
              <li><Link to="/about" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>About Us</Link></li>
              <li><Link to="/programs" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Our Programs</Link></li>
              <li><Link to="/contact" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Contact Us</Link></li>
              <li><Link to={`/contact?message=${encodeURIComponent('I want to register and be part of the academy.')}`} style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Registration</Link></li>
              <li><Link to="/media" style={{ color: 'white', textDecoration: 'none', opacity: 0.9 }}>Media</Link></li>
            </ul>
          </div>

          {/* Column 4: Social Media */}
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontSize: 'clamp(1.1rem, 3.5vw, 1.2rem)', 
              marginBottom: '20px',
              fontWeight: 'bold'
            }}>
              FOLLOW US
            </h3>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
              <a 
                href="https://www.instagram.com/flight_13_basketball_academy/" 
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', transition: 'transform 0.3s', width: '28px', height: '28px' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src="/images/ig-icon-white.png" alt="Instagram" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.3s', width: '26px', height: '26px' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <img src="/images/x-icon-white.png" alt="X (Twitter)" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', transition: 'transform 0.3s', width: '32px', height: '32px' }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                <img src="/images/youtube-icon-white.png" alt="YouTube" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </a>
            </div>
            
            <div style={{ marginTop: '25px' }}>
              <p style={{ fontSize: 'clamp(0.7rem, 2.5vw, 0.8rem)', opacity: 0.8, lineHeight: '1.5' }}>
                <strong>Training Days:</strong><br />
                Monday, Wednesday, Friday & Saturday
              </p>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.2)',
          paddingTop: 'clamp(20px, 5vw, 25px)',
          marginTop: 'clamp(20px, 5vw, 20px)',
          textAlign: 'center',
          fontSize: 'clamp(0.7rem, 2vw, 0.8rem)',
          opacity: 0.7
        }}>
          <p>© {new Date().getFullYear()} Flight 13 Basketball Academy. All rights reserved.</p>
          <p style={{ marginTop: '5px' }}>"It's a process."</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;