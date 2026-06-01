import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CoachChut = () => {
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
                  src="/images/chut1.jpg" 
                  alt="Coach Chut coaching Flight 13 players"
                  style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }}
                />
                <img 
                  src="/images/chut2.jpeg" 
                  alt="Coach Chut during his playing days"
                  style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }}
                />
              </div>
              <p style={{ fontSize: '12px', color: '#888', marginTop: '12px', textAlign: 'center' }}>
                Coach Chut on the sidelines (top) | During his competitive playing days (bottom)
              </p>
            </div>
            
            {/* Info Section */}
            <div style={{ padding: '40px 40px 40px 0' }}>
              <h1 style={{ fontSize: '36px', color: 'var(--red)', marginBottom: '8px' }}>
                Coach Chut Achol Matet
              </h1>
              <p style={{ fontSize: '20px', color: '#666', marginBottom: '24px', fontWeight: '500' }}>
                Head Coach & Skill Development
              </p>
              
              <div style={{ borderLeft: '4px solid var(--red)', paddingLeft: '20px', marginBottom: '30px' }}>
                <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#333', fontStyle: 'italic' }}>
                  "I've been where they stand. I've played the game at high levels. Now I'm here to help them go further than I ever did."
                </p>
              </div>
              
              <h3 style={{ fontSize: '22px', color: '#222', marginBottom: '16px' }}>Player & Coach</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '20px' }}>
                Coach Chut Achol Matet brings a rare combination of high-level playing experience and proven coaching expertise. 
                Having competed in competitive leagues himself, he understands the game from a player's perspective — the pressure, 
                the decisions, and the moments that define careers.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '24px' }}>
                His transition from player to coach was natural. The same instincts that made him a smart, physical player now 
                guide his coaching philosophy. He doesn't just teach drills — he teaches players how to think, react, and lead 
                on the court. When he says "It's a process," he means it — because he's lived it.
              </p>
              
              <h3 style={{ fontSize: '22px', color: '#222', marginBottom: '16px' }}>Coaching Philosophy</h3>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '24px' }}>
                Coach Chut believes that basketball is as much mental as it is physical. His sessions focus on developing 
                high basketball IQ, defensive discipline, and leadership skills. He pushes players to be students of the game, 
                not just athletes.
              </p>
              
              <h3 style={{ fontSize: '22px', color: '#222', marginBottom: '16px' }}>Specialties</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '30px' }}>
                <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Game Intelligence</span>
                <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Defensive Systems</span>
                <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Leadership Development</span>
                <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Player Mentorship</span>
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

export default CoachChut;