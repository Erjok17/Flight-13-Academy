import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { Search, Ruler, Weight, GraduationCap } from 'lucide-react';
import { API_URL } from '../../config/api';
import { SkeletonBase, AthletesEmptyState } from '../../components/skeletons';

interface Athlete {
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
}

const AthletesDirectory = () => {
  const [athletes, setAthletes] = useState<Athlete[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const positions = ['all', 'Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'];
  const ageRanges = ['all', '12-14', '15-16', '17-18'];

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/athletes`);
      const data = await response.json();
      
      if (data.success) {
        setAthletes(data.data);
      } else {
        setError('Failed to fetch athletes');
      }
    } catch (err) {
      console.error('Error fetching athletes:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
    const matchesPosition = selectedPosition === 'all' || athlete.position === selectedPosition;
    const matchesAge = selectedAge === 'all' || 
      (selectedAge === '12-14' && athlete.age >= 12 && athlete.age <= 14) ||
      (selectedAge === '15-16' && athlete.age >= 15 && athlete.age <= 16) ||
      (selectedAge === '17-18' && athlete.age >= 17 && athlete.age <= 18);
    
    return matchesSearch && matchesPosition && matchesAge;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedPosition('all');
    setSelectedAge('all');
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <AnnouncementBanner />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
          <SkeletonBase type="title" width="300px" height="40px" style={{ marginBottom: '24px' }} />
          <SkeletonBase type="text" width="500px" height="18px" style={{ marginBottom: '48px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} style={{ border: '1px solid #eee', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SkeletonBase type="avatar" width="120px" height="120px" style={{ marginBottom: '16px' }} />
                <SkeletonBase type="title" width="160px" height="22px" style={{ marginBottom: '8px' }} />
                <SkeletonBase type="text" width="100px" height="14px" style={{ marginBottom: '12px' }} />
                <SkeletonBase type="text" width="100%" height="14px" />
                <SkeletonBase type="text" width="80%" height="14px" style={{ marginBottom: '20px' }} />
                <SkeletonBase type="button" width="100%" height="36px" />
              </div>
            ))}
          </div>
        </div>
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
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Athletes Directory</h1>
        <p style={{ fontSize: '18px', maxWidth: '700px', margin: '0 auto' }}>
          Discover talented young athletes ready for the next level. Scouts and coaches welcome to reach out.
        </p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {error && (
            <div style={{ backgroundColor: '#ffebee', color: '#d32f2f', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', marginBottom: '40px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 2, position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
                <input
                  type="text"
                  placeholder="Search athletes by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 40px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                >
                  {positions.map(pos => (
                    <option key={pos} value={pos}>{pos === 'all' ? 'All Positions' : pos}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <select
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
                >
                  {ageRanges.map(age => (
                    <option key={age} value={age}>{age === 'all' ? 'All Ages' : `Ages ${age}`}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {filteredAthletes.length === 0 ? (
            <AthletesEmptyState onReset={resetFilters} />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
              {filteredAthletes.map(athlete => (
                <div key={athlete.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {athlete.image_url ? (
                      <img src={athlete.image_url} alt={athlete.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontSize: '48px' }}>🏀</span>
                    )}
                  </div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>{athlete.name}</h2>
                      {athlete.scholarship_offers > 0 && (
                        <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '4px 8px', borderRadius: '20px', fontSize: '12px' }}>
                          {athlete.scholarship_offers} Offer{athlete.scholarship_offers > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px', fontSize: '14px', color: '#666' }}>
                      <span>🏀 {athlete.position || 'Not specified'}</span>
                      <span>🎂 Age {athlete.age || 'N/A'}</span>
                      <span><Ruler size={14} style={{ display: 'inline' }} /> {athlete.height || 'N/A'}</span>
                      <span><Weight size={14} style={{ display: 'inline' }} /> {athlete.weight || 'N/A'}</span>
                    </div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#666' }}>
                        <GraduationCap size={14} /> {athlete.school || 'School not specified'}
                      </span>
                    </div>
                    
                    <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '12px', color: '#888' }}>College Interest</p>
                        <p style={{ fontSize: '14px', fontWeight: '500' }}>{athlete.college_interest || 'Undecided'}</p>
                      </div>
                      <Link to={`/athletes/${athlete.id}`} style={{
                        backgroundColor: 'var(--red)',
                        color: 'white',
                        padding: '8px 20px',
                        borderRadius: '30px',
                        textDecoration: 'none',
                        fontSize: '12px',
                        fontWeight: 'bold'
                      }}>
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{
            marginTop: '60px',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '28px', marginBottom: '16px', color: '#333' }}>Are You a Scout or College Recruiter?</h2>
            <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
              Get in touch with us to schedule a private showcase or request detailed player statistics.
            </p>
            <Link to="/contact" style={{
              backgroundColor: 'var(--red)',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              display: 'inline-block'
            }}>
              Contact Us for More Information
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AthletesDirectory;