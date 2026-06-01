import { useState } from 'react';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { Users, ShoppingBag, Calendar, DollarSign, TrendingUp, Plus, Edit, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Athletes', value: '45', icon: <Users size={24} />, change: '+5 this month', color: '#2196F3' },
    { title: 'Active Programs', value: '4', icon: <Calendar size={24} />, change: 'All active', color: '#4CAF50' },
    { title: 'Products Sold', value: '128', icon: <ShoppingBag size={24} />, change: '+23 this month', color: '#FF9800' },
    { title: 'Revenue (UGX)', value: '8.2M', icon: <DollarSign size={24} />, change: '+1.2M', color: 'var(--red)' },
  ];

  const recentRegistrations = [
    { id: 1, name: 'John Doe', program: 'Weekly Practices', date: '2024-01-15', status: 'Confirmed' },
    { id: 2, name: 'Jane Smith', program: 'Holiday Camp', date: '2024-01-14', status: 'Pending' },
    { id: 3, name: 'Mike Johnson', program: 'Private Sessions', date: '2024-01-13', status: 'Confirmed' },
  ];

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />
      
      <section style={{ backgroundColor: 'var(--red)', color: 'white', padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Admin Dashboard</h1>
        <p style={{ fontSize: '18px' }}>Manage athletes, programs, registrations, and merchandise</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ display: 'flex', gap: '16px', marginBottom: '40px', borderBottom: '1px solid #ddd', paddingBottom: '16px', flexWrap: 'wrap' }}>
            {['overview', 'athletes', 'programs', 'registrations', 'products', 'settings'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '30px',
                  border: 'none',
                  backgroundColor: activeTab === tab ? 'var(--red)' : 'transparent',
                  color: activeTab === tab ? 'white' : '#666',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                  textTransform: 'capitalize'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                {stats.map((stat, idx) => (
                  <div key={idx} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{ color: stat.color }}>{stat.icon}</div>
                      <TrendingUp size={20} color="#4CAF50" />
                    </div>
                    <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{stat.value}</h3>
                    <p style={{ color: '#666', marginBottom: '4px' }}>{stat.title}</p>
                    <span style={{ fontSize: '12px', color: '#4CAF50' }}>{stat.change}</span>
                  </div>
                ))}
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Recent Registrations</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #eee' }}>
                      <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '12px' }}>Program</th>
                      <th style={{ textAlign: 'left', padding: '12px' }}>Date</th>
                      <th style={{ textAlign: 'left', padding: '12px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRegistrations.map(reg => (
                      <tr key={reg.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '12px' }}>{reg.name}</td>
                        <td style={{ padding: '12px' }}>{reg.program}</td>
                        <td style={{ padding: '12px' }}>{reg.date}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ backgroundColor: reg.status === 'Confirmed' ? '#4CAF50' : '#FF9800', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{reg.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'athletes' && (
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px' }}>Manage Athletes</h3>
                <button style={{ backgroundColor: 'var(--red)', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Plus size={16} /> Add Athlete
                </button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Age</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Position</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>School</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>James Okello</td>
                    <td style={{ padding: '12px' }}>16</td>
                    <td style={{ padding: '12px' }}>Point Guard</td>
                    <td style={{ padding: '12px' }}>St. Mary's College</td>
                    <td style={{ padding: '12px' }}><button style={{ color: 'var(--red)', cursor: 'pointer' }}><Edit size={16} /></button> <button style={{ color: '#f44336', cursor: 'pointer' }}><Trash2 size={16} /></button></td>
                   </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'products' && (
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px' }}>Manage Products</h3>
                <button style={{ backgroundColor: 'var(--red)', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Plus size={16} /> Add Product
                </button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Name</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Price</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Category</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Stock</th>
                    <th style={{ textAlign: 'left', padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>Flight 13 Home Jersey</td>
                    <td style={{ padding: '12px' }}>UGX 75,000</td>
                    <td style={{ padding: '12px' }}>Jerseys</td>
                    <td style={{ padding: '12px' }}>In Stock</td>
                    <td style={{ padding: '12px' }}><button style={{ color: 'var(--red)', cursor: 'pointer' }}><Edit size={16} /></button> <button style={{ color: '#f44336', cursor: 'pointer' }}><Trash2 size={16} /></button></td>
                   </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;