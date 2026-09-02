import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { Ruler, Weight, GraduationCap, Award } from 'lucide-react';
import { API_URL } from '../../config/api';

interface AthleteProfile {
  id: string;
  name: string;
  age: number;
  height: string;
  weight: string;
  position: string;
  school: string;
  achievements: string[];
  strengths: string[];
  image_url: string;
  college_interest: string;
  scholarship_offers: number;
  bio: string;
  parent_name: string;
  parent_phone: string;
  parent_email: string;
}

const AthleteProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [athlete, setAthlete] = useState<AthleteProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    fetchAthlete();
  }, [id]);

  const fetchAthlete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/athletes/${id}`);
      const data = await response.json();
      
      if (data.success) {
        setAthlete(data.data);
      } else {
        setError(data.error || 'Athlete not found');
      }
    } catch (err) {
      console.error('Error fetching athlete:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <AnnouncementBanner />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <p>Loading athlete profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !athlete) {
    return (
      <div>
        <Navbar />
        <AnnouncementBanner />
        <main style={{ padding: '80px 20px', textAlign: 'center' }}>
          <h2>{error || 'Athlete not found'}</h2>
          <Link to="/athletes" style={{ color: 'var(--red)' }}>← Back to Athletes Directory</Link>
        </main>
        <Footer />
      </div>
    );
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
        <Link to="/athletes" style={{ color: 'white', textDecoration: 'none', marginBottom: '16px', display: 'inline-block' }}>
          ← Back to Athletes
        </Link>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '8px' }}>{athlete.name}</h1>
        <p style={{ fontSize: '18px' }}>{athlete.position} • Age {athlete.age}</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <div style={{
                backgroundColor: '#e0e0e0',
                borderRadius: '20px',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px'
              }}>
                {athlete.image_url ? (
                  <img src={athlete.image_url} alt={athlete.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }} />
                ) : (
                  <span style={{ fontSize: '80px' }}>🏀</span>
                )}
              </div>
              
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>Athlete Information</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div><Ruler size={16} style={{ display: 'inline', marginRight: '8px' }} /> Height: {athlete.height || 'N/A'}</div>
                  <div><Weight size={16} style={{ display: 'inline', marginRight: '8px' }} /> Weight: {athlete.weight || 'N/A'}</div>
                  <div><GraduationCap size={16} style={{ display: 'inline', marginRight: '8px' }} /> School: {athlete.school || 'N/A'}</div>
                </div>
              </div>

              {/* <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>Guardian Contact</h3>
                <div style={{ marginBottom: '12px' }}>
                  <Mail size={16} style={{ display: 'inline', marginRight: '8px' }} /> {athlete.parent_email || 'Not available'}
                </div>
                <div>
                  <Phone size={16} style={{ display: 'inline', marginRight: '8px' }} /> {athlete.parent_phone || 'Not available'}
                </div>
              </div> */}
            </div>

            <div>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>About {athlete.name.split(' ')[0]}</h3>
                <p style={{ lineHeight: '1.6', color: '#555', marginBottom: '16px' }}>
                  {athlete.bio || `${athlete.name} is a talented ${athlete.position} who has been developing their skills at Flight 13. With dedication and hard work, they continue to improve every day.`}
                </p>
                <div style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '12px', marginTop: '16px' }}>
                  <p style={{ fontWeight: 'bold', marginBottom: '8px' }}>🎓 College Interest:</p>
                  <p>{athlete.college_interest || 'Exploring opportunities'}</p>
                  {athlete.scholarship_offers > 0 && (
                    <p style={{ marginTop: '8px', color: '#4CAF50' }}>✓ {athlete.scholarship_offers} scholarship offer(s) received</p>
                  )}
                </div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>🏆 Achievements</h3>
                {athlete.achievements && athlete.achievements.length > 0 ? (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {athlete.achievements.map((ach, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <Award size={18} color="var(--red)" /> {ach}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ color: '#888' }}>No achievements listed yet.</p>
                )}
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#333' }}>💪 Strengths</h3>
                {athlete.strengths && athlete.strengths.length > 0 ? (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {athlete.strengths.map((strength, idx) => (
                      <span key={idx} style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px', fontSize: '14px' }}>
                        {strength}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: '#888' }}>No strengths listed yet.</p>
                )}
              </div>

              {!showContactForm ? (
                <button
                  onClick={() => setShowContactForm(true)}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--red)',
                    color: 'white',
                    padding: '14px',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  📧 Contact Coach for More Information
                </button>
              ) : (
                <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px' }}>
                  <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Request More Information</h3>
                  <textarea
                    placeholder="Write your message here..."
                    rows={4}
                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '12px' }}
                  />
                  <button style={{ backgroundColor: 'var(--red)', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginRight: '12px' }}>
                    Send Request
                  </button>
                  <button onClick={() => setShowContactForm(false)} style={{ backgroundColor: '#ddd', color: '#333', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    Cancel
                  </button>
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

export default AthleteProfile;