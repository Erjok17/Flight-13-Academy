import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  {
    id: 1,
    image: '/images/p9.jpeg',
    title: 'SCRIMMAGES',
    description: 'We have scrimmages to help kids apply skills they worked on and improve game IQ'
  },
  {
    id: 2,
    image: '/images/p1.jpeg',
    title: 'PRIVATE WORKOUTS',
    description: 'Private workouts to work on individual weaknesses'
  },
  {
    id: 3,
    image: '/images/p8.jpeg',
    title: 'GROUP WORKOUTS',
    description: 'Group workouts to help build teamwork, collaboration, and communication on the court'
  }
];

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [borderProgress, setBorderProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const slideDuration = 5000;

  useEffect(() => {
    if (!isAnimating) return;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / slideDuration, 1);
      setBorderProgress(progress);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        moveToNextSlide();
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentSlide, isAnimating]);

  const moveToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetBorderAnimation();
  };

  const resetBorderAnimation = () => {
    setIsAnimating(false);
    setBorderProgress(0);
    startTimeRef.current = 0;
    
    setTimeout(() => {
      setIsAnimating(true);
    }, 100);
  };

  const goToSlide = (index: number) => {
    if (index === currentSlide) return;
    setCurrentSlide(index);
    resetBorderAnimation();
  };

  return (
    <section style={{ 
      position: 'relative', 
      width: '100%', 
      height: '80vh',
      display: 'flex',
      justifyContent: 'center'
    }}>
      <div style={{
        position: 'relative',
        width: '85%',
        maxWidth: '1400px',
        height: '100%',
        borderRadius: '1px',
        overflow: 'hidden'
      }}>
        <AnimatePresence mode="popLayout">
          <motion.img 
            key={currentSlide}
            src={slides[currentSlide].image} 
            alt={slides[currentSlide].title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              display: 'block',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        </AnimatePresence>
        
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0) 70%)',
          zIndex: 1
        }} />

        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          zIndex: 2,
          textAlign: 'left'
        }}>
          <h2 style={{ 
            fontSize: 'clamp(18px, 4vw, 36px)', 
            marginBottom: '8px', 
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            FLIGHT13 BASKETBALL ACADEMY
          </h2>
          <p style={{ 
            fontSize: 'clamp(14px, 3vw, 20px)', 
            marginBottom: '24px', 
            color: 'white',
            fontStyle: 'italic',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            "it's a process."
          </p>
          <h1 style={{ 
            fontSize: 'clamp(28px, 6vw, 52px)', 
            marginBottom: '8px', 
            color: 'white',
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            ELITE SKILLS TRAINING
          </h1>
          <p style={{ 
            fontSize: 'clamp(18px, 4vw, 28px)', 
            marginBottom: '32px', 
            color: 'white',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            FOR AGES 5-18
          </p>
          
          <div 
            id={`hero-slide-card-${currentSlide}`}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(4px)',
              padding: '16px 20px',
              borderRadius: '12px',
              maxWidth: 'min(500px, 90vw)',
              marginBottom: '24px',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.1)',
              minHeight: '110px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            {/* Slide Ticker Border Indicators */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${borderProgress * 100}%`,
              height: '3px',
              backgroundColor: 'var(--red)',
              transition: 'width 0.05s linear'
            }} />
            
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '3px',
              height: borderProgress >= 0.99 ? '100%' : '0%',
              backgroundColor: 'var(--red)',
              transition: 'height 0.1s linear'
            }} />
            
            <div style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: borderProgress >= 0.99 ? '100%' : '0%',
              height: '3px',
              backgroundColor: 'var(--red)',
              transition: 'width 0.1s linear'
            }} />
            
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '3px',
              height: borderProgress >= 0.99 ? '100%' : '0%',
              backgroundColor: 'var(--red)',
              transition: 'height 0.1s linear'
            }} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{ position: 'relative', zIndex: 1 }}
              >
                <h3 
                  id={`hero-slide-title-${currentSlide}`}
                  style={{
                    fontSize: 'clamp(15px, 2.5vw, 20px)',
                    fontWeight: 'bold',
                    color: 'var(--red)',
                    marginBottom: '6px'
                  }}
                >
                  {slides[currentSlide].title}
                </h3>
                <p 
                  id={`hero-slide-desc-${currentSlide}`}
                  style={{
                    fontSize: 'clamp(12px, 1.8vw, 15px)',
                    color: 'white',
                    lineHeight: '1.5',
                    margin: 0
                  }}
                >
                  {slides[currentSlide].description}
                </p>
              </motion.div>
            </AnimatePresence>
            
            <div style={{
              position: 'absolute',
              bottom: '8px',
              right: '12px',
              fontSize: '10px',
              color: 'rgba(255,255,255,0.4)',
              zIndex: 1
            }}>
              {Math.ceil((1 - borderProgress) * (slideDuration / 1000))}s
            </div>
          </div>
          
          <button 
            id="hero-start-journey-btn"
            onClick={() => navigate('/registration')}
            style={{
              backgroundColor: 'var(--red)',
              color: 'white',
              border: 'none',
              padding: 'clamp(10px, 3vw, 14px) clamp(20px, 5vw, 40px)',
              fontSize: 'clamp(14px, 3vw, 18px)',
              fontWeight: 'bold',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--red)'}
          >
            START YOUR JOURNEY
          </button>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 'clamp(8px, 2vw, 12px)',
          zIndex: 3
        }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                width: currentSlide === index ? 'clamp(30px, 6vw, 40px)' : 'clamp(8px, 2vw, 10px)',
                height: 'clamp(8px, 2vw, 10px)',
                borderRadius: '5px',
                backgroundColor: currentSlide === index ? 'var(--red)' : 'rgba(255,255,255,0.7)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;