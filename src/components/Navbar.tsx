import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div id="nav-logo" onClick={() => navigate('/')} className={styles.logoSection}>
          <img 
            src="/images/logo.webp" 
            alt="Flight 13 Logo" 
            width={50}
            height={50}
            className={styles.logo} 
          />
          <h1 className={styles.academyName}>FLIGHT 13</h1>
        </div>

        {/* Red Trapezoid Container */}
        <div className={styles.trapezoidContainer}>
          <div className={styles.desktopIcons}>
            <button 
              id="nav-search-btn" 
              onClick={() => navigate('/search')} 
              className={styles.iconWrapper}
              aria-label="Search"
              type="button"
            >
              <Search color="white" size={20} />
            </button>
            
            <button 
              id="nav-cart-btn" 
              onClick={() => navigate('/cart')} 
              className={styles.iconWrapper}
              aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} items` : ''}`}
              type="button"
            >
              <ShoppingCart color="white" size={20} />
              {itemCount > 0 && (
                <span className={styles.cartBadge}>{itemCount}</span>
              )}
            </button>
            
            <button 
              id="nav-profile-btn" 
              onClick={() => navigate(isLoggedIn ? '/account' : '/login')} 
              className={styles.iconWrapper}
              aria-label={isLoggedIn ? 'My account' : 'Sign in'}
              type="button"
            >
              <User color="white" size={20} />
            </button>
          </div>
        </div>

        <button 
          id="mobile-menu-toggle" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className={styles.mobileMenuBtn}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          type="button"
        >
          {isMobileMenuOpen ? <X color="var(--red)" size={24} /> : <Menu color="var(--red)" size={24} />}
        </button>
      </div>

      <div className={styles.desktopNav}>
        <div className={styles.navLinksContainer}>
          {navLinks.map((link, index) => (
            <Link 
              id={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
              key={index} 
              to={link.to} 
              className={styles.navLink}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.div 
              className={styles.mobileNav}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            >
              <button 
                id="mobile-menu-close" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className={styles.closeBtn}
                aria-label="Close menu"
                type="button"
              >
                <X size={24} color="var(--red)" />
              </button>
              
              <div className={styles.mobileNavLinks}>
                {navLinks.map((link, index) => (
                  <Link 
                    id={`mobile-nav-${link.label.toLowerCase().replace(' ', '-')}`}
                    key={index}
                    to={link.to} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={styles.mobileNavLink}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <Link 
                  id="mobile-nav-search"
                  to="/search" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={styles.mobileNavLink}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <Search size={18} /> SEARCH
                </Link>
                
                <Link 
                  id="mobile-nav-cart"
                  to="/cart" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={styles.mobileNavLink}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <ShoppingCart size={18} /> CART
                  {itemCount > 0 && (
                    <span style={{
                      backgroundColor: '#FF9800',
                      color: 'white',
                      borderRadius: '12px',
                      padding: '2px 8px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      marginLeft: '5px'
                    }}>{itemCount}</span>
                  )}
                </Link>
                
                {isLoggedIn ? (
                  <>
                    <Link 
                      id="mobile-nav-account"
                      to="/account" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={styles.mobileNavLink}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <User size={18} /> ACCOUNT
                    </Link>
                    <button
                      id="mobile-nav-logout"
                      onClick={handleLogout}
                      className={styles.mobileLogoutBtn}
                      type="button"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link 
                    id="mobile-nav-signin"
                    to="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={styles.mobileSignInLink}
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;