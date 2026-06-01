import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    console.log('Navigating to /search');
    navigate('/search');
  };

  const handleCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    console.log('Navigating to /cart');
    navigate('/cart');
  };

  const handleAccount = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    console.log('Navigating to /account');
    navigate('/account');
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate('/');
  };

  return (
    <nav style={{ backgroundColor: 'white', width: '100%' }}>
      {/* Row 1: Logo + Academy Name + Red Trapezoid */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        position: 'relative',
        width: '100%'
      }}>
        {/* Left: Logo + Academy Name (Clickable - goes to Home) */}
        <div 
          onClick={handleLogoClick}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            zIndex: 2,
            maxWidth: '1280px',
            width: '100%',
            paddingLeft: '20px',
            cursor: 'pointer'
          }}
        >
          <img 
            src="/images/logo.jpeg" 
            alt="Flight 13 Logo" 
            style={{ height: '50px', width: 'auto' }}
          />
          <h1 style={{ 
            color: 'var(--red)', 
            fontSize: '24px', 
            letterSpacing: '2px',
            fontWeight: 'bold',
            margin: 0
          }}>
            FLIGHT 13
          </h1>
        </div>

        {/* Right: Red Trapezoid */}
        <div style={{ 
          position: 'absolute',
          right: 0,
          top: '10px',
          bottom: '5px',
          width: '50%',
          zIndex: 100, // Higher z-index to ensure it's above the logo
          pointerEvents: 'auto' // Ensure clicks are captured
        }}>
          <div style={{
            backgroundColor: 'var(--red)',
            width: '100%',
            height: '100%',
            clipPath: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)',
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center'
          }}>
            <div 
              onClick={handleSearch}
              style={{ 
                cursor: 'pointer', 
                padding: '10px', 
                display: 'flex', 
                alignItems: 'center',
                zIndex: 101
              }}
            >
              <Search color="white" size={20} />
            </div>
            
            <div 
              onClick={handleCart}
              style={{ 
                cursor: 'pointer', 
                padding: '10px', 
                display: 'flex', 
                alignItems: 'center',
                zIndex: 101
              }}
            >
              <ShoppingCart color="white" size={20} />
            </div>
            
            <div 
              onClick={handleAccount}
              style={{ 
                cursor: 'pointer', 
                padding: '10px', 
                display: 'flex', 
                alignItems: 'center',
                zIndex: 101
              }}
            >
              <User color="white" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Red Navigation Links Bar */}
      <div style={{
        backgroundColor: 'var(--red)',
        width: '100%',
        marginTop: '8px'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          padding: '12px 20px',
          maxWidth: '1280px',
          margin: '0 auto',
          flexWrap: 'wrap'
        }}>
          <Link to="/" style={{ color: 'white', fontWeight: '500', textDecoration: 'none' }}>HOME</Link>
          <Link to="/about" style={{ color: 'white', fontWeight: '500', textDecoration: 'none' }}>ABOUT US</Link>
          <Link to="/programs" style={{ color: 'white', fontWeight: '500', textDecoration: 'none' }}>OUR PROGRAMS</Link>
          <Link to="/contact" style={{ color: 'white', fontWeight: '500', textDecoration: 'none' }}>CONTACT US</Link>
          <Link to="/registration" style={{ color: 'white', fontWeight: '500', textDecoration: 'none' }}>REGISTRATION</Link>
          <Link to="/media" style={{ color: 'white', fontWeight: '500', textDecoration: 'none' }}>MEDIA</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;