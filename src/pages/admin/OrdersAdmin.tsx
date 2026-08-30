import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { API_URL } from '../../config/api';

const ADMIN_WHATSAPP = '256780898611';

const OrdersAdmin = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/orders`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) setOrders(data.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/orders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) fetchOrders();
      else alert(data.error || 'Failed to update order');
    } catch (err) {
      console.error('Error updating order:', err);
    }
  };

  const notifyWhatsApp = (order: any) => {
    const addr = order.shipping_address || {};
    const itemsList = (order.items || [])
      .map((item: any) => `- ${item.name} x${item.quantity}${item.size ? ` (${item.size})` : ''}`)
      .join('\n');

    const message = `New order from ${addr.full_name || 'a customer'}\n\nPhone: ${addr.phone || 'N/A'}\nEmail: ${addr.email || 'N/A'}\nAddress: ${addr.address || ''}, ${addr.city || ''}, ${addr.district || ''}\n\nItems:\n${itemsList}\n\nTotal: UGX ${Number(order.total).toLocaleString()}`;

    const url = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const filteredOrders = statusFilter === 'all' ? orders : orders.filter(o => o.status === statusFilter);
  const pendingCount = orders.filter(o => o.status === 'pending').length;

  const statusColors: Record<string, string> = {
    pending: '#FF9800',
    confirmed: '#2196F3',
    fulfilled: '#4CAF50',
    cancelled: '#f44336',
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h3 style={{ fontSize: '20px' }}>
          Orders {pendingCount > 0 && (
            <span style={{ backgroundColor: '#FF9800', color: 'white', fontSize: '13px', padding: '2px 10px', borderRadius: '20px', marginLeft: '8px' }}>
              {pendingCount} pending
            </span>
          )}
        </h3>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '8px' }}
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="fulfilled">Fulfilled</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredOrders.map(order => {
          const addr = order.shipping_address || {};
          return (
            <div key={order.id} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{addr.full_name || 'Unknown Customer'}</p>
                  <p style={{ fontSize: '13px', color: '#666' }}>{addr.phone || 'No phone'} • {addr.email || 'No email'}</p>
                  <p style={{ fontSize: '13px', color: '#666' }}>{addr.address}, {addr.city}, {addr.district}</p>
                </div>
                <span style={{
                  backgroundColor: statusColors[order.status] || '#999',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  height: 'fit-content'
                }}>
                  {order.status}
                </span>
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '12px', marginBottom: '12px' }}>
                {(order.items || []).map((item: any, idx: number) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '4px' }}>
                    <span>{item.name}{item.size ? ` (${item.size})` : ''} x{item.quantity}</span>
                    <span>UGX {Number(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '12px' }}>
                <p style={{ fontWeight: 'bold' }}>Total: UGX {Number(order.total).toLocaleString()}</p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={{ padding: '6px 10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '13px' }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="fulfilled">Fulfilled</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={() => notifyWhatsApp(order)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#25D366', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                  >
                    <MessageCircle size={14} /> Notify
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredOrders.length === 0 && (
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#888' }}>
            No orders {statusFilter !== 'all' ? `with status "${statusFilter}"` : 'yet'}.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersAdmin;