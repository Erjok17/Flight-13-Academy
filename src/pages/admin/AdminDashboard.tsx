import { useState, useEffect } from 'react';
import { Users, ShoppingBag, Megaphone, ClipboardList, TrendingUp } from 'lucide-react';
import { API_URL } from '../../config/api';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ athletes: 0, products: 0, announcements: 0, pendingOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      const token = localStorage.getItem('token');
      try {
        const [athletesRes, productsRes, announcementsRes, ordersRes] = await Promise.all([
          fetch(`${API_URL}/api/athletes`),
          fetch(`${API_URL}/api/products`),
          fetch(`${API_URL}/api/announcements`, { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch(`${API_URL}/api/orders`, { headers: { 'Authorization': `Bearer ${token}` } }),
        ]);
        const [athletesData, productsData, announcementsData, ordersData] = await Promise.all([
          athletesRes.json(),
          productsRes.json(),
          announcementsRes.json(),
          ordersRes.json(),
        ]);

        setCounts({
          athletes: athletesData.data?.length || 0,
          products: productsData.data?.length || 0,
          announcements: announcementsData.data?.length || 0,
          pendingOrders: ordersData.data?.filter((o: any) => o.status === 'pending').length || 0,
        });
      } catch (err) {
        console.error('Error fetching overview counts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const stats = [
    { title: 'Total Athletes', value: counts.athletes, icon: <Users size={24} />, color: '#2196F3' },
    { title: 'Total Products', value: counts.products, icon: <ShoppingBag size={24} />, color: '#FF9800' },
    { title: 'Announcements', value: counts.announcements, icon: <Megaphone size={24} />, color: 'var(--red)' },
    { title: 'Pending Orders', value: counts.pendingOrders, icon: <ClipboardList size={24} />, color: '#9C27B0' },
  ];

  if (loading) {
    return <p>Loading overview...</p>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
      {stats.map((stat, idx) => (
        <div key={idx} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ color: stat.color }}>{stat.icon}</div>
            <TrendingUp size={20} color="#4CAF50" />
          </div>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{stat.value}</h3>
          <p style={{ color: '#666' }}>{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;