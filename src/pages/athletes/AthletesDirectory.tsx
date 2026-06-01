import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { Search, Filter, User, Ruler, Weight, GraduationCap, Award, TrendingUp } from 'lucide-react';

// Sample athlete data - This would come from Supabase in production
const athletes = [
  {
    id: 1,
    name: 'James Okello',
    age: 16,
    height: "6'4\"",
    weight: "185 lbs",
    position: 'Point Guard',
    school: 'St. Mary\'s College',
    achievements: ['MVP - Holiday Camp 2024', 'All-Star Selection 2025'],
    strengths: ['Court Vision', 'Ball Handling', 'Leadership'],
    image: '/images/athlete1.jpg',
    collegeInterest: 'University of Kansas',
    scholarshipOffers: 2
  },
  {
    id: 2,
    name: 'Sarah Namutebi',
    age: 15,
    height: "5'10\"",
    weight: "145 lbs",
    position: 'Shooting Guard',
    school: 'Gayaza High School',
    achievements: ['Top Scorer - League 2024', 'Most Improved 2025'],
    strengths: ['Shooting', 'Defense', 'Speed'],
    image: '/images/athlete2.jpg',
    collegeInterest: 'Stanford University',
    scholarshipOffers: 1
  },
  {
    id: 3,
    name: 'Michael Otim',
    age: 17,
    height: "6'7\"",
    weight: "210 lbs",
    position: 'Small Forward',
    school: 'King\'s College Budo',
    achievements: ['Championship MVP', 'All-Tournament Team'],
    strengths: ['Rebounding', 'Scoring', 'Versatility'],
    image: '/images/athlete3.jpg',
    collegeInterest: 'UCLA',
    scholarshipOffers: 3
  },
];

const AthletesDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  
  const positions = ['all', 'Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'];
  const ageRanges = ['all', '12-14', '15-16', '17-18'];

  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPosition = selectedPosition === 'all' || athlete.position === selectedPosition;
    const matchesAge = selectedAge === 'all' || 
      (selectedAge === '12-14' && athlete.age >= 12 && athlete.age <= 14) ||
      (selectedAge === '15-16' && athlete.age >= 15 && athlete.age <= 16) ||
      (selectedAge === '17-18' && athlete.age >= 17 && athlete.age <= 18);
    
    return matchesSearch && matchesPosition && matchesAge;
  });

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
          
          {/* Search and Filters */}
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

          {/* Athletes Grid */}
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
                <img src={athlete.image} alt={athlete.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>{athlete.name}</h2>
                    {athlete.scholarshipOffers > 0 && (
                      <span style={{ backgroundColor: '#4CAF50', color: 'white', padding: '4px 8px', borderRadius: '20px', fontSize: '12px' }}>
                        {athlete.scholarshipOffers} Offer{athlete.scholarshipOffers > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px', fontSize: '14px', color: '#666' }}>
                    <span>🏀 {athlete.position}</span>
                    <span>🎂 Age {athlete.age}</span>
                    <span><Ruler size={14} style={{ display: 'inline' }} /> {athlete.height}</span>
                    <span><Weight size={14} style={{ display: 'inline' }} /> {athlete.weight}</span>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#666' }}>
                      <GraduationCap size={14} /> {athlete.school}
                    </span>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>🏆 Achievements</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {athlete.achievements.map((ach, idx) => (
                        <span key={idx} style={{ backgroundColor: '#f0f0f0', padding: '4px 10px', borderRadius: '20px', fontSize: '11px' }}>{ach}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px', color: '#333' }}>💪 Strengths</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {athlete.strengths.map((strength, idx) => (
                        <span key={idx} style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '4px 10px', borderRadius: '20px', fontSize: '11px' }}>{strength}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{ borderTop: '1px solid #eee', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '12px', color: '#888' }}>College Interest</p>
                      <p style={{ fontSize: '14px', fontWeight: '500' }}>{athlete.collegeInterest}</p>
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

          {filteredAthletes.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px', backgroundColor: 'white', borderRadius: '16px' }}>
              <p style={{ fontSize: '18px', color: '#888' }}>No athletes found matching your criteria.</p>
            </div>
          )}

          {/* Scout Call to Action */}
          <div style={{
            marginTop: '60px',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #fff 0%, #f9f9f9 100%)'
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