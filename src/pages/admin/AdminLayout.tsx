import { useState, useEffect } from 'react';
import { useNavigate, NavLink, Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { API_URL } from '../../config/api';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingOrders, setPendingOrders] = useState(0);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();

        if (data.error || data.role !== 'admin') {
          navigate('/');
          return;
        }

        setIsAdmin(true);
        fetchPendingOrdersCount(token);
      } catch (err) {
        console.error('Failed to verify admin access:', err);
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [navigate]);

  const fetchPendingOrdersCount = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setPendingOrders(data.data.filter((o: any) => o.status === 'pending').length);
      }
    } catch (err) {
      console.error('Error fetching pending orders count:', err);
    }
  };

  const tabs = [
    { label: 'Overview', path: '/admin', end: true },
    { label: 'Athletes', path: '/admin/athletes' },
    { label: 'Programs', path: '/admin/programs' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Orders', path: '/admin/orders', badge: pendingOrders },
    { label: 'Settings', path: '/admin/settings' },
  ];

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <AnnouncementBanner />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />

      <section style={{ backgroundColor: 'var(--red)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Admin Dashboard</h1>
        <p style={{ fontSize: '18px' }}>Manage athletes, programs, orders, and merchandise</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>

          <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', borderBottom: '1px solid #ddd', paddingBottom: '16px', flexWrap: 'wrap' }}>
            {tabs.map(tab => (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.end}
                style={({ isActive }) => ({
                  padding: '10px 24px',
                  borderRadius: '30px',
                  border: 'none',
                  textDecoration: 'none',
                  backgroundColor: isActive ? 'var(--red)' : 'transparent',
                  color: isActive ? 'white' : '#666',
                  fontWeight: isActive ? 'bold' : 'normal',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                })}
              >
                {tab.label}
                {!!tab.badge && (
                  <span style={{ backgroundColor: '#FF9800', color: 'white', fontSize: '11px', padding: '1px 7px', borderRadius: '20px' }}>
                    {tab.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLayout;