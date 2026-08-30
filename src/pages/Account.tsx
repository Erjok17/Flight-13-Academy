import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { User, LogOut, Edit2, Save, X, ShoppingBag } from 'lucide-react';
import { API_URL } from '../config/api';

const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [dbOrders, setDbOrders] = useState<any[]>([]);

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const [formData, setFormData] = useState(profile);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setIsLoggedIn(true);

    const loadAccount = async () => {
      try {
        const meResponse = await fetch(`${API_URL}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const meData = await meResponse.json();
        if (meData && !meData.error) {
          const profileData = {
            fullName: meData.full_name || '',
            email: meData.email || '',
            phone: meData.phone || '',
          };
          setProfile(profileData);
          setFormData(profileData);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }

      try {
        const orderResponse = await fetch(`${API_URL}/api/orders/my`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const orderData = await orderResponse.json();
        if (orderData.success) {
          setDbOrders(orderData.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setIsLoadingOrders(false);
      }
    };

    loadAccount();
  }, [navigate]);

  const handleEditToggle = async () => {
    if (isEditing) {
      const token = localStorage.getItem('token');
      if (!token) return;

      setSaveError('');

      try {
        const response = await fetch(`${API_URL}/api/auth/profile`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
          })
        });

        const data = await response.json();
        if (data.success) {
          setProfile(formData);

          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const updatedUser = { ...JSON.parse(storedUser), fullName: formData.fullName, email: formData.email };
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }

          setSaveSuccess(true);
          setTimeout(() => setSaveSuccess(false), 3000);
        } else {
          setSaveError(data.error || 'Failed to update profile.');
          return;
        }
      } catch (err) {
        console.error('Failed to save profile:', err);
        setSaveError('Network error. Failed to save changes.');
        return;
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setFormData(profile);
    setSaveError('');
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={18} /> },
  ];

  if (!isLoggedIn) {
    return null;
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
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>My Account</h1>
        <p style={{ fontSize: '18px' }}>Welcome back, {profile.fullName || 'there'}!</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

          {saveSuccess && (
            <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
              ✓ Profile updated successfully!
            </div>
          )}

          {saveError && (
            <div style={{ backgroundColor: '#ffebee', color: '#d32f2f', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
              {saveError}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', height: 'fit-content', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}>
                  <User size={40} color="#666" />
                </div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{profile.fullName || 'User'}</h3>
                <p style={{ fontSize: '12px', color: '#888' }}>{profile.email}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      backgroundColor: activeTab === tab.id ? 'var(--red)' : 'transparent',
                      color: activeTab === tab.id ? 'white' : '#333',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      transition: 'all 0.3s'
                    }}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#d32f2f',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    marginTop: '16px',
                    borderTop: '1px solid #eee'
                  }}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>

              {activeTab === 'profile' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', color: '#333' }}>Profile Information</h2>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {isEditing && (
                        <button onClick={handleCancelEdit} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#666' }}>
                          <X size={16} /> Cancel
                        </button>
                      )}
                      <button onClick={handleEditToggle} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', backgroundColor: isEditing ? '#4CAF50' : 'var(--red)', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white' }}>
                        {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Full Name</label>
                      <input type="text" name="fullName" value={isEditing ? formData.fullName : profile.fullName} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Email</label>
                      <input type="email" name="email" value={isEditing ? formData.email : profile.email} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Phone Number</label>
                      <input type="tel" name="phone" value={isEditing ? formData.phone : profile.phone} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#333' }}>My Orders</h2>
                  {isLoadingOrders ? (
                    <p style={{ color: '#888' }}>Loading your orders...</p>
                  ) : dbOrders.length > 0 ? (
                    dbOrders.map(order => {
                      const itemsCount = Array.isArray(order.items)
                        ? order.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0)
                        : 1;
                      return (
                        <div key={order.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontWeight: 'bold' }}>Order #{order.id}</span>
                            <span style={{ backgroundColor: order.status === 'delivered' || order.status === 'Delivered' ? '#4CAF50' : '#FF9800', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{order.status || 'Pending'}</span>
                          </div>
                          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>📅 {new Date(order.created_at).toLocaleDateString()}</div>
                          <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>🛍️ {itemsCount} item(s)</div>
                          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--red)' }}>UGX {Number(order.total).toLocaleString()}</div>
                        </div>
                      );
                    })
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px 20px', color: '#888' }}>
                      <p>You haven't placed any orders yet.</p>
                    </div>
                  )}
                  <Link to="/shop" style={{ display: 'inline-block', marginTop: '16px', color: 'var(--red)', textDecoration: 'none', fontWeight: '500' }}>
                    ← Continue Shopping
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;