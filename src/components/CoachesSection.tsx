import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { SafeImage } from './skeletons';

const coaches = [
  { 
    id: 1, 
    name: 'Coach Chut Achol Matet', 
    role: 'Head Coach & Skill Development', 
    image: '/images/chut2.jpeg', 
    bio: 'Dedicated to developing elite talent through disciplined training and basketball IQ. Focuses on fundamentals, game strategy, and player mentorship.' 
  },
  { 
    id: 2, 
    name: 'Coach Bamutende Mark', 
    role: 'Shooting & Offensive Coordinator', 
    image: '/images/mark1.jpeg', 
    bio: 'Specializes in shooting mechanics, footwork, and offensive systems. Passionate about helping players become consistent scoring threats.' 
  },
  { 
    id: 3, 
    name: 'Coach Erjok Agot', 
    role: 'Defense & Strength Conditioning', 
    image: '/images/coach-erjok.JPG', 
    bio: 'Focuses on defensive fundamentals, agility, and strength training. Committed to building disciplined, hard-nosed players who compete at the highest level.' 
  }
];

// Stagger Animation Variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: 'easeOut',
      delay: index * 0.15 
    }
  })
};

const CoachesSection = () => {
  return (
    <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <h2 style={{ textAlign: 'center', fontSize: '36px', color: 'var(--red)', marginBottom: '16px' }}>
          MEET OUR TEAM
        </h2>
        <p style={{ textAlign: 'center', fontSize: '18px', color: 'var(--gray-dark)', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px auto' }}>
          Dedicated coaches committed to developing young athletes on and off the court.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          {coaches.map((coach, index) => (
            <motion.div 
              id={`coach-card-${coach.id}`}
              key={coach.id} 
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              whileHover={{ 
                y: -8, 
                scale: 1.01,
                boxShadow: '0 20px 40px rgba(237, 0, 55, 0.12)',
                borderColor: 'var(--red)'
              }}
              style={{ 
                textAlign: 'center', 
                backgroundColor: 'var(--gray-light)', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                cursor: 'pointer',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                transition: 'border-color 0.3s ease'
              }}
            >
              <div style={{ overflow: 'hidden', height: '320px' }}>
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.4 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <SafeImage 
                    src={coach.image} 
                    alt={coach.name} 
                    style={{ 
                      width: '100%', 
                      height: '100%'
                    }}
                  />
                </motion.div>
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '22px', marginBottom: '8px', color: '#222' }}>{coach.name}</h3>
                <p style={{ color: 'var(--red)', fontWeight: '600', marginBottom: '12px', fontSize: '15px' }}>{coach.role}</p>
                <p style={{ color: 'var(--gray-dark)', marginBottom: '20px', lineHeight: '1.5', fontSize: '14px' }}>{coach.bio}</p>
                <Link 
                  to={`/coaches/${coach.id}`} 
                  style={{ 
                    color: 'var(--red)', 
                    fontWeight: 'bold', 
                    textDecoration: 'none',
                    borderBottom: '2px solid var(--red)',
                    paddingBottom: '4px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Learn more about {coach.name.split(' ')[1]} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoachesSection;