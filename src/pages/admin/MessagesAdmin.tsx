import { useState, useEffect } from 'react';
import { Mail, MailOpen } from 'lucide-react';
import { API_URL } from '../../config/api';

const MessagesAdmin = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => { fetchMessages(); }, []);

    const fetchMessages = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/api/contacts`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) setMessages(data.data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    const toggleReadStatus = async (id: string, currentStatus: string) => {
        const token = localStorage.getItem('token');
        const newStatus = currentStatus === 'unread' ? 'read' : 'unread';
        try {
            const response = await fetch(`${API_URL}/api/contacts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await response.json();
            if (data.success) fetchMessages();
        } catch (err) {
            console.error('Error updating message status:', err);
        }
    };

    const filteredMessages = statusFilter === 'all' ? messages : messages.filter(m => m.status === statusFilter);
    const unreadCount = messages.filter(m => m.status === 'unread').length;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <h3 style={{ fontSize: '20px' }}>
                    Messages {unreadCount > 0 && (
                        <span style={{ backgroundColor: '#FF9800', color: 'white', fontSize: '13px', padding: '2px 10px', borderRadius: '20px', marginLeft: '8px' }}>
                            {unreadCount} unread
                        </span>
                    )}
                </h3>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{ padding: '8px 16px', border: '1px solid #ddd', borderRadius: '8px' }}
                >
                    <option value="all">All Messages</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {filteredMessages.map(msg => (
                    <div
                        key={msg.id}
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            padding: '20px',
                            boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                            borderLeft: msg.status === 'unread' ? '4px solid var(--red)' : '4px solid transparent',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
                            <div>
                                <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{msg.name}</p>
                                <p style={{ fontSize: '13px', color: '#666' }}>{msg.email}</p>
                                {msg.subject && <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>Subject: {msg.subject}</p>}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ fontSize: '12px', color: '#888' }}>
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </span>
                                <span style={{
                                    backgroundColor: msg.status === 'unread' ? 'var(--red)' : '#999',
                                    color: 'white',
                                    padding: '4px 12px',
                                    borderRadius: '20px',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize'
                                }}>
                                    {msg.status}
                                </span>
                            </div>
                        </div>

                        <p style={{ fontSize: '14px', color: '#444', lineHeight: '1.6', borderTop: '1px solid #eee', paddingTop: '12px', marginBottom: '16px', whiteSpace: 'pre-wrap' }}>
                            {msg.message}
                        </p>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <a

                                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(msg.email)}${msg.subject ? `&su=${encodeURIComponent('Re: ' + msg.subject)}` : ''}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--red)', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}
                            >
                                Reply via Email
                            </a>
                            <button
                                onClick={() => toggleReadStatus(msg.id, msg.status)}
                                style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#f0f0f0', color: '#333', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
                            >
                                {msg.status === 'unread' ? <MailOpen size={14} /> : <Mail size={14} />}
                                Mark as {msg.status === 'unread' ? 'Read' : 'Unread'}
                            </button>
                        </div>
                    </div>
                ))}

                {filteredMessages.length === 0 && (
                    <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#888' }}>
                        No messages {statusFilter !== 'all' ? `with status "${statusFilter}"` : 'yet'}.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessagesAdmin;