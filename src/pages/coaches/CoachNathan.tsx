import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CoachMark = () => {
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
              Coach Bamutende Mark
            </h1>
            <p style={{ fontSize: '20px', color: '#666', marginBottom: '24px', fontWeight: '500' }}>
              Shooting & Offensive Coordinator
            </p>
            
            <div style={{ borderLeft: '4px solid var(--red)', paddingLeft: '20px', marginBottom: '30px' }}>
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#333', fontStyle: 'italic' }}>
                "Perfecting the shot is an art. Mastering the offense is a science."
              </p>
            </div>
            
            <h3 style={{ fontSize: '22px', color: '#222', marginBottom: '16px' }}>About Coach Mark</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '24px' }}>
              Coach Bamutende Mark brings expertise in shooting mechanics and offensive systems to Flight 13. 
              He works closely with players to develop consistent scoring abilities and basketball IQ.
            </p>
            
            <h3 style={{ fontSize: '22px', color: '#222', marginBottom: '16px' }}>Specialties</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '30px' }}>
              <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Shooting Mechanics</span>
              <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Footwork Drills</span>
              <span style={{ backgroundColor: 'rgba(211,47,47,0.1)', color: 'var(--red)', padding: '6px 14px', borderRadius: '20px' }}>Offensive Systems</span>
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

export default CoachMark;