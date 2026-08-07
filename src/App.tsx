import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import CoachNathan from './pages/coaches/CoachErjok';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages - Always Accessible */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/media" element={<Media />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/athletes" element={<AthletesDirectory />} />
        <Route path="/athletes/:id" element={<AthleteProfile />} />
        
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes - Require Login */}
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } />
        
        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* Coach Detail Pages */}
        <Route path="/coaches/1" element={<CoachChut />} />
        <Route path="/coaches/2" element={<CoachMark />} />
        <Route path="/coaches/3" element={<CoachNathan />} />
      </Routes>
    </Router>
  );
}

export default App;