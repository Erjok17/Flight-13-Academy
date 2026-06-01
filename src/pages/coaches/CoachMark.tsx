import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CoachMark = () => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '80px 0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
            ← Back to Home
          </Link>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '60px', 
            backgroundColor: 'white', 
            borderRadius: '20px', 
            overflow: 'hidden', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)' 
          }}>
            {/* Image Gallery Section */}
            <div style={{ padding: '40px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <img 
                  src="/images/mark1.jpeg" 
                  alt="Coach Mark during league play"
                  style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }}
                />
                <img 
                  src="/images/mark2.jpeg" 
                  alt="Coach Mark competing at high level"
                  style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }}
                />
              </div>
              <p style={{ fontSize: '12px', color: '#888', marginTop: '12px', textAlign: 'center' }}>
                Coach Mark competing in league action — experience that translates to smarter training
              </p>
            </div>
            
            {/* Info Section */}
            <div style={{ padding: '40px 40px 40px 0' }}>
              <h1 style={{ fontSize: '36px', color: 'var(--red)', marginBottom: '8px' }}>
                Coach Bamutende Mark
              </h1>
              <p style={{ fontSize: '20px', color: '#666', marginBottom: '24px', fontWeight: '500' }}>
                Shooting & Offensive Coordinator
              </p>
              
              <div style={{ borderLeft: '4px solid var(--red)', paddingLeft: '20px', marginBottom: '30px' }}>
                <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#333', fontStyle: 'italic' }}>
                  "The game doesn't slow down. You learn to read it faster. I teach what I learned on the court."
                </p>
              </div>
              
              <h3 style={{ fontSize: '22px', color: '#222', marginBottom: '16px' }}>From Player to Coach</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '20px' }}>
                Coach Bamutende Mark knows what it takes to compete. His playing career in competitive leagues gave him 
                firsthand experience in high-pressure games, fast breaks, and the split-second decisions that separate good 
                players from great ones.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '24px' }}>
                That playing background shapes everything he does as a coach. He doesn't just teach shooting mechanics — 
                he teaches shot selection, reading defenses, and creating space. Players learn not just how to score, but 
                when and where to score.
              </p>
              
              <h3 style={{ fontSize: '22px', color: '#222', marginBottom: '16px' }}>Coaching Focus</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '24px' }}>
                Coach Mark's sessions combine technical shooting drills with real-game scenarios. He prepares athletes for 
                the pace and physicality of competitive basketball, drawing directly from his own league experience.
              </p>
              
              <h3 style={{ fontSize: '22px', color: '#222', marginBottom: '16px' }}>Specialties</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '30px' }}>
                <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Shooting Mechanics</span>
                <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Offensive Flow</span>
                <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Shot Selection</span>
                <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Game-Paced Training</span>
              </div>
              
              <Link to="/programs" style={{ 
                backgroundColor: 'var(--red)', 
                color: 'white', 
                padding: '12px 30px', 
                borderRadius: '30px', 
                textDecoration: 'none', 
                fontWeight: 'bold', 
                display: 'inline-block',
                transition: 'all 0.3s'
              }}>
                View Training Programs →
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoachMark;