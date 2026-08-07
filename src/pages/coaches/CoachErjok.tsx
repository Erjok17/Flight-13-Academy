import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CoachErjok = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '80px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
            ← Back to Home
          </Link>
          
          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <h1 style={{ fontSize: '36px', color: 'var(--red)', marginBottom: '8px' }}>
              Coach Erjok Agot
            </h1>
            <p style={{ fontSize: '20px', color: '#666', marginBottom: '24px', fontWeight: '500' }}>
              Defense & Strength Conditioning
            </p>
            
            <div style={{ borderLeft: '4px solid var(--red)', paddingLeft: '20px', marginBottom: '30px' }}>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#333', fontStyle: 'italic' }}>
                "Defense wins championships. Strength builds endurance. Together, they create complete athletes."
              </p>
            </div>
            
            <h3 style={{ fontSize: '22px', color: '#222', marginBottom: '16px' }}>About Coach Erjok</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '24px' }}>
              Coach Erjok Agot brings intensity and expertise to Flight 13's defensive training and physical 
              development programs. As a dedicated coach, he understands the importance of building strong, 
              resilient athletes who can perform at their peak.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '24px' }}>
              His training sessions focus on lateral quickness, defensive positioning, and mental toughness. 
              Coach Erjok's holistic approach ensures players develop the strength and agility needed to compete 
              at the highest level while staying disciplined and focused.
            </p>
            
            <h3 style={{ fontSize: '22px', color: '#222', marginBottom: '16px' }}>Specialties</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '30px' }}>
              <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Defensive Fundamentals</span>
              <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Agility Training</span>
              <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Strength Conditioning</span>
              <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Mental Toughness</span>
            </div>
            
            <Link to="/" style={{ backgroundColor: 'var(--red)', color: 'white', padding: '12px 30px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>
              Back to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoachErjok;