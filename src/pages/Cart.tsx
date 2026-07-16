import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, Plus, Minus, CreditCard, ShieldCheck, Truck } from 'lucide-react';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { CartEmptyState, CheckoutSkeleton } from '../components/skeletons';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, isLoading } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 100000 ? 0 : 10000;
  const total = subtotal + deliveryFee;

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <AnnouncementBanner />
        <CheckoutSkeleton />
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
            <CartEmptyState />
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

            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', height: 'fit-content', position: 'sticky', top: '20px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '2px solid var(--red)', paddingBottom: '12px', display: 'inline-block' }}>Order Summary</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' }}>
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>UGX {subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Truck size={14} /> Delivery Fee</span>
                  <span>{deliveryFee === 0 ? 'Free' : `UGX ${deliveryFee.toLocaleString()}`}</span>
                </div>
                <div style={{ borderTop: '1px solid #eee', margin: '16px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '20px', color: '#333' }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--red)' }}>UGX {total.toLocaleString()}</span>
                </div>
              </div>

              {!isLoggedIn && (
                <div style={{ backgroundColor: '#e3f2fd', padding: '12px', borderRadius: '8px', marginBottom: '16px', textAlign: 'center', fontSize: '13px' }}>
                  <Link to="/login" style={{ color: 'var(--red)', fontWeight: 'bold' }}>Sign in</Link> for faster checkout
                </div>
              )}

              <Link to="/checkout" style={{
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
              }}>
                Proceed to Checkout
                <ArrowRight size={16} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
              </Link>

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '12px' }}>
                  <ShieldCheck size={20} color="#888" />
                  <CreditCard size={20} color="#888" />
                </div>
                <p style={{ fontSize: '12px', color: '#888' }}>
                  Secure payment. Your information is protected.
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