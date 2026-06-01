import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { Trash2, ShoppingBag, ArrowRight, Plus, Minus, CreditCard, ShieldCheck, Truck } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  type: string;
  price: number;
  quantity: number;
  image: string;
  duration?: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: 'Weekly Practices - 1 Month', type: 'Program', price: 150000, quantity: 1, image: '/images/p10.jpeg', duration: 'Monthly' },
    { id: 2, name: 'Flight 13 Jersey', type: 'Merchandise', price: 75000, quantity: 2, image: '/images/jersey.jpg', duration: 'One-time' },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.some(item => item.type === 'Merchandise') ? 10000 : 0;
  const total = subtotal + deliveryFee;

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
          
          {cartItems.length === 0 ? (
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
              <Link to="/programs" style={{
                backgroundColor: 'var(--red)',
                color: 'white',
                padding: '12px 28px',
                borderRadius: '30px',
                textDecoration: 'none',
                display: 'inline-block',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--red)'}>
                Browse Programs
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px' }}>
              {/* Cart Items */}
              <div>
                <div style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                  {/* Header */}
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
                  
                  {/* Items */}
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr 100px 120px 50px',
                        alignItems: 'center',
                        padding: '16px 20px',
                        borderBottom: '1px solid #eee',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
                      />
                      <div>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '4px', color: '#333' }}>{item.name}</h3>
                        <p style={{ fontSize: '12px', color: '#888' }}>{item.type}</p>
                        {item.duration && <p style={{ fontSize: '11px', color: '#aaa', marginTop: '2px' }}>{item.duration}</p>}
                      </div>
                      <div style={{ fontWeight: 'bold', color: '#333' }}>UGX {item.price.toLocaleString()}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ 
                            width: '28px', 
                            height: '28px', 
                            border: '1px solid #ddd', 
                            borderRadius: '6px', 
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--red)'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ddd'}
                        >
                          <Minus size={14} color="#666" />
                        </button>
                        <span style={{ width: '30px', textAlign: 'center', fontWeight: '500' }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ 
                            width: '28px', 
                            height: '28px', 
                            border: '1px solid #ddd', 
                            borderRadius: '6px', 
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--red)'}
                          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ddd'}
                        >
                          <Plus size={14} color="#666" />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)} 
                        style={{ 
                          color: '#999', 
                          cursor: 'pointer',
                          transition: 'color 0.3s',
                          background: 'none',
                          border: 'none'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--red)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#999'}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping Link */}
                <Link to="/programs" style={{
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
                    <span>Subtotal</span>
                    <span>UGX {subtotal.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#555' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Truck size={14} /> Delivery Fee
                    </span>
                    <span>{deliveryFee === 0 ? 'Free' : `UGX ${deliveryFee.toLocaleString()}`}</span>
                  </div>
                  <div style={{ borderTop: '1px solid #eee', margin: '16px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '20px', color: '#333' }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--red)' }}>UGX {total.toLocaleString()}</span>
                  </div>
                </div>

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
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--red)'}>
                  Proceed to Checkout
                  <ArrowRight size={16} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                </Link>

                {/* Security Badges */}
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
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;