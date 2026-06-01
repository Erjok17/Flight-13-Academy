import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { User, Package, Heart, Settings, LogOut, Calendar, Trophy, Edit2, Save, X } from 'lucide-react';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+256 780 898611',
    location: 'Kampala, Uganda',
    dateOfBirth: '2010-05-15',
    preferredPosition: 'Point Guard',
    jerseyNumber: '23'
  });

  const [formData, setFormData] = useState(profile);

  const registrations = [
    { id: 1, program: 'Weekly Practices', status: 'Active', startDate: 'June 15, 2025', paymentStatus: 'Paid', amount: '150,000 UGX' },
    { id: 2, program: 'Summer Camp', status: 'Upcoming', startDate: 'July 10, 2025', paymentStatus: 'Pending', amount: '250,000 UGX' },
  ];

  const achievements = [
    { id: 1, title: 'Perfect Attendance', date: 'May 2025', badge: '🏆', description: 'Attended all training sessions for 3 consecutive months' },
    { id: 2, title: 'Most Improved Player', date: 'March 2025', badge: '⭐', description: 'Recognized for exceptional skill development' },
    { id: 3, title: 'Skill Challenge Winner', date: 'February 2025', badge: '🎯', description: 'Won the annual Flight 13 skill competition' },
  ];

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setProfile(formData);
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

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'registrations', label: 'My Registrations', icon: <Package size={18} /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

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
        <p style={{ fontSize: '18px' }}>Manage your profile, registrations, and achievements</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Success Message */}
          {saveSuccess && (
            <div style={{
              backgroundColor: '#d4edda',
              color: '#155724',
              padding: '12px 20px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              ✓ Profile updated successfully!
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '40px' }}>
            {/* Sidebar */}
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
                <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{profile.fullName}</h3>
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

            {/* Main Content */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', color: '#333' }}>Profile Information</h2>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      {isEditing && (
                        <button
                          onClick={handleCancelEdit}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '8px 16px',
                            backgroundColor: '#f0f0f0',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: '#666'
                          }}
                        >
                          <X size={16} /> Cancel
                        </button>
                      )}
                      <button
                        onClick={handleEditToggle}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 16px',
                          backgroundColor: isEditing ? '#4CAF50' : 'var(--red)',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: 'white'
                        }}
                      >
                        {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={isEditing ? formData.fullName : profile.fullName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          backgroundColor: isEditing ? 'white' : '#f9f9f9',
                          color: isEditing ? '#333' : '#666'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Email</label>
                      <input
                        type="email"
                        name="email"
                        value={isEditing ? formData.email : profile.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          backgroundColor: isEditing ? 'white' : '#f9f9f9',
                          color: isEditing ? '#333' : '#666'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={isEditing ? formData.phone : profile.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          backgroundColor: isEditing ? 'white' : '#f9f9f9',
                          color: isEditing ? '#333' : '#666'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Location</label>
                      <input
                        type="text"
                        name="location"
                        value={isEditing ? formData.location : profile.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          backgroundColor: isEditing ? 'white' : '#f9f9f9',
                          color: isEditing ? '#333' : '#666'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={isEditing ? formData.dateOfBirth : profile.dateOfBirth}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          backgroundColor: isEditing ? 'white' : '#f9f9f9',
                          color: isEditing ? '#333' : '#666'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Preferred Position</label>
                      <select
                        name="preferredPosition"
                        value={isEditing ? formData.preferredPosition : profile.preferredPosition}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          backgroundColor: isEditing ? 'white' : '#f9f9f9'
                        }}
                      >
                        <option value="Point Guard">Point Guard</option>
                        <option value="Shooting Guard">Shooting Guard</option>
                        <option value="Small Forward">Small Forward</option>
                        <option value="Power Forward">Power Forward</option>
                        <option value="Center">Center</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#555' }}>Jersey Number</label>
                      <input
                        type="text"
                        name="jerseyNumber"
                        value={isEditing ? formData.jerseyNumber : profile.jerseyNumber}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          backgroundColor: isEditing ? 'white' : '#f9f9f9',
                          color: isEditing ? '#333' : '#666'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Registrations Tab */}
              {activeTab === 'registrations' && (
                <div>
                  <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#333' }}>My Registrations</h2>
                  {registrations.map(reg => (
                    <div key={reg.id} style={{
                      border: '1px solid #eee',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '16px',
                      transition: 'all 0.3s'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                        <h3 style={{ fontWeight: 'bold', fontSize: '18px' }}>{reg.program}</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <span style={{
                            backgroundColor: reg.status === 'Active' ? '#4CAF50' : '#FF9800',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px'
                          }}>
                            {reg.status}
                          </span>
                          <span style={{
                            backgroundColor: reg.paymentStatus === 'Paid' ? '#4CAF50' : '#f44336',
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px'
                          }}>
                            {reg.paymentStatus}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px', color: '#666' }}>
                        <div><Calendar size={14} style={{ display: 'inline', marginRight: '8px' }} /> Starts: {reg.startDate}</div>
                        <div>💰 Amount: {reg.amount}</div>
                      </div>
                    </div>
                  ))}
                  <Link to="/programs" style={{
                    display: 'inline-block',
                    marginTop: '16px',
                    color: 'var(--red)',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}>
                    + Register for more programs
                  </Link>
                </div>
              )}

              {/* Achievements Tab */}
              {activeTab === 'achievements' && (
                <div>
                  <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#333' }}>My Achievements</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {achievements.map(ach => (
                      <div key={ach.id} style={{
                        backgroundColor: '#f9f9f9',
                        borderRadius: '12px',
                        padding: '20px',
                        textAlign: 'center',
                        transition: 'transform 0.3s'
                      }}
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

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 style={{ fontSize: '24px', marginBottom: '24px', color: '#333' }}>Account Settings</h2>
                  
                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#555' }}>Notifications</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked /> Receive email notifications about programs
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked /> Receive promotional offers and camp updates
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked /> Allow coaches to contact me
                      </label>
                    </div>
                  </div>

                  <div style={{ marginBottom: '32px' }}>
                    <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#555' }}>Privacy</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                        <input type="checkbox" defaultChecked /> Make my profile visible to other academy members
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                        <input type="checkbox" /> Share my achievements on social media
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#555' }}>Change Password</h3>
                    <input
                      type="password"
                      placeholder="Current Password"
                      style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '12px' }}
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '12px' }}
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px' }}
                    />
                    <button style={{
                      backgroundColor: 'var(--red)',
                      color: 'white',
                      padding: '12px 24px',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}>
                      Update Password
                    </button>
                  </div>
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