import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { API_URL } from '../config/api';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  size?: string;
}

interface CartSummaryItem {
  name: string;
  quantity: number;
  price: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiError, setApiError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { items, getTotalPrice, clearCart } = useCart();
  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 100000 ? 0 : 10000;
  const total = subtotal + deliveryFee;

  const cartSummary = {
    subtotal,
    deliveryFee,
    total,
    items: items.map((item: CartItem) => ({
      name: item.name + (item.size ? ` (Size: ${item.size})` : ''),
      quantity: item.quantity,
      price: item.price
    }))
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsProcessing(true);
    setApiError('');

    const token = localStorage.getItem('token');
    if (!token) {
      setApiError('You must be logged in to place an order.');
      setIsProcessing(false);
      return;
    }

    try {
      const orderPayload = {
        items: items.map((item: CartItem) => ({
          product_id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          size: item.size
        })),
        total,
        shipping_address: {
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          district: formData.district
        },
        payment_method: 'manual_arrangement'
      };

      const orderResponse = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });

      const orderData = await orderResponse.json();
      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to place order.');
      }

      clearCart();
      alert("Order placed! We'll contact you shortly by phone or WhatsApp to confirm details and arrange payment.");
      navigate('/');
    } catch (err: any) {
      console.error(err);
      setApiError(err.message || 'Network error. Failed to place order.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />

      <section style={{ backgroundColor: 'var(--red)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Checkout</h1>
        <p style={{ fontSize: '18px' }}>Tell us where to reach you — we'll confirm payment directly</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px' }}>
            <form onSubmit={handleSubmit}>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                {apiError && (
                  <div style={{ backgroundColor: '#ffebee', color: '#d32f2f', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>
                    {apiError}
                  </div>
                )}

                <h2 style={{ fontSize: '22px', marginBottom: '24px', color: '#333' }}>Contact Information</h2>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '12px 16px', border: errors.fullName ? '1px solid #d32f2f' : '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
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
                      style={{ width: '100%', padding: '12px 16px', border: errors.email ? '1px solid #d32f2f' : '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
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
                      placeholder="e.g., 0780XXXXXX"
                      style={{ width: '100%', padding: '12px 16px', border: errors.phone ? '1px solid #d32f2f' : '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
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
                    style={{ width: '100%', padding: '12px 16px', border: errors.address ? '1px solid #d32f2f' : '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
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
                      style={{ width: '100%', padding: '12px 16px', border: errors.city ? '1px solid #d32f2f' : '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
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
                      style={{ width: '100%', padding: '12px 16px', border: errors.district ? '1px solid #d32f2f' : '1px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
                    />
                    {errors.district && <p style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.district}</p>}
                  </div>
                </div>

                <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#e8f5e9', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle size={20} color="#4CAF50" />
                  <p style={{ fontSize: '13px', color: '#555' }}>
                    No payment needed right now — once you place your order, our team will reach out by phone or WhatsApp to confirm details and arrange payment.
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
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
                      opacity: isProcessing ? 0.7 : 1
                    }}
                  >
                    {isProcessing ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
            </form>

            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', height: 'fit-content', position: 'sticky', top: '20px' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '20px', borderBottom: '2px solid var(--red)', paddingBottom: '12px', display: 'inline-block' }}>Your Order</h3>

              <div style={{ marginBottom: '16px' }}>
                {cartSummary.items.map((item: CartSummaryItem, idx: number) => (
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

              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '20px' }}>
                <span>Total</span>
                <span style={{ color: 'var(--red)' }}>UGX {cartSummary.total.toLocaleString()}</span>
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