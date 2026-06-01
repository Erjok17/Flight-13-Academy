import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/media" element={<Media />} />
        
        {/* Search & Cart & Checkout */}
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        
        {/* User Account */}
        <Route path="/account" element={<Account />} />
        
        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Shop */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        
        {/* Athletes Directory (for Scouts) */}
        <Route path="/athletes" element={<AthletesDirectory />} />
        <Route path="/athletes/:id" element={<AthleteProfile />} />
        
        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        
        {/* Coach Detail Pages */}
        <Route path="/coaches/1" element={<CoachChut />} />
        <Route path="/coaches/2" element={<CoachMark />} />
        <Route path="/coaches/3" element={<CoachNathan />} />
      </Routes>
    </Router>
  );
}

export default App;