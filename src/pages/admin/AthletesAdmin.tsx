import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { API_URL } from '../../config/api';

const emptyForm = {
  name: '', age: '', height: '', weight: '', position: '', school: '',
  achievements: '', strengths: '', image_url: '', college_interest: '',
  scholarship_offers: 0, bio: '', jersey_size: '',
  emergency_contact_name: '', emergency_contact_phone: '',
  parent_name: '', parent_relationship: '', parent_phone: '',
  parent_email: '', parent_address: '',
};

const AthletesAdmin = () => {
  const [athletes, setAthletes] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState(emptyForm);
  const [medicalNotes, setMedicalNotes] = useState('');
  const [savingMedical, setSavingMedical] = useState(false);

  useEffect(() => { fetchAthletes(); }, []);

  const fetchAthletes = async () => {
    try {
      const response = await fetch(`${API_URL}/api/athletes`);
      const data = await response.json();
      if (data.success) setAthletes(data.data);
    } catch (err) {
      console.error('Error fetching athletes:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setMedicalNotes('');
    setShowForm(true);
  };

  const openEdit = async (athlete: any) => {
    setEditing(athlete);
    setForm({
      name: athlete.name || '',
      age: athlete.age || '',
      height: athlete.height || '',
      weight: athlete.weight || '',
      position: athlete.position || '',
      school: athlete.school || '',
      achievements: (athlete.achievements || []).join(', '),
      strengths: (athlete.strengths || []).join(', '),
      image_url: athlete.image_url || '',
      college_interest: athlete.college_interest || '',
      scholarship_offers: athlete.scholarship_offers || 0,
      bio: athlete.bio || '',
      jersey_size: athlete.jersey_size || '',
      emergency_contact_name: athlete.emergency_contact_name || '',
      emergency_contact_phone: athlete.emergency_contact_phone || '',
      parent_name: athlete.parent_name || '',
      parent_relationship: athlete.parent_relationship || '',
      parent_phone: athlete.parent_phone || '',
      parent_email: athlete.parent_email || '',
      parent_address: athlete.parent_address || '',
    });
    setShowForm(true);

    // fetch medical notes separately (admin-only endpoint)
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/api/athletes/${athlete.id}/medical`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();
      setMedicalNotes(data.data?.notes || '');
    } catch (err) {
      console.error('Error fetching medical notes:', err);
      setMedicalNotes('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const payload = {
      ...form,
      age: form.age ? parseInt(form.age as any) : null,
      scholarship_offers: parseInt(form.scholarship_offers as any) || 0,
      achievements: form.achievements ? form.achievements.split(',').map(s => s.trim()).filter(Boolean) : [],
      strengths: form.strengths ? form.strengths.split(',').map(s => s.trim()).filter(Boolean) : [],
    };

    try {
      const url = editing ? `${API_URL}/api/athletes/${editing.id}` : `${API_URL}/api/athletes`;
      const method = editing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!data.success) {
        alert(data.error || 'Failed to save athlete');
        return;
      }

      const athleteId = editing ? editing.id : data.data.id;

      // save medical notes separately
      setSavingMedical(true);
      await fetch(`${API_URL}/api/athletes/${athleteId}/medical`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ notes: medicalNotes }),
      });
      setSavingMedical(false);

      setShowForm(false);
      setEditing(null);
      setForm(emptyForm);
      setMedicalNotes('');
      fetchAthletes();
    } catch (err) {
      console.error('Error saving athlete:', err);
      alert('Network error while saving athlete');
    }
  };

  const deleteAthlete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this athlete?')) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/athletes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) fetchAthletes();
      else alert(data.error || 'Failed to delete athlete');
    } catch (err) {
      console.error('Error deleting athlete:', err);
    }
  };

  const inputStyle = { padding: '12px', border: '1px solid #ddd', borderRadius: '8px' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '20px' }}>Manage Athletes</h3>
        <button onClick={openAdd} style={{ backgroundColor: 'var(--red)', color: 'white', padding: '8px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Plus size={16} /> Add Athlete
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '20px' }}>{editing ? 'Edit Athlete' : 'Add New Athlete'}</h3>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}>
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <h4 style={{ fontSize: '15px', color: '#888', margin: '4px 0 12px' }}>Player Info</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <input name="name" placeholder="Full Name *" value={form.name} onChange={handleChange} required style={inputStyle} />
              <input name="age" type="number" placeholder="Age" value={form.age} onChange={handleChange} style={inputStyle} />
              <input name="position" placeholder="Position" value={form.position} onChange={handleChange} style={inputStyle} />
              <input name="school" placeholder="School" value={form.school} onChange={handleChange} style={inputStyle} />
              <input name="height" placeholder={`Height (e.g., 6'2")`} value={form.height} onChange={handleChange} style={inputStyle} />
              <input name="weight" placeholder="Weight (e.g., 185 lbs)" value={form.weight} onChange={handleChange} style={inputStyle} />
              <input name="jersey_size" placeholder="Jersey Size (e.g., YL, M, XL)" value={form.jersey_size} onChange={handleChange} style={inputStyle} />
              <input name="college_interest" placeholder="College Interest" value={form.college_interest} onChange={handleChange} style={inputStyle} />
              <input name="scholarship_offers" type="number" placeholder="Scholarship Offers" value={form.scholarship_offers} onChange={handleChange} style={inputStyle} />
              <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} style={{ ...inputStyle, gridColumn: '1/3' }} />
              <textarea name="achievements" placeholder="Achievements (comma separated)" value={form.achievements} onChange={handleChange} rows={2} style={inputStyle} />
              <textarea name="strengths" placeholder="Strengths (comma separated)" value={form.strengths} onChange={handleChange} rows={2} style={inputStyle} />
              <textarea name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} rows={3} style={{ ...inputStyle, gridColumn: '1/3' }} />
            </div>

            <h4 style={{ fontSize: '15px', color: '#888', margin: '4px 0 12px' }}>Guardian / Emergency Contact</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <input name="parent_name" placeholder="Parent/Guardian Name" value={form.parent_name} onChange={handleChange} style={inputStyle} />
              <input name="parent_relationship" placeholder="Relationship (e.g., Mother)" value={form.parent_relationship} onChange={handleChange} style={inputStyle} />
              <input name="parent_phone" placeholder="Parent Phone" value={form.parent_phone} onChange={handleChange} style={inputStyle} />
              <input name="parent_email" placeholder="Parent Email" value={form.parent_email} onChange={handleChange} style={inputStyle} />
              <input name="parent_address" placeholder="Home Address" value={form.parent_address} onChange={handleChange} style={{ ...inputStyle, gridColumn: '1/3' }} />
              <input name="emergency_contact_name" placeholder="Emergency Contact Name" value={form.emergency_contact_name} onChange={handleChange} style={inputStyle} />
              <input name="emergency_contact_phone" placeholder="Emergency Contact Phone" value={form.emergency_contact_phone} onChange={handleChange} style={inputStyle} />
            </div>

            <h4 style={{ fontSize: '15px', color: '#888', margin: '4px 0 12px' }}>Medical Notes (admin-only, never shown publicly)</h4>
            <textarea
              placeholder="Any medical conditions, allergies, or notes coaches should know"
              value={medicalNotes}
              onChange={(e) => setMedicalNotes(e.target.value)}
              rows={3}
              style={{ ...inputStyle, width: '100%', marginBottom: '20px', boxSizing: 'border-box' }}
            />

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)} style={{ padding: '10px 24px', backgroundColor: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" disabled={savingMedical} style={{ padding: '10px 24px', backgroundColor: 'var(--red)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                {editing ? 'Update' : 'Add'} Athlete
              </button>
            </div>
          </form>
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', overflowX: 'auto' }}>
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
            {athletes.map(athlete => (
              <tr key={athlete.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{athlete.name}</td>
                <td style={{ padding: '12px' }}>{athlete.age || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{athlete.position || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{athlete.school || 'N/A'}</td>
                <td style={{ padding: '12px' }}>
                  <button onClick={() => openEdit(athlete)} style={{ color: 'var(--red)', cursor: 'pointer', background: 'none', border: 'none', marginRight: '8px' }}><Edit size={16} /></button>
                  <button onClick={() => deleteAthlete(athlete.id)} style={{ color: '#f44336', cursor: 'pointer', background: 'none', border: 'none' }}><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {athletes.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#888' }}>No athletes added yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AthletesAdmin;