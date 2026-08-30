import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { API_URL } from '../../config/api';

const emptyForm = {
    title: '', message: '', icon: '📢', link: '', link_text: '',
    event_date: '', location: '', price: '', is_active: true, expires_at: '',
};

const ProgramsAdmin = () => {
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<any>(null);
    const [form, setForm] = useState(emptyForm);

    useEffect(() => { fetchAnnouncements(); }, []);

    const fetchAnnouncements = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/api/announcements`, {  // was /api/announcements/all
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) setAnnouncements(data.data);
        } catch (err) {
            console.error('Error fetching announcements:', err);
        }
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const openAdd = () => {
        setEditing(null);
        setForm(emptyForm);
        setShowForm(true);
    };

    const openEdit = (item: any) => {
        setEditing(item);
        setForm({
            title: item.title || '',
            message: item.message || '',
            icon: item.icon || '📢',
            link: item.link || '',
            link_text: item.link_text || '',
            event_date: item.event_date || '',
            location: item.location || '',
            price: item.price || '',
            is_active: item.is_active !== false,
            expires_at: item.expires_at ? item.expires_at.slice(0, 10) : '',
        });
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        const payload = {
            ...form,
            event_date: form.event_date || null,
            expires_at: form.expires_at || null,
        };

        try {
            const url = editing ? `${API_URL}/api/announcements/${editing.id}` : `${API_URL}/api/announcements`;
            const method = editing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (data.success) {
                setShowForm(false);
                setEditing(null);
                setForm(emptyForm);
                fetchAnnouncements();
            } else {
                alert(data.error || 'Failed to save announcement');
            }
        } catch (err) {
            console.error('Error saving announcement:', err);
            alert('Network error while saving announcement');
        }
    };

    const deleteAnnouncement = async (id: string) => {
        if (!confirm('Are you sure you want to delete this announcement?')) return;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${API_URL}/api/announcements/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) fetchAnnouncements();
            else alert(data.error || 'Failed to delete announcement');
        } catch (err) {
            console.error('Error deleting announcement:', err);
        }
    };

    const inputStyle = { padding: '12px', border: '1px solid #ddd', borderRadius: '8px' };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px' }}>Manage Announcements</h3>
                <button onClick={openAdd} style={{ backgroundColor: 'var(--red)', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={16} /> Add Announcement
                </button>
            </div>

            {showForm && (
                <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '20px' }}>{editing ? 'Edit Announcement' : 'New Announcement'}</h3>
                        <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
                            <X size={20} />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <input name="title" placeholder="Title *" value={form.title} onChange={handleChange} required style={inputStyle} />
                        <input name="icon" placeholder="Icon (emoji, e.g. 🏀)" value={form.icon} onChange={handleChange} style={inputStyle} />
                        <textarea name="message" placeholder="Message *" value={form.message} onChange={handleChange} required rows={3} style={{ ...inputStyle, gridColumn: '1/3' }} />

                        <input name="event_date" type="date" placeholder="Event Date (optional)" value={form.event_date} onChange={handleChange} style={inputStyle} />
                        <input name="location" placeholder="Location (optional)" value={form.location} onChange={handleChange} style={inputStyle} />
                        <input name="price" placeholder="Price (optional, e.g. UGX 50,000)" value={form.price} onChange={handleChange} style={inputStyle} />
                        <input name="expires_at" type="date" placeholder="Expires On (optional)" value={form.expires_at} onChange={handleChange} style={inputStyle} />

                        <input name="link" placeholder="Link (optional, e.g. /programs)" value={form.link} onChange={handleChange} style={inputStyle} />
                        <input name="link_text" placeholder="Link Text (optional, e.g. Learn More)" value={form.link_text} onChange={handleChange} style={inputStyle} />

                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: '1/3' }}>
                            <input type="checkbox" name="is_active" checked={form.is_active} onChange={handleChange} />
                            Active (visible in banner)
                        </label>

                        <div style={{ gridColumn: '1/3', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 24px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                            <button type="submit" style={{ padding: '10px 24px', backgroundColor: 'var(--red)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                                {editing ? 'Update' : 'Add'} Announcement
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <th style={{ textAlign: 'left', padding: '12px' }}>Title</th>
                            <th style={{ textAlign: 'left', padding: '12px' }}>Event Date</th>
                            <th style={{ textAlign: 'left', padding: '12px' }}>Status</th>
                            <th style={{ textAlign: 'left', padding: '12px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {announcements.map(item => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '12px' }}>{item.icon} {item.title}</td>
                                <td style={{ padding: '12px' }}>{item.event_date || '—'}</td>
                                <td style={{ padding: '12px' }}>
                                    <span style={{ backgroundColor: item.is_active ? '#4CAF50' : '#999', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>
                                        {item.is_active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <button onClick={() => openEdit(item)} style={{ color: 'var(--red)', cursor: 'pointer', background: 'none', border: 'none', marginRight: '8px' }}><Edit size={16} /></button>
                                    <button onClick={() => deleteAnnouncement(item.id)} style={{ color: '#f44336', cursor: 'pointer', background: 'none', border: 'none' }}><Trash2 size={16} /></button>
                                </td>
                            </tr>
                        ))}
                        {announcements.length === 0 && (
                            <tr><td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#888' }}>No announcements yet</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProgramsAdmin;