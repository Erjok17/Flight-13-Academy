import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import ScrollToTop from './components/ScrollToTop';

// Eager — the pages people land on first
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Programs from './pages/Programs';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Lazy — everything else
const Media = lazy(() => import('./pages/Media'));
const Search = lazy(() => import('./pages/Search'));
const Cart = lazy(() => import('./pages/Cart'));
const Account = lazy(() => import('./pages/Account'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Shop = lazy(() => import('./pages/shop/Shop'));
const ProductDetail = lazy(() => import('./pages/shop/ProductDetail'));
const AthletesDirectory = lazy(() => import('./pages/athletes/AthletesDirectory'));
const AthleteProfile = lazy(() => import('./pages/athletes/AthleteProfile'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const VerifyEmail = lazy(() => import('./pages/auth/VerifyEmail'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const CoachChut = lazy(() => import('./pages/coaches/CoachChut'));
const CoachMark = lazy(() => import('./pages/coaches/CoachMark'));
const CoachNathan = lazy(() => import('./pages/coaches/CoachErjok'));

// Admin — always lazy
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AthletesAdmin = lazy(() => import('./pages/admin/AthletesAdmin'));
const ProgramsAdmin = lazy(() => import('./pages/admin/ProgramsAdmin'));
const ProductsAdmin = lazy(() => import('./pages/admin/ProductsAdmin'));
const SettingsAdmin = lazy(() => import('./pages/admin/SettingsAdmin'));
const OrdersAdmin = lazy(() => import('./pages/admin/OrdersAdmin'));
const MessagesAdmin = lazy(() => import('./pages/admin/MessagesAdmin'));

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

// Fallback for lazy-loaded routes
const PageFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    color: '#888',
    fontSize: '14px'
  }}>
    Loading…
  </div>
);

const Lazy = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<PageFallback />}>{children}</Suspense>
);

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Admin Route Component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
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
        {/* Public — eager */}
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/programs" element={<PageTransition><Programs /></PageTransition>} />

        {/* Public — lazy */}
        <Route path="/media" element={<Lazy><PageTransition><Media /></PageTransition></Lazy>} />
        <Route path="/search" element={<Lazy><PageTransition><Search /></PageTransition></Lazy>} />
        <Route path="/cart" element={<Lazy><PageTransition><Cart /></PageTransition></Lazy>} />
        <Route path="/shop" element={<Lazy><PageTransition><Shop /></PageTransition></Lazy>} />
        <Route path="/product/:id" element={<Lazy><PageTransition><ProductDetail /></PageTransition></Lazy>} />
        <Route path="/athletes" element={<Lazy><PageTransition><AthletesDirectory /></PageTransition></Lazy>} />
        <Route path="/athletes/:id" element={<Lazy><PageTransition><AthleteProfile /></PageTransition></Lazy>} />
        <Route path="/verify-email" element={<Lazy><PageTransition><VerifyEmail /></PageTransition></Lazy>} />

        {/* Auth */}
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/forgot-password" element={<Lazy><PageTransition><ForgotPassword /></PageTransition></Lazy>} />
        <Route path="/reset-password" element={<Lazy><PageTransition><ResetPassword /></PageTransition></Lazy>} />

        {/* Protected — lazy */}
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Lazy><PageTransition><Checkout /></PageTransition></Lazy>
          </ProtectedRoute>
        } />

        <Route path="/account" element={
          <ProtectedRoute>
            <Lazy><PageTransition><Account /></PageTransition></Lazy>
          </ProtectedRoute>
        } />

        {/* Admin — lazy */}
        <Route path="/admin" element={
          <AdminRoute>
            <Lazy><AdminLayout /></Lazy>
          </AdminRoute>
        }>
          <Route index element={<Lazy><PageTransition><AdminDashboard /></PageTransition></Lazy>} />
          <Route path="athletes" element={<Lazy><PageTransition><AthletesAdmin /></PageTransition></Lazy>} />
          <Route path="programs" element={<Lazy><PageTransition><ProgramsAdmin /></PageTransition></Lazy>} />
          <Route path="products" element={<Lazy><PageTransition><ProductsAdmin /></PageTransition></Lazy>} />
          <Route path="orders" element={<Lazy><PageTransition><OrdersAdmin /></PageTransition></Lazy>} />
          <Route path="messages" element={<Lazy><PageTransition><MessagesAdmin /></PageTransition></Lazy>} />
          <Route path="settings" element={<Lazy><PageTransition><SettingsAdmin /></PageTransition></Lazy>} />
        </Route>

        {/* Coaches — lazy */}
        <Route path="/coaches/1" element={<Lazy><PageTransition><CoachChut /></PageTransition></Lazy>} />
        <Route path="/coaches/2" element={<Lazy><PageTransition><CoachMark /></PageTransition></Lazy>} />
        <Route path="/coaches/3" element={<Lazy><PageTransition><CoachNathan /></PageTransition></Lazy>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;