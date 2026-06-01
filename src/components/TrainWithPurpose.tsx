import { useState, useRef, useEffect } from 'react';

const TrainWithPurpose = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play video when card is hovered
  useEffect(() => {
    if (videoRef.current) {
      if (hoveredCard === 3) {
        videoRef.current.play().catch(error => console.log('Play error:', error));
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [hoveredCard]);

  const cards = [
    {
      id: 1,
      title: 'JOIN THE ACADEMY',
      image: '/images/p10.jpeg',
      description: 'Become part of Flight 13\'s elite basketball program. Open to ages 5-18, all skill levels welcome. Join a community dedicated to growth, discipline, and excellence on and off the court.',
      features: ['Ages 5-18', 'All skill levels', 'Professional coaching']
    },
    {
      id: 2,
      title: 'MILESTONES',
      image: '/images/p11.jpg',
      description: 'Track your progress and celebrate achievements. From mastering fundamentals to earning scholarships, every step forward is a victory in your basketball journey.',
      features: ['Skill benchmarks', 'Scholarship opportunities', 'Player development']
    },
    {
      id: 3,
      title: 'WORKOUTS & GAMES',
      video: '/videos/ben3.mp4',
      description: 'Intense training sessions combined with competitive gameplay. Apply skills in real game situations and develop basketball IQ through regular scrimmages.',
      features: ['Weekly practices', 'Game simulations', 'Competitive play']
    }
  ];

  return (
    <section style={{ 
      position: 'relative',
      padding: '80px 0', 
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'white'
    }}>
      
      <div style={{
        position: 'relative',
        width: '85%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        
        {/* Section Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 'bold',
            color: '#000000',
            marginBottom: '16px',
            letterSpacing: '2px'
          }}>
            ACADEMY ACTIVITIES
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 2vw, 18px)',
            color: '#444',
            maxWidth: '750px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Discover your journey — join the academy, celebrate milestones, and compete in every workout and game.
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'stretch'
        }}>
          {cards.map((card) => (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: hoveredCard === card.id 
                  ? '0 20px 40px rgba(0,0,0,0.1)' 
                  : '0 5px 20px rgba(0,0,0,0.05)',
                transform: hoveredCard === card.id ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                position: 'relative',
                border: '1px solid #f0f0f0'
              }}
            >
              {hoveredCard === card.id && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(0,0,0,0.02)',
                  borderRadius: '16px',
                  pointerEvents: 'none',
                  zIndex: 1
                }} />
              )}
              
              {/* Card Media - Image or Video */}
              <div style={{
                width: '100%',
                height: '200px',
                overflow: 'hidden',
                backgroundColor: '#f5f5f5',
                position: 'relative'
              }}>
                {card.video ? (
                  <>
                    <video
                      ref={videoRef}
                      src={card.video}
                      loop
                      muted
                      playsInline
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease',
                        transform: hoveredCard === card.id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                    {/* Play button overlay */}
                    {hoveredCard !== card.id && (
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '50px',
                        height: '50px',
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none'
                      }}>
                        <div style={{
                          width: 0,
                          height: 0,
                          borderTop: '10px solid transparent',
                          borderLeft: '18px solid white',
                          borderBottom: '10px solid transparent',
                          marginLeft: '5px'
                        }} />
                      </div>
                    )}
                  </>
                ) : (
                  <img 
                    src={card.image}
                    alt={card.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      transform: hoveredCard === card.id ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                )}
              </div>
              
              {/* Card Content */}
              <div style={{
                padding: '24px'
              }}>
                <h3 style={{
                  fontSize: 'clamp(14px, 1.8vw, 16px)',
                  fontWeight: 'bold',
                  color: 'var(--red)',
                  marginBottom: '16px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  {card.title}
                </h3>
                
                <p style={{
                  fontSize: 'clamp(16px, 2.2vw, 18px)',
                  color: '#000000',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  fontWeight: 'normal'
                }}>
                  {card.description}
                </p>
                
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginTop: '16px'
                }}>
                  {card.features.map((feature, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: 'rgba(211, 47, 47, 0.08)',
                        color: 'var(--red)',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '500'
                      }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div style={{
                  marginTop: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--red)',
                  fontWeight: 'bold',
                  fontSize: '13px'
                }}>
                  <span>Learn More</span>
                  <span style={{
                    transform: hoveredCard === card.id ? 'translateX(5px)' : 'translateX(0)',
                    transition: 'transform 0.3s ease'
                  }}>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots - REMOVED */}
      </div>
    </section>
  );
};

export default TrainWithPurpose;