import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus, Truck, Mail, MessageCircle, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, isLoading } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const subtotal = getTotalPrice();
  const total = subtotal;

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <AnnouncementBanner />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <p>Loading cart...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
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
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Shopping Cart</h1>
          <p style={{ fontSize: '18px' }}>Review your items before proceeding to checkout</p>
        </section>

        <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
            }}>
              <ShoppingBag size={64} color="#ccc" style={{ marginBottom: '20px' }} />
              <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#333' }}>Your cart is empty</h2>
              <p style={{ color: '#666', marginBottom: '24px' }}>Looks like you haven't added anything yet</p>
              <Link to="/shop" style={{
                backgroundColor: 'var(--red)',
                color: 'white',
                padding: '12px 28px',
                borderRadius: '30px',
                textDecoration: 'none',
                display: 'inline-block',
                fontWeight: 'bold'
              }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

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
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Shopping Cart</h1>
        <p style={{ fontSize: '18px' }}>Review your items before proceeding to checkout</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px' }}>
            {/* Cart Items */}
            <div>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 100px 120px 50px',
                  padding: '16px 20px',
                  backgroundColor: '#f5f5f5',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  borderBottom: '1px solid #eee'
                }}>
                  <div>Product</div>
                  <div>Details</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div></div>
                </div>
                
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr 100px 120px 50px',
                      alignItems: 'center',
                      padding: '16px 20px',
                      borderBottom: '1px solid #eee'
                    }}
                  >
                    <img 
                      src={item.image_url || '/images/placeholder.jpg'} 
                      alt={item.name} 
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                    />
                    <div>
                      <h3 style={{ fontWeight: 'bold', marginBottom: '4px', color: '#333' }}>{item.name}</h3>
                      <p style={{ fontSize: '12px', color: '#888' }}>{item.size ? `Size: ${item.size}` : 'One Size'}</p>
                    </div>
                    <div style={{ fontWeight: 'bold', color: '#333' }}>UGX {item.price.toLocaleString()}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ width: '28px', height: '28px', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}
                      >
                        <Minus size={14} color="#666" />
                      </button>
                      <span style={{ width: '30px', textAlign: 'center', fontWeight: '500' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width: '28px', height: '28px', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer', backgroundColor: 'white' }}
                      >
                        <Plus size={14} color="#666" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      style={{ color: '#999', cursor: 'pointer', background: 'none', border: 'none' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <Link to="/shop" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '20px',
                color: 'var(--red)',
                textDecoration: 'none',
                fontWeight: '500'
              }}>
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', height: 'fit-content', position: 'sticky', top: '20px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '2px solid var(--red)', paddingBottom: '12px', display: 'inline-block' }}>Order Summary</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' }}>
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>UGX {subtotal.toLocaleString()}</span>
                </div>
                <div style={{ borderTop: '1px solid #eee', margin: '16px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '20px', color: '#333' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--red)' }}>UGX {total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Note - Delivery handled offline */}
              <div style={{
                backgroundColor: '#fff3e0',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '13px',
                color: '#666',
                textAlign: 'center',
                borderLeft: '3px solid #FF9800'
              }}>
                <p style={{ marginBottom: '4px' }}>
                  📦 <strong>Delivery handled offline</strong>
                </p>
                <p style={{ fontSize: '12px' }}>
                  After checkout, we'll contact you via WhatsApp or email to arrange delivery.
                </p>
              </div>

              {!isLoggedIn && (
                <div style={{
                  backgroundColor: '#e3f2fd',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  textAlign: 'center',
                  fontSize: '13px'
                }}>
                  <Link to="/login" style={{ color: 'var(--red)', fontWeight: 'bold' }}>Sign in</Link> for faster checkout
                </div>
              )}

              <Link 
                to="/checkout" 
                style={{
                  display: 'block',
                  backgroundColor: 'var(--red)',
                  color: 'white',
                  textAlign: 'center',
                  padding: '14px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  marginBottom: '16px',
                  transition: 'all 0.3s'
                }}
              >
                Proceed to Checkout
                <ArrowRight size={16} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
              </Link>

              {/* Contact Options */}
              <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>Questions? Contact us directly:</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <a href="mailto:flight13@gmail.com" style={{ color: 'var(--red)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Mail size={16} /> Email
                  </a>
                  <a href="https://wa.me/256780898611" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                  <a href="tel:+256780898611" style={{ color: 'var(--red)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={16} /> Call
                  </a>
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <p style={{ fontSize: '11px', color: '#aaa' }}>
                  🔒 Your information is secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;