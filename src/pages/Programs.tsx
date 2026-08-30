import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { Calendar, Users, Trophy, Star, Award, UserCheck, Briefcase } from 'lucide-react';
import SEO from '../components/SEO';

const Programs = () => {
  const programs = [
    {
      id: 1,
      title: 'WEEKLY PRACTICES',
      icon: <Calendar size={40} color="var(--red)" />,
      description: 'Consistent training that builds fundamental skills, basketball IQ, and physical conditioning.',
      features: [
        'Monday, Wednesday, Friday & Saturday sessions',
        'Training from 8:00 AM - 12:00 PM',
        'Different age categories handled by specialized coaches',
        'Skill development focused on individual weaknesses',
        'Game simulations and scrimmages',
        'Progress tracking and feedback sessions'
      ],
      schedule: {
        'Training Hours': '8:00 AM - 12:00 PM',
        'Days': 'Monday, Wednesday, Friday & Saturday'
      },
      color: '#f5f5f5'
    },
    {
      id: 2,
      title: 'HOLIDAY CAMPS',
      icon: <Users size={40} color="var(--red)" />,
      description: 'Intensive week-long camps during school holidays featuring special guest coaches and elite training.',
      features: [
        '1-week and 2-week intensive programs',
        'Guest coaches including NBA Africa scouts',
        'Former NBA player connections (Kaman Maluach)',
        'Expert coaching from Wal Deng and elite trainers',
        'Competition preparation and tournament play'
      ],
      guestCoaches: [
        { name: 'Wal Deng', role: 'Elite Basketball Coach & Mentor', image: '/images/wal1.jpeg' },
        { name: 'NBA Africa Scout', role: 'Talent Evaluation Specialist' },
        { name: 'Kaman Maluach & Mawut Mabil', role: 'Khaman NBA Drafted Player & Inspiration. Mawut Mabil Arizona Wildcat & NBA Draft prospect', image: '/images/wal-khaman.webp' }
      ],
      specialHighlight: 'NBA drafted player Kaman Maluach — trained and mentored by Coach Wal Deng',
      color: '#f9f9f9'
    },
    {
      id: 3,
      title: 'PRIVATE SESSIONS',
      icon: <UserCheck size={40} color="var(--red)" />,
      description: 'One-on-one personalized training to accelerate development and target specific areas of improvement.',
      features: [
        'Individual skill development plans',
        'Position-specific training',
        'Game footage analysis',
        'Flexible scheduling options',
        'Accelerated improvement in weak areas'
      ],
      video: '/videos/tyron.mp4',
      color: '#f5f5f5'
    },
    {
      id: 4,
      title: 'COMPETITIVE GAMES',
      icon: <Trophy size={40} color="var(--red)" />,
      description: 'Real-game experience against other academies and in school competitions.',
      features: [
        'Friendly games with other basketball academies',
        'Tournament participation throughout the year',
        'School competition coaching support',
        'Exposure to different playing styles',
        'Building game confidence and experience'
      ],
      image: '/images/p12.jpeg',
      color: '#f9f9f9'
    }
  ];

  return (
    <div>
      <SEO title="Programs - Basketball Training Classes" />
      <Navbar />
      <AnnouncementBanner />
      
      <section style={{
        backgroundColor: 'var(--red)',
        color: 'white',
        padding: 'clamp(40px, 10vw, 80px) 0',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 'clamp(28px, 6vw, 52px)', fontWeight: 'bold', marginBottom: '16px' }}>
          Our Programs
        </h1>
        <p style={{ fontSize: 'clamp(14px, 2.5vw, 20px)', maxWidth: '700px', margin: '0 auto', opacity: 0.95, padding: '0 16px' }}>
          Year-round training designed to develop skilled, confident, and disciplined athletes
        </p>
      </section>

      <main style={{ backgroundColor: 'white' }}>
        <section style={{ padding: 'clamp(40px, 8vw, 80px) 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(30px, 6vw, 60px)' }}>
              {programs.map((program ) => (
                <div
                  key={program.id}
                  style={{
                    backgroundColor: program.color,
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'clamp(20px, 5vw, 40px)',
                    padding: 'clamp(20px, 5vw, 40px)'
                  }}>
                    {/* Left Side Content */}
                    <div>
                      <div style={{ marginBottom: '20px' }}>{program.icon}</div>
                      <h2 style={{ 
                        fontSize: 'clamp(22px, 5vw, 28px)', 
                        fontWeight: 'bold', 
                        color: 'var(--red)', 
                        marginBottom: '16px' 
                      }}>
                        {program.title}
                      </h2>
                      <p style={{ 
                        fontSize: 'clamp(14px, 2.5vw, 16px)', 
                        lineHeight: '1.6', 
                        color: '#555', 
                        marginBottom: '24px' 
                      }}>
                        {program.description}
                      </p>
                      
                      <h3 style={{ fontSize: 'clamp(16px, 3vw, 18px)', fontWeight: 'bold', color: '#333', marginBottom: '16px' }}>
                        Key Features:
                      </h3>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {program.features.map((feature, idx) => (
                          <li key={idx} style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '10px', 
                            marginBottom: '12px', 
                            fontSize: 'clamp(12px, 2vw, 14px)', 
                            color: '#555' 
                          }}>
                            <span style={{ color: 'var(--red)', fontSize: '18px' }}>✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      <Link to={`/contact?message=${encodeURIComponent(`I'd like to register for ${program.title}`)}`} style={{
                        display: 'inline-block',
                        backgroundColor: 'var(--red)',
                        color: 'white',
                        padding: 'clamp(10px, 2.5vw, 12px) clamp(20px, 5vw, 28px)',
                        borderRadius: '30px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        marginTop: '24px',
                        transition: 'all 0.3s',
                        fontSize: 'clamp(13px, 2.5vw, 16px)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--red)'}>
                        Register Now →
                      </Link>
                    </div>
                    
                    {/* Right Side Content */}
                    <div>
                      {program.schedule ? (
                        <div style={{
                          backgroundColor: 'white',
                          borderRadius: '16px',
                          padding: 'clamp(16px, 4vw, 24px)',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                        }}>
                          <h3 style={{ 
                            fontSize: 'clamp(16px, 3.5vw, 20px)', 
                            fontWeight: 'bold', 
                            color: 'var(--red)', 
                            marginBottom: '20px' 
                          }}>
                            Schedule Details
                          </h3>
                          {Object.entries(program.schedule).map(([key, value]) => (
                            <div key={key} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              padding: '12px 0',
                              borderBottom: '1px solid #eee',
                              flexWrap: 'wrap',
                              gap: '8px'
                            }}>
                              <span style={{ fontWeight: '500', fontSize: 'clamp(13px, 2.5vw, 14px)' }}>{key}</span>
                              <span style={{ color: '#666', fontSize: 'clamp(13px, 2.5vw, 14px)' }}>{value}</span>
                            </div>
                          ))}
                          <div style={{
                            marginTop: '16px',
                            padding: '12px',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '8px',
                            fontSize: 'clamp(12px, 2vw, 13px)',
                            color: '#555'
                          }}>
                            <strong>Note:</strong> Different age categories are handled by specialized coaches
                          </div>
                        </div>
                      ) : program.guestCoaches ? (
                        <div style={{
                          backgroundColor: 'white',
                          borderRadius: '16px',
                          padding: 'clamp(16px, 4vw, 24px)',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                        }}>
                          <h3 style={{ 
                            fontSize: 'clamp(16px, 3.5vw, 20px)', 
                            fontWeight: 'bold', 
                            color: 'var(--red)', 
                            marginBottom: '20px' 
                          }}>
                            Guest Coaches & Scouts
                          </h3>
                          {program.guestCoaches.map((coach, idx) => (
                            <div key={idx} style={{
                              padding: '12px 0',
                              borderBottom: idx < program.guestCoaches.length - 1 ? '1px solid #eee' : 'none',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '16px',
                              flexWrap: 'wrap'
                            }}>
                              {coach.image && (
                                <img 
                                  src={coach.image}
                                  alt={coach.name}
                                  style={{
                                    width: 'clamp(50px, 10vw, 60px)',
                                    height: 'clamp(50px, 10vw, 60px)',
                                    borderRadius: '50%',
                                    objectFit: 'cover'
                                  }}
                                />
                              )}
                              <div>
                                <div style={{ fontWeight: 'bold', color: '#333', fontSize: 'clamp(14px, 2.5vw, 16px)' }}>{coach.name}</div>
                                <div style={{ fontSize: 'clamp(11px, 2vw, 13px)', color: '#666', marginTop: '4px' }}>{coach.role}</div>
                              </div>
                            </div>
                          ))}
                          <div style={{
                            marginTop: '20px',
                            padding: '16px',
                            backgroundColor: 'rgba(211,47,47,0.1)',
                            borderRadius: '12px',
                            fontSize: 'clamp(12px, 2.5vw, 13px)',
                            color: '#555',
                            borderLeft: `4px solid var(--red)`
                          }}>
                            <strong>🏀 Special Highlight:</strong> {program.specialHighlight}
                          </div>
                          <div style={{
                            marginTop: '16px',
                            padding: '12px',
                            backgroundColor: '#f9f9f9',
                            borderRadius: '8px',
                            fontSize: 'clamp(11px, 2vw, 12px)',
                            color: '#666',
                            textAlign: 'center'
                          }}>
                            Coach Wal Deng has worked directly with NBA prospect Kaman Maluach, bringing elite-level 
                            training insights and connections to Flight 13 athletes.
                          </div>
                        </div>
                      ) : program.video ? (
                        <div style={{
                          backgroundColor: 'white',
                          borderRadius: '16px',
                          padding: '8px',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                          overflow: 'hidden'
                        }}>
                          <video
                            src={program.video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                              width: '100%',
                              borderRadius: '12px',
                              display: 'block'
                            }}
                          />
                          <div style={{
                            padding: '16px',
                            textAlign: 'center',
                            fontSize: 'clamp(12px, 2.5vw, 13px)',
                            color: '#666'
                          }}>
                            One-on-one training session in action
                          </div>
                        </div>
                      ) : program.image ? (
                        <div style={{
                          backgroundColor: 'white',
                          borderRadius: '16px',
                          padding: '8px',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                          overflow: 'hidden'
                        }}>
                          <img 
                            src={program.image}
                            alt="Competitive Games"
                            style={{
                              width: '100%',
                              borderRadius: '12px',
                              display: 'block'
                            }}
                          />
                          <div style={{
                            padding: '16px',
                            textAlign: 'center',
                            fontSize: 'clamp(12px, 2.5vw, 13px)',
                            color: '#666'
                          }}>
                            Coach on the touchline during competitive action
                          </div>
                        </div>
                      ) : (
                        <div style={{
                          backgroundColor: 'white',
                          borderRadius: '16px',
                          padding: '24px',
                          textAlign: 'center',
                          boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                        }}>
                          <Briefcase size={48} color="var(--red)" style={{ marginBottom: '16px' }} />
                          <h3 style={{ fontSize: 'clamp(16px, 3vw, 18px)', fontWeight: 'bold', marginBottom: '8px' }}>School Support</h3>
                          <p style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', color: '#666' }}>
                            Our coaches also support school teams participating in competitions
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section style={{ backgroundColor: '#f9f9f9', padding: 'clamp(40px, 8vw, 80px) 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 36px)', color: 'var(--red)', marginBottom: '16px' }}>
              Why Parents Trust Flight 13
            </h2>
            <p style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', color: '#666', maxWidth: '700px', margin: '0 auto 48px auto', padding: '0 16px' }}>
              We're committed to developing not just skilled players, but responsible young men and women
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'clamp(20px, 5vw, 30px)'
            }}>
              {[
                { title: 'Professional Coaching', description: 'Experienced coaches who prioritize player development and safety', icon: <Star size={32} /> },
                { title: 'Character Building', description: 'Teaching discipline, teamwork, and respect on and off the court', icon: <Award size={32} /> },
                { title: 'Scholarship Pathway', description: 'Track record of helping athletes earn basketball scholarships', icon: <Trophy size={32} /> },
                { title: 'Elite Connections', description: 'Access to NBA scouts, guest coaches, and competitive exposure', icon: <Users size={32} /> }
              ].map((item, idx) => (
                <div key={idx} style={{
                  backgroundColor: 'white',
                  padding: 'clamp(20px, 5vw, 30px)',
                  borderRadius: '16px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ color: 'var(--red)', marginBottom: '16px' }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontSize: 'clamp(16px, 3vw, 18px)', fontWeight: 'bold', marginBottom: '12px' }}>{item.title}</h3>
                  <p style={{ fontSize: 'clamp(12px, 2.5vw, 14px)', color: '#666', lineHeight: '1.5' }}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section style={{ padding: 'clamp(40px, 8vw, 80px) 0', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(22px, 5vw, 32px)', marginBottom: '16px', color: '#222' }}>
            Ready to Start Your Journey?
          </h2>
          <p style={{ fontSize: 'clamp(14px, 2.5vw, 16px)', color: '#666', marginBottom: '32px', padding: '0 16px' }}>
            Join Flight 13 today and take the first step toward becoming an elite athlete
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', padding: '0 16px' }}>
            <Link to={`/contact?message=${encodeURIComponent('I want to register and be part of the academy.')}`} style={{
              backgroundColor: 'var(--red)',
              color: 'white',
              padding: 'clamp(10px, 2.5vw, 14px) clamp(20px, 5vw, 32px)',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              transition: 'all 0.3s',
              fontSize: 'clamp(13px, 2.5vw, 16px)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--red)'}>
              Register Now
            </Link>
            <Link to="/contact" style={{
              backgroundColor: 'transparent',
              color: 'var(--red)',
              padding: 'clamp(10px, 2.5vw, 14px) clamp(20px, 5vw, 32px)',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              border: '2px solid var(--red)',
              transition: 'all 0.3s',
              fontSize: 'clamp(13px, 2.5vw, 16px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--red)';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--red)';
            }}>
              Contact Us
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Programs;