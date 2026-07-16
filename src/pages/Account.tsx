import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { User, Package, LogOut, Calendar, Trophy, Edit2, Save, X, ShoppingBag } from 'lucide-react';
import { CentralEngine } from '../db';
import { API_URL } from '../config/api';

const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [userType, setUserType] = useState('general');
  const [dbRegistrations, setDbRegistrations] = useState<any[]>([]);
  const [dbOrders, setDbOrders] = useState<any[]>([]);
  
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    age: '',
    position: '',
    jerseyNumber: '',
    height: '',
    weight: '',
    school: '',
    childName: '',
    childAge: '',
    childSchool: '',
    organization: '',
    scoutRole: '',
  });

  const [formData, setFormData] = useState(profile);

  // Check authentication status and load/sync profile
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }
    
    setIsLoggedIn(true);
    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    setUserType(parsedUser.userType || 'general');

    const loadAndSyncProfile = async () => {
      // 1. Process any pending sync queue updates
      await CentralEngine.processSyncQueue(token);

      // 2. Optimistic load: fetch from Dexie IndexedDB first
      const cached = await CentralEngine.getProfileLocal(parsedUser.id);
      const activeUser = cached || parsedUser;

      const profileData = {
        fullName: activeUser.fullName || '',
        email: activeUser.email || '',
        phone: activeUser.phone || '',
        location: activeUser.location || 'Kampala, Uganda',
        dateOfBirth: activeUser.dateOfBirth || '',
        age: activeUser.age || '',
        position: activeUser.position || '',
        jerseyNumber: activeUser.jerseyNumber || '',
        height: activeUser.height || '',
        weight: activeUser.weight || '',
        school: activeUser.school || '',
        childName: activeUser.childName || '',
        childAge: activeUser.childAge || '',
        childSchool: activeUser.childSchool || '',
        organization: activeUser.organization || '',
        scoutRole: activeUser.scoutRole || '',
      };
      
      setProfile(profileData);
      setFormData(profileData);

      // 3. Load registrations and orders from API
      try {
        const regResponse = await fetch(`${API_URL}/api/registrations/my`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const regData = await regResponse.json();
        if (regData.success) {
          setDbRegistrations(regData.data || []);
        }

        const orderResponse = await fetch(`${API_URL}/api/orders/my`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const orderData = await orderResponse.json();
        if (orderData.success) {
          setDbOrders(orderData.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch histories:', err);
      }

      // 4. Network pull: fetch latest profile from backend database and sync
      const freshProfile = await CentralEngine.syncProfileFromBackend(token);
      if (freshProfile) {
        const freshData = {
          fullName: freshProfile.fullName || '',
          email: freshProfile.email || '',
          phone: freshProfile.phone || '',
          location: freshProfile.location || 'Kampala, Uganda',
          dateOfBirth: freshProfile.dateOfBirth || '',
          age: freshProfile.age || '',
          position: freshProfile.position || '',
          jerseyNumber: freshProfile.jerseyNumber || '',
          height: freshProfile.height || '',
          weight: freshProfile.weight || '',
          school: freshProfile.school || '',
          childName: freshProfile.childName || '',
          childAge: freshProfile.childAge || '',
          childSchool: freshProfile.childSchool || '',
          organization: freshProfile.organization || '',
          scoutRole: freshProfile.scoutRole || '',
        };
        setProfile(freshData);
        setFormData(freshData);
      }
    };

    loadAndSyncProfile();
  }, [navigate]);

  const playerRegistrations = [
    { id: 1, program: 'Weekly Practices', status: 'Active', startDate: 'June 15, 2025', paymentStatus: 'Paid', amount: '150,000 UGX' },
    { id: 2, program: 'Summer Camp', status: 'Upcoming', startDate: 'July 10, 2025', paymentStatus: 'Pending', amount: '250,000 UGX' },
  ];

  const parentRegistrations = [
    { id: 1, childName: 'James Okello', program: 'Weekly Practices', status: 'Active', startDate: 'June 15, 2025', paymentStatus: 'Paid', amount: '150,000 UGX' },
  ];

  const playerAchievements = [
    { id: 1, title: 'Perfect Attendance', date: 'May 2025', badge: '🏆', description: 'Attended all training sessions for 3 consecutive months' },
    { id: 2, title: 'Most Improved Player', date: 'March 2025', badge: '⭐', description: 'Recognized for exceptional skill development' },
    { id: 3, title: 'Skill Challenge Winner', date: 'February 2025', badge: '🎯', description: 'Won the annual Flight 13 skill competition' },
  ];

  const orders = [
    { id: 1, date: 'June 1, 2025', items: 2, total: 130000, status: 'Delivered' },
    { id: 2, date: 'May 15, 2025', items: 1, total: 55000, status: 'Delivered' },
  ];

  const handleEditToggle = async () => {
    if (isEditing) {
      const token = localStorage.getItem('token');
      if (!token) return;

      const updatedUser = { 
        ...user, 
        ...formData,
        id: user.id,
        userType: userType
      };

      setProfile(formData);
      setUser(updatedUser);

      // Save via Sync Engine (IndexedDB update + Postgres PUT + offline queue fallback)
      const isSynced = await CentralEngine.updateProfile(updatedUser, token);
      if (isSynced) {
        console.log('Profile synced with backend successfully.');
      } else {
        console.log('Profile saved locally (offline). Will sync when connection is restored.');
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const getTabs = () => {
    const baseTabs = [{ id: 'profile', label: 'Profile', icon: <User size={18} /> }];
    
    if (userType === 'player') {
      baseTabs.push(
        { id: 'registrations', label: 'My Registrations', icon: <Package size={18} /> },
        { id: 'achievements', label: 'Achievements', icon: <Trophy size={18} /> },
        { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={18} /> }
      );
    } else if (userType === 'parent') {
      baseTabs.push(
        { id: 'children', label: 'My Children', icon: <User size={18} /> },
        { id: 'registrations', label: 'Registrations', icon: <Package size={18} /> },
        { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={18} /> }
      );
    } else if (userType === 'scout') {
      baseTabs.push(
        { id: 'athletes', label: 'Find Athletes', icon: <User size={18} /> },
        { id: 'contacts', label: 'Saved Contacts', icon: <User size={18} /> }
      );
    } else {
      baseTabs.push({ id: 'orders', label: 'My Orders', icon: <ShoppingBag size={18} /> });
    }
    
    return baseTabs;
  };

  const tabs = getTabs();

  const getRoleBadge = () => {
    switch (userType) {
      case 'player': return { bg: '#4CAF50', label: '🏀 Player' };
      case 'parent': return { bg: '#2196F3', label: '👨‍👩‍👧 Parent' };
      case 'scout': return { bg: '#FF9800', label: '🔍 Scout' };
      case 'admin': return { bg: '#9C27B0', label: '👑 Admin' };
      default: return { bg: '#9E9E9E', label: '🛒 General User' };
    }
  };

  const roleBadge = getRoleBadge();

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
        <p style={{ fontSize: '18px' }}>Welcome back, {profile.fullName || 'Athlete'}!</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {saveSuccess && (
            <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
              ✓ Profile updated successfully!
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
                <span style={{
                  display: 'inline-block',
                  marginTop: '8px',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  backgroundColor: roleBadge.bg,
                  color: 'white'
                }}>
                  {roleBadge.label}
                </span>
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
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Location</label>
                      <input type="text" name="location" value={isEditing ? formData.location : profile.location} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                    </div>
                    
                    {userType === 'player' && (
                      <>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Age</label>
                          <input type="number" name="age" value={isEditing ? formData.age : profile.age} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Position</label>
                          <select name="position" value={isEditing ? formData.position : profile.position} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9' }}>
                            <option value="Point Guard">Point Guard</option>
                            <option value="Shooting Guard">Shooting Guard</option>
                            <option value="Small Forward">Small Forward</option>
                            <option value="Power Forward">Power Forward</option>
                            <option value="Center">Center</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Jersey Number</label>
                          <input type="text" name="jerseyNumber" value={isEditing ? formData.jerseyNumber : profile.jerseyNumber} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Height</label>
                          <input type="text" name="height" value={isEditing ? formData.height : profile.height} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Weight</label>
                          <input type="text" name="weight" value={isEditing ? formData.weight : profile.weight} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>School</label>
                          <input type="text" name="school" value={isEditing ? formData.school : profile.school} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                        </div>
                      </>
                    )}

                    {userType === 'parent' && (
                      <>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Child's Name</label>
                          <input type="text" name="childName" value={isEditing ? formData.childName : profile.childName} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Child's Age</label>
                          <input type="number" name="childAge" value={isEditing ? formData.childAge : profile.childAge} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Child's School</label>
                          <input type="text" name="childSchool" value={isEditing ? formData.childSchool : profile.childSchool} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                        </div>
                      </>
                    )}

                    {userType === 'scout' && (
                      <>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Organization</label>
                          <input type="text" name="organization" value={isEditing ? formData.organization : profile.organization} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Role</label>
                          <input type="text" name="scoutRole" value={isEditing ? formData.scoutRole : profile.scoutRole} onChange={handleInputChange} disabled={!isEditing} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: isEditing ? 'white' : '#f9f9f9', color: isEditing ? '#333' : '#666' }} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'registrations' && userType === 'player' && (
                <div>
                  <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#333' }}>My Registrations</h2>
                  {dbRegistrations.length > 0 ? (
                    dbRegistrations.map(reg => (
                      <div key={reg.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                          <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>{reg.programs?.title || reg.program_type || 'Weekly Practices'}</h3>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <span style={{ backgroundColor: reg.status === 'confirmed' || reg.status === 'Active' ? '#4CAF50' : '#FF9800', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{reg.status || 'Pending'}</span>
                            <span style={{ backgroundColor: reg.payment_status === 'paid' || reg.paymentStatus === 'Paid' ? '#4CAF50' : '#f44336', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{reg.payment_status || 'Pending'}</span>
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', color: '#666' }}>
                          <div><Calendar size={14} style={{ display: 'inline', marginRight: '8px' }} /> Registered: {new Date(reg.registered_at).toLocaleDateString()}</div>
                          <div>💰 Amount: UGX {Number(reg.amount).toLocaleString()}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    playerRegistrations.map(reg => (
                      <div key={reg.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '20px', marginBottom: '16px', opacity: 0.7 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                          <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>{reg.program} (Sample)</h3>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{reg.status}</span>
                            <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{reg.paymentStatus}</span>
                          </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', color: '#666' }}>
                          <div><Calendar size={14} style={{ display: 'inline', marginRight: '8px' }} /> Starts: {reg.startDate}</div>
                          <div>💰 Amount: {reg.amount}</div>
                        </div>
                      </div>
                    ))
                  )}
                  <Link to="/programs" style={{ display: 'inline-block', marginTop: '16px', color: 'var(--red)', textDecoration: 'none', fontWeight: '500' }}>
                    + Register for more programs
                  </Link>
                </div>
              )}

              {activeTab === 'registrations' && userType === 'parent' && (
                <div>
                  <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#333' }}>Children's Registrations</h2>
                  {dbRegistrations.length > 0 ? (
                    dbRegistrations.map(reg => (
                      <div key={reg.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>{reg.athlete_name || reg.parent_name || 'Registered Child'}</h3>
                          <span style={{ backgroundColor: reg.status === 'confirmed' || reg.status === 'Active' ? '#4CAF50' : '#FF9800', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{reg.status || 'Pending'}</span>
                        </div>
                        <p style={{ color: '#666', marginBottom: '8px' }}><strong>Program:</strong> {reg.programs?.title || reg.program_type || 'Weekly Practices'}</p>
                        <p style={{ color: '#666', marginBottom: '8px' }}><strong>Registered:</strong> {new Date(reg.registered_at).toLocaleDateString()}</p>
                        <p style={{ color: '#666', marginBottom: '8px' }}><strong>Amount:</strong> UGX {Number(reg.amount).toLocaleString()}</p>
                        <span style={{ backgroundColor: reg.payment_status === 'paid' || reg.paymentStatus === 'Paid' ? '#4CAF50' : '#f44336', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', display: 'inline-block' }}>{reg.payment_status || 'Pending'}</span>
                      </div>
                    ))
                  ) : (
                    parentRegistrations.map(reg => (
                      <div key={reg.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '20px', marginBottom: '16px', opacity: 0.7 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>{reg.childName} (Sample)</h3>
                          <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{reg.status}</span>
                        </div>
                        <p style={{ color: '#666', marginBottom: '8px' }}><strong>Program:</strong> {reg.program}</p>
                        <p style={{ color: '#666', marginBottom: '8px' }}><strong>Starts:</strong> {reg.startDate}</p>
                        <p style={{ color: '#666', marginBottom: '8px' }}><strong>Amount:</strong> {reg.amount}</p>
                        <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', display: 'inline-block' }}>{reg.paymentStatus}</span>
                      </div>
                    ))
                  )}
                  <Link to="/programs" style={{ display: 'inline-block', marginTop: '16px', color: 'var(--red)', textDecoration: 'none', fontWeight: '500' }}>
                    + Register child for programs
                  </Link>
                </div>
              )}

              {activeTab === 'achievements' && userType === 'player' && (
                <div>
                  <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#333' }}>My Achievements</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {playerAchievements.map(ach => (
                      <div key={ach.id} style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '20px', textAlign: 'center', transition: 'transform 0.3s' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                        <div style={{ fontSize: '48px', marginBottom: '12px' }}>{ach.badge}</div>
                        <h3 style={{ fontWeight: 'bold', marginBottom: '8px' }}>{ach.title}</h3>
                        <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>Earned: {ach.date}</p>
                        <p style={{ fontSize: '13px', color: '#666' }}>{ach.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#333' }}>My Orders</h2>
                  {dbOrders.length > 0 ? (
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
                    orders.map(order => (
                      <div key={order.id} style={{ border: '1px solid #eee', borderRadius: '12px', padding: '20px', marginBottom: '16px', opacity: 0.7 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontWeight: 'bold' }}>Order #{order.id} (Sample)</span>
                          <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px' }}>{order.status}</span>
                        </div>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>📅 {order.date}</div>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>🛍️ {order.items} item(s)</div>
                        <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--red)' }}>UGX {order.total.toLocaleString()}</div>
                      </div>
                    ))
                  )}
                  <Link to="/shop" style={{ display: 'inline-block', marginTop: '16px', color: 'var(--red)', textDecoration: 'none', fontWeight: '500' }}>
                    ← Continue Shopping
                  </Link>
                </div>
              )}

              {(activeTab === 'children' || activeTab === 'athletes' || activeTab === 'contacts') && (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚧</div>
                  <h3 style={{ fontSize: '20px', color: '#666', marginBottom: '8px' }}>Coming Soon</h3>
                  <p style={{ color: '#888' }}>This feature is currently under development.</p>
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