import { useState } from 'react';

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

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : scheduleData.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % scheduleData.length);
  };

  const currentDay = scheduleData[currentIndex];

  return (
    <section style={{ position: 'relative', padding: '80px 0', backgroundColor: 'white' }}>
      {/* Red Left Trapezoid */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '200px',
          height: '100%',
          backgroundColor: 'var(--red)',
          clipPath: 'polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%)',
          zIndex: 1,
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.width = '220px'}
        onMouseLeave={(e) => e.currentTarget.style.width = '200px'}
        onClick={handlePrev}
      >
        <div style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          fontSize: '24px',
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
          width: '200px',
          height: '100%',
          backgroundColor: 'var(--red)',
          clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)',
          zIndex: 1,
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.width = '220px'}
        onMouseLeave={(e) => e.currentTarget.style.width = '200px'}
        onClick={handleNext}
      >
        <div style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold'
        }}>
          →
        </div>
      </div>

      {/* White Center Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 2, 
        textAlign: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <h2 style={{ fontSize: '36px', color: 'var(--red)', marginBottom: '16px' }}>
          WEEKLY TRAINING SCHEDULE
        </h2>
        <p style={{ fontSize: '18px', color: 'var(--gray-dark)', marginBottom: '40px' }}>
          Monday, Wednesday, Friday & Saturday — Getting Better. "It's a process."
        </p>

        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto',
          backgroundColor: '#f9f9f9',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          {/* Day Header */}
          <div style={{
            backgroundColor: 'var(--red)',
            padding: '20px',
            color: 'white'
          }}>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>
              {currentDay.day}
            </h3>
            <p style={{ fontSize: '18px', opacity: 0.9 }}>
              {currentDay.time}
            </p>
          </div>

          {/* Schedule Details */}
          <div style={{ padding: '30px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ 
                fontSize: '18px', 
                color: 'var(--red)', 
                fontWeight: 'bold',
                marginBottom: '12px'
              }}>
                ACTIVITIES:
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
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
              <p style={{ fontSize: '16px', color: '#333' }}>
                {currentDay.ageGroups}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
          {scheduleData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: '40px',
                height: '8px',
                backgroundColor: currentIndex === idx ? 'var(--red)' : '#e0e0e0',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                if (currentIndex !== idx) e.currentTarget.style.backgroundColor = 'var(--red)';
              }}
              onMouseLeave={(e) => {
                if (currentIndex !== idx) e.currentTarget.style.backgroundColor = '#e0e0e0';
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WeeklySchedule;