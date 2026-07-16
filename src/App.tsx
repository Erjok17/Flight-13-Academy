import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Programs from './pages/Programs';
import Registration from './pages/Registration';
import Media from './pages/Media';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import Shop from './pages/shop/Shop';
import ProductDetail from './pages/shop/ProductDetail';
import AthletesDirectory from './pages/athletes/AthletesDirectory';
import AthleteProfile from './pages/athletes/AthleteProfile';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminDashboard from './pages/admin/AdminDashboard';
import CoachChut from './pages/coaches/CoachChut';
import CoachMark from './pages/coaches/CoachMark';
import CoachNathan from './pages/coaches/CoachNathan';

// Page Transition Animation Wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function AppContent() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Pages - Always Accessible */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/programs" element={<PageTransition><Programs /></PageTransition>} />
        <Route path="/registration" element={<PageTransition><Registration /></PageTransition>} />
        <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
        <Route path="/search" element={<PageTransition><Search /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/athletes" element={<PageTransition><AthletesDirectory /></PageTransition>} />
        <Route path="/athletes/:id" element={<PageTransition><AthleteProfile /></PageTransition>} />
        
        {/* Auth Pages */}
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/forgot-password" element={<PageTransition><ForgotPassword /></PageTransition>} />
        
        {/* Protected Routes - Require Login */}
        <Route path="/checkout" element={
          <ProtectedRoute>
            <PageTransition><Checkout /></PageTransition>
          </ProtectedRoute>
        } />
        
        <Route path="/account" element={
          <ProtectedRoute>
            <PageTransition><Account /></PageTransition>
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <PageTransition><AdminDashboard /></PageTransition>
          </ProtectedRoute>
        } />
        
        {/* Coach Detail Pages */}
        <Route path="/coaches/1" element={<PageTransition><CoachChut /></PageTransition>} />
        <Route path="/coaches/2" element={<PageTransition><CoachMark /></PageTransition>} />
        <Route path="/coaches/3" element={<PageTransition><CoachNathan /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;