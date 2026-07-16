import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

const scheduleData = [
  {
    id: 1,
    day: 'MONDAY',
    time: '8:30 AM - 12:00 PM',
    activities: ['Skill Development', 'Ball Handling', 'Footwork Drills'],
    ageGroups: 'Ages 10-14',
    image: '/images/monday-training.jpg'
  },
  {
    id: 2,
    day: 'WEDNESDAY',
    time: '8:30 AM - 12:00 PM',
    activities: ['Shooting Technique', 'Game IQ', 'Scrimmage'],
    ageGroups: 'Ages 10-14',
    image: '/images/wednesday-training.jpg'
  },
  {
    id: 3,
    day: 'FRIDAY',
    time: '8:30 AM - 12:00 PM',
    activities: ['Defensive Drills', 'Team Strategy', 'Conditioning'],
    ageGroups: 'Ages 10-14',
    image: '/images/friday-training.jpg'
  },
  {
    id: 4,
    day: 'SATURDAY',
    time: '9:00 AM - 12:00 PM',
    activities: ['Full Scrimmage', 'Position Training', 'Game Simulation'],
    ageGroups: 'Ages 5-18 (All groups)',
    image: '/images/saturday-training.jpg'
  }
];

const WeeklySchedule = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : scheduleData.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % scheduleData.length);
  };

  const currentDay = scheduleData[currentIndex];

  return (
    <section style={{ 
      position: 'relative', 
      padding: '60px 0', 
      backgroundColor: 'white' 
    }}>
      {/* Red Left Trapezoid */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: isMobile ? '120px' : '180px',
          height: '100%',
          backgroundColor: 'var(--red)',
          clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%)',
          zIndex: 1,
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          if (!isMobile) e.currentTarget.style.width = '220px';
        }}
        onMouseLeave={(e) => {
          if (!isMobile) e.currentTarget.style.width = '180px';
        }}
        onClick={handlePrev}
      >
        <div style={{
          position: 'absolute',
          left: isMobile ? '10px' : '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          fontSize: isMobile ? '18px' : '24px',
          fontWeight: 'bold'
        }}>
          ←
        </div>
      </div>

      {/* Red Right Trapezoid */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: isMobile ? '120px' : '180px',
          height: '100%',
          backgroundColor: 'var(--red)',
          clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
          zIndex: 1,
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => {
          if (!isMobile) e.currentTarget.style.width = '220px';
        }}
        onMouseLeave={(e) => {
          if (!isMobile) e.currentTarget.style.width = '180px';
        }}
        onClick={handleNext}
      >
        <div style={{
          position: 'absolute',
          right: isMobile ? '10px' : '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          fontSize: isMobile ? '18px' : '24px',
          fontWeight: 'bold'
        }}>
          →
        </div>
      </div>

      {/* Center Content - Responsive text colors */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Title - Red on desktop, White with shadow on mobile */}
        <h2 style={{ 
          fontSize: 'clamp(24px, 5vw, 36px)', 
          color: isMobile ? 'white' : 'var(--red)',
          textShadow: isMobile ? '2px 2px 4px rgba(0,0,0,0.5)' : 'none',
          marginBottom: '16px' 
        }}>
          WEEKLY TRAINING SCHEDULE
        </h2>
        
        {/* Subtitle - Dark gray on desktop, White with shadow on mobile */}
        <p style={{ 
          fontSize: 'clamp(14px, 3vw, 18px)', 
          color: isMobile ? 'white' : 'var(--gray-dark)',
          textShadow: isMobile ? '1px 1px 2px rgba(0,0,0,0.5)' : 'none',
          marginBottom: '40px',
          padding: '0 10px'
        }}>
          Monday, Wednesday, Friday & Saturday — Getting Better. "It's a process."
        </p>

        {/* White Card Content */}
        <ScrollReveal>
          <div style={{ 
            maxWidth: '800px', 
            margin: '0 auto',
            backgroundColor: 'white',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
          {/* Day Header - Red */}
          <div style={{
            backgroundColor: 'var(--red)',
            padding: '20px',
            color: 'white'
          }}>
            <h3 style={{ 
              fontSize: 'clamp(24px, 5vw, 28px)', 
              fontWeight: 'bold', 
              marginBottom: '8px' 
            }}>
              {currentDay.day}
            </h3>
            <p style={{ 
              fontSize: 'clamp(14px, 3vw, 18px)', 
              opacity: 0.9 
            }}>
              {currentDay.time}
            </p>
          </div>

          {/* Schedule Details - White background with dark text */}
          <div style={{ padding: 'clamp(20px, 5vw, 30px)' }}>
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ 
                fontSize: '18px', 
                color: 'var(--red)', 
                fontWeight: 'bold',
                marginBottom: '12px'
              }}>
                ACTIVITIES:
              </h4>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '12px',
                justifyContent: 'center'
              }}>
                {currentDay.activities.map((activity, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: 'rgba(211, 47, 47, 0.1)',
                      color: 'var(--red)',
                      padding: '6px 16px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ 
              paddingTop: '20px',
              borderTop: '1px solid #e0e0e0'
            }}>
              <h4 style={{ 
                fontSize: '16px', 
                color: 'var(--gray-dark)', 
                fontWeight: 'bold',
                marginBottom: '8px'
              }}>
                AGE GROUPS:
              </h4>
              <p style={{ 
                fontSize: '16px', 
                color: '#333' 
              }}>
                {currentDay.ageGroups}
              </p>
            </div>
          </div>
          </div>
        </ScrollReveal>

        {/* Navigation Dots */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          marginTop: '32px' 
        }}>
          {scheduleData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: currentIndex === idx ? '40px' : '10px',
                height: '8px',
                borderRadius: '4px',
                backgroundColor: currentIndex === idx ? (isMobile ? 'white' : 'var(--red)') : (isMobile ? 'rgba(255,255,255,0.5)' : '#e0e0e0'),
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklySchedule;