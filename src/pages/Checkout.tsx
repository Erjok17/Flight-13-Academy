import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { Lock, ChevronRight, AlertCircle } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    paymentMethod: 'mobile_money',
    mobileMoneyNumber: '',
    transactionCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const cartSummary = {
    subtotal: 300000,
    deliveryFee: 10000,
    total: 310000,
    items: [
      { name: 'Weekly Practices - 1 Month', quantity: 1, price: 150000 },
      { name: 'Flight 13 Jersey', quantity: 2, price: 75000 },
    ]
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.district) newErrors.district = 'District is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';
    if (formData.paymentMethod === 'mobile_money' && !formData.mobileMoneyNumber) {
      newErrors.mobileMoneyNumber = 'Mobile money number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment submitted! Thank you for your registration.');
      navigate('/');
    }, 2000);
  };

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
        <p style={{ fontSize: '18px' }}>Complete your registration and payment</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Progress Steps */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', gap: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: step >= 1 ? 'var(--red)' : '#ddd',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 8px',
                fontWeight: 'bold'
              }}>
                1
              </div>
              <div style={{ fontSize: '12px', color: step >= 1 ? 'var(--red)' : '#888' }}>Information</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: step >= 2 ? 'var(--red)' : '#ddd',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 8px',
                fontWeight: 'bold'
              }}>
                2
              </div>
              <div style={{ fontSize: '12px', color: step >= 2 ? 'var(--red)' : '#888' }}>Payment</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px' }}>
            {/* Form Section */}
            <form onSubmit={handleSubmit}>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                
                {step === 1 && (
                  <div>
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

                    <h2 style={{ fontSize: '22px', margin: '32px 0 24px', color: '#333' }}>Delivery Address</h2>
                    
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Street Address *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: errors.address ? '1px solid #d32f2f' : '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '16px'
                        }}
                      />
                      {errors.address && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.address}</p>}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: errors.city ? '1px solid #d32f2f' : '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px'
                          }}
                        />
                        {errors.city && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.city}</p>}
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>District *</label>
                        <input
                          type="text"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: errors.district ? '1px solid #d32f2f' : '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px'
                          }}
                        />
                        {errors.district && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.district}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 style={{ fontSize: '22px', marginBottom: '24px', color: '#333' }}>Payment Method</h2>
                    
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ 
                        border: formData.paymentMethod === 'mobile_money' ? '2px solid var(--red)' : '1px solid #ddd',
                        borderRadius: '12px',
                        padding: '16px',
                        marginBottom: '16px',
                        cursor: 'pointer'
                      }}
                      onClick={() => setFormData({ ...formData, paymentMethod: 'mobile_money' })}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="mobile_money"
                            checked={formData.paymentMethod === 'mobile_money'}
                            onChange={handleChange}
                          />
                          <span style={{ fontWeight: '500' }}>Mobile Money (MTN / Airtel)</span>
                        </label>
                      </div>

                      <div style={{ 
                        border: formData.paymentMethod === 'bank_transfer' ? '2px solid var(--red)' : '1px solid #ddd',
                        borderRadius: '12px',
                        padding: '16px',
                        cursor: 'pointer'
                      }}
                      onClick={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bank_transfer"
                            checked={formData.paymentMethod === 'bank_transfer'}
                            onChange={handleChange}
                          />
                          <span style={{ fontWeight: '500' }}>Bank Transfer</span>
                        </label>
                      </div>
                    </div>

                    {formData.paymentMethod === 'mobile_money' && (
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Mobile Money Number *</label>
                        <input
                          type="tel"
                          name="mobileMoneyNumber"
                          value={formData.mobileMoneyNumber}
                          onChange={handleChange}
                          placeholder="e.g., 0780XXXXXX"
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: errors.mobileMoneyNumber ? '1px solid #d32f2f' : '1px solid #ddd',
                            borderRadius: '8px',
                            fontSize: '16px'
                          }}
                        />
                        {errors.mobileMoneyNumber && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.mobileMoneyNumber}</p>}
                      </div>
                    )}

                    {formData.paymentMethod === 'bank_transfer' && (
                      <div style={{ 
                        backgroundColor: '#f9f9f9', 
                        padding: '16px', 
                        borderRadius: '12px',
                        marginTop: '16px'
                      }}>
                        <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>Bank Details:</p>
                        <p style={{ fontSize: '13px', fontWeight: '500' }}>Bank: Stanbic Bank Uganda</p>
                        <p style={{ fontSize: '13px', fontWeight: '500' }}>Account Name: Flight 13 Academy</p>
                        <p style={{ fontSize: '13px', fontWeight: '500' }}>Account Number: 1234567890</p>
                        <div style={{ marginTop: '12px' }}>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Transaction Reference Code *</label>
                          <input
                            type="text"
                            name="transactionCode"
                            value={formData.transactionCode}
                            onChange={handleChange}
                            placeholder="Enter transaction code from bank"
                            style={{
                              width: '100%',
                              padding: '12px 16px',
                              border: '1px solid #ddd',
                              borderRadius: '8px',
                              fontSize: '14px'
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <div style={{
                      marginTop: '24px',
                      padding: '16px',
                      backgroundColor: '#fff3e0',
                      borderRadius: '12px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start'
                    }}>
                      <AlertCircle size={20} color="#ff9800" />
                      <div>
                        <p style={{ fontSize: '13px', color: '#666' }}>
                          After payment, you will receive a confirmation email with your registration details.
                          For mobile money, you'll receive a prompt on your phone to complete payment.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#666',
                        padding: '12px 24px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500'
                      }}
                    >
                      ← Back
                    </button>
                  )}
                  {step === 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      style={{
                        backgroundColor: 'var(--red)',
                        color: 'white',
                        padding: '12px 32px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        marginLeft: 'auto'
                      }}
                    >
                      Continue to Payment
                      <ChevronRight size={16} style={{ marginLeft: '8px', verticalAlign: 'middle' }} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isProcessing}
                      style={{
                        backgroundColor: 'var(--red)',
                        color: 'white',
                        padding: '12px 32px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        marginLeft: 'auto',
                        opacity: isProcessing ? 0.7 : 1
                      }}
                    >
                      {isProcessing ? 'Processing...' : `Pay UGX ${cartSummary.total.toLocaleString()}`}
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Order Summary Sidebar */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', height: 'fit-content', position: 'sticky', top: '20px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '2px solid var(--red)', paddingBottom: '12px', display: 'inline-block' }}>Your Order</h3>
              
              <div style={{ marginBottom: '16px' }}>
                {cartSummary.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px' }}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>UGX {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div style={{ borderTop: '1px solid #eee', margin: '16px 0' }} />
              
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                  <span>Subtotal</span>
                  <span>UGX {cartSummary.subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#666' }}>
                  <span>Delivery Fee</span>
                  <span>{cartSummary.deliveryFee === 0 ? 'Free' : `UGX ${cartSummary.deliveryFee.toLocaleString()}`}</span>
                </div>
              </div>
              
              <div style={{ borderTop: '1px solid #eee', margin: '16px 0' }} />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '20px', marginBottom: '20px' }}>
                <span>Total</span>
                <span style={{ color: 'var(--red)' }}>UGX {cartSummary.total.toLocaleString()}</span>
              </div>

              <div style={{ textAlign: 'center' }}>
                <Lock size={16} color="#888" style={{ marginBottom: '8px' }} />
                <p style={{ fontSize: '12px', color: '#888' }}>Secure payment processed by Flight 13</p>
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