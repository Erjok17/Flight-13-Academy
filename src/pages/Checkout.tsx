import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { Lock, ChevronRight, AlertCircle, Mail, MessageCircle, Phone, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalItems, getTotalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getTotalPrice();
  const total = subtotal;

  // Generate random order ID
  const generateOrderId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'FL13-';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Generate order message for email and WhatsApp
  const generateOrderMessage = () => {
    const itemsList = items.map(item => 
      `- ${item.name} x${item.quantity} (${item.size || 'One Size'}) - UGX ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const message = `
🛍️ NEW ORDER - Flight 13 Academy

Order #: ${orderId}
Date: ${new Date().toLocaleString()}

👤 Customer Information:
Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Address: ${formData.address || 'Not provided'}
City: ${formData.city || 'Not provided'}
District: ${formData.district || 'Not provided'}

📦 Items Ordered:
${itemsList}

💰 Total Amount: UGX ${total.toLocaleString()}

📝 Notes: ${formData.notes || 'None'}

📞 Contact customer via: ${formData.phone} or ${formData.email}

---
This is an automated order notification. Please contact the customer to arrange delivery.
    `.trim();

    return message;
  };

  // Generate WhatsApp message (short version)
  const generateWhatsAppMessage = () => {
    const itemsShort = items.map(item => 
      `${item.name} x${item.quantity}`
    ).join(', ');

    return `🛍️ New Order #${orderId} from ${formData.fullName}. Items: ${itemsShort}. Total: UGX ${total.toLocaleString()}. Contact: ${formData.phone}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsProcessing(true);
    
    // Generate order ID
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);
    
    // Prepare order data
    const orderMessage = generateOrderMessage();
    const whatsappMessage = generateWhatsAppMessage();

    console.log('📦 ORDER PLACED');
    console.log('Order ID:', newOrderId);
    console.log('Message:', orderMessage);
    console.log('WhatsApp:', whatsappMessage);

    // Send email via Formspree
    try {
      const emailResponse = await fetch('https://formspree.io/f/your-formspree-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Order #${newOrderId} - Flight 13 Academy`,
          message: orderMessage,
          _replyto: formData.email,
        }),
      });
      
      if (emailResponse.ok) {
        console.log('✅ Email sent via Formspree');
      } else {
        console.log('⚠️ Email sending failed, but order recorded');
      }
    } catch (error) {
      console.error('Email error:', error);
    }

    // Send WhatsApp via Twilio (to be implemented)
    // In production, this would call your backend endpoint
    console.log(`💬 WhatsApp message to +256780898611: ${whatsappMessage}`);

    // Show success
    setTimeout(() => {
      setIsProcessing(false);
      setIsSubmitted(true);
      
      setTimeout(() => {
        clearCart();
      }, 500);
    }, 1000);
  };

  // If cart is empty, redirect to shop
  if (items.length === 0 && !isSubmitted) {
    navigate('/shop');
    return null;
  }

  if (isSubmitted) {
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
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Order Confirmed! 🎉</h1>
          <p style={{ fontSize: '18px' }}>Thank you for your order!</p>
        </section>

        <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                <h2 style={{ fontSize: '28px', color: '#333', marginBottom: '8px' }}>Order Received!</h2>
                <p style={{ color: '#666' }}>Order #{orderId}</p>
                <p style={{ color: '#888', fontSize: '14px', marginTop: '8px' }}>
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>

              {/* Order Summary */}
              <div style={{
                backgroundColor: '#f9f9f9',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '24px'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>🛍️ Order Summary</h3>
                {items.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #e0e0e0'
                  }}>
                    <span style={{ color: '#555' }}>{item.name} x{item.quantity} {item.size ? `(${item.size})` : ''}</span>
                    <span style={{ color: '#333' }}>UGX {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--red)' }}>UGX {total.toLocaleString()}</span>
                </div>
              </div>

              <div style={{
                backgroundColor: '#fff3e0',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '24px',
                borderLeft: '4px solid #FF9800'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#333' }}>📦 What Happens Next?</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>1️⃣</span>
                    <span style={{ color: '#555' }}>We'll review your order within 24 hours</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>2️⃣</span>
                    <span style={{ color: '#555' }}>We'll confirm availability and delivery details</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>3️⃣</span>
                    <span style={{ color: '#555' }}>You'll receive a confirmation via WhatsApp or email</span>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px', color: '#333' }}>📞 Need to reach us?</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                  <a href="mailto:flight13@gmail.com" style={{
                    backgroundColor: '#f5f5f5',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eee'}>
                    <Mail size={18} color="var(--red)" /> flight13@gmail.com
                  </a>
                  <a href="https://wa.me/256780898611" target="_blank" rel="noopener noreferrer" style={{
                    backgroundColor: '#f5f5f5',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eee'}>
                    <MessageCircle size={18} color="#25D366" /> WhatsApp
                  </a>
                  <a href="tel:+256780898611" style={{
                    backgroundColor: '#f5f5f5',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    textDecoration: 'none',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#eee'}>
                    <Phone size={18} color="var(--red)" /> Call Us
                  </a>
                </div>
              </div>

              <button
                onClick={() => navigate('/shop')}
                style={{
                  width: '100%',
                  backgroundColor: 'var(--red)',
                  color: 'white',
                  padding: '14px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Continue Shopping
              </button>
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
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Checkout</h1>
        <p style={{ fontSize: '18px' }}>Complete your order. We'll contact you for delivery.</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                
                <h2 style={{ fontSize: '22px', marginBottom: '24px', color: '#333' }}>Contact Information</h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: errors.fullName ? '1px solid #d32f2f' : '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                  {errors.fullName && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.fullName}</p>}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: errors.email ? '1px solid #d32f2f' : '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    {errors.email && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.email}</p>}
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: errors.phone ? '1px solid #d32f2f' : '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                    {errors.phone && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.phone}</p>}
                  </div>
                </div>

                <h2 style={{ fontSize: '22px', margin: '32px 0 24px', color: '#333' }}>Delivery Information</h2>
                
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>District</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Additional Notes (optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                    placeholder="Any special requests or notes for us..."
                  />
                </div>

                {/* Order Preview */}
                <div style={{
                  backgroundColor: '#f9f9f9',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '24px'
                }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', color: '#333' }}>
                    🛍️ Order Preview
                  </h4>
                  {items.map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '4px 0',
                      fontSize: '13px',
                      color: '#555'
                    }}>
                      <span>{item.name} x{item.quantity}</span>
                      <span>UGX {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '8px',
                    marginTop: '8px',
                    borderTop: '1px solid #e0e0e0',
                    fontWeight: 'bold',
                    fontSize: '16px',
                    color: 'var(--red)'
                  }}>
                    <span>Total</span>
                    <span>UGX {total.toLocaleString()}</span>
                  </div>
                </div>

                <div style={{
                  backgroundColor: '#fff3e0',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '24px',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}>
                  <AlertCircle size={20} color="#ff9800" />
                  <div>
                    <p style={{ fontSize: '13px', color: '#666' }}>
                      <strong>📦 Delivery handled offline</strong>
                    </p>
                    <p style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                      After placing your order, we'll contact you via WhatsApp or email to arrange delivery and confirm availability.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--red)',
                    color: 'white',
                    padding: '14px',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    opacity: isProcessing ? 0.7 : 1
                  }}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>

                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <p style={{ fontSize: '12px', color: '#888' }}>
                    <Lock size={14} style={{ display: 'inline', marginRight: '4px' }} />
                    Your information is secure
                  </p>
                </div>
              </div>
            </form>

            {/* Order Summary Sidebar */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', height: 'fit-content', position: 'sticky', top: '20px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '2px solid var(--red)', paddingBottom: '12px', display: 'inline-block' }}>Your Order</h3>
              
              <div style={{ marginBottom: '16px' }}>
                {items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>UGX {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div style={{ borderTop: '1px solid #eee', margin: '16px 0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' }}>
                <span>Total</span>
                <span style={{ color: 'var(--red)' }}>UGX {total.toLocaleString()}</span>
              </div>

              <div style={{ textAlign: 'center', paddingTop: '16px', borderTop: '1px solid #eee' }}>
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '12px' }}>Questions?</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="mailto:flight13@gmail.com" style={{ color: 'var(--red)', fontSize: '12px' }}>📧 Email</a>
                  <a href="https://wa.me/256780898611" target="_blank" rel="noopener noreferrer" style={{ color: '#25D366', fontSize: '12px' }}>💬 WhatsApp</a>
                  <a href="tel:+256780898611" style={{ color: 'var(--red)', fontSize: '12px' }}>📞 Call</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;