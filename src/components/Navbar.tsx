import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'HOME' },
    { to: '/about', label: 'ABOUT US' },
    { to: '/programs', label: 'PROGRAMS' },
    { to: '/athletes', label: 'ATHLETES' },
    { to: '/media', label: 'MEDIA' },
    { to: '/shop', label: 'SHOP' },
    { to: '/contact', label: 'CONTACT' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.topRow}>
        <div onClick={() => navigate('/')} className={styles.logoSection}>
          <img src="/images/logo.jpeg" alt="Flight 13 Logo" className={styles.logo} />
          <h1 className={styles.academyName}>FLIGHT 13</h1>
        </div>

        {/* Red Trapezoid Container */}
        <div className={styles.trapezoidContainer}>
          <div className={styles.desktopIcons}>
            <div onClick={() => navigate('/search')} className={styles.iconWrapper}>
              <Search color="white" size={20} />
            </div>
            
            <div onClick={() => navigate('/cart')} className={styles.iconWrapper}>
              <ShoppingCart color="white" size={20} />
              {itemCount > 0 && (
                <span className={styles.cartBadge}>{itemCount}</span>
              )}
            </div>
            
            <div onClick={() => navigate(isLoggedIn ? '/account' : '/login')} className={styles.iconWrapper}>
              <User color="white" size={20} />
            </div>
          </div>
        </div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={styles.mobileMenuBtn}>
          {isMobileMenuOpen ? <X color="var(--red)" size={24} /> : <Menu color="var(--red)" size={24} />}
        </button>
      </div>

      <div className={styles.desktopNav}>
        <div className={styles.navLinksContainer}>
          {navLinks.map((link, index) => (
            <Link key={index} to={link.to} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`}>
        <button onClick={() => setIsMobileMenuOpen(false)} className={styles.closeBtn}>
          <X size={24} color="var(--red)" />
        </button>
        
        <div className={styles.mobileNavLinks}>
          {navLinks.map((link, index) => (
            <Link 
              key={index}
              to={link.to} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={styles.mobileNavLink}
            >
              {link.label}
            </Link>
          ))}
          
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={styles.mobileLogoutBtn}
            >
              Logout
            </button>
          ) : (
            <Link 
              to="/login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className={styles.mobileSignInLink}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div onClick={() => setIsMobileMenuOpen(false)} className={styles.overlay} />
      )}
    </nav>
  );
};

export default Navbar;