import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import NavigationDots from '../components/NavigationDots';
import SEO from '../components/SEO';

const About = () => {
  const [counts, setCounts] = useState({
    athletes: 0,
    trainingDays: 0,
    ageGroups: 0,
    scholarships: 0
  });
  
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      startAnimations();
    }
  }, [isInView, hasAnimated]);

  const startAnimations = () => {
    let currentAthletes = 0;
    const athleteInterval = setInterval(() => {
      if (currentAthletes < 10) {
        currentAthletes++;
        setCounts(prev => ({ ...prev, athletes: currentAthletes }));
      } else if (currentAthletes < 50) {
        currentAthletes += 2;
        if (currentAthletes > 50) currentAthletes = 50;
        setCounts(prev => ({ ...prev, athletes: currentAthletes }));
      } else {
        clearInterval(athleteInterval);
      }
    }, 50);
    
    let currentDays = 0;
    const daysInterval = setInterval(() => {
      if (currentDays < 4) {
        currentDays++;
        setCounts(prev => ({ ...prev, trainingDays: currentDays }));
      } else {
        clearInterval(daysInterval);
      }
    }, 80);
    
    let currentAge = 0;
    const ageInterval = setInterval(() => {
      if (currentAge < 1) {
        currentAge++;
        setCounts(prev => ({ ...prev, ageGroups: currentAge }));
      } else {
        clearInterval(ageInterval);
      }
    }, 50);
    
    let currentScholarships = 0;
    const scholarshipsInterval = setInterval(() => {
      if (currentScholarships < 2) {
        currentScholarships++;
        setCounts(prev => ({ ...prev, scholarships: currentScholarships }));
      } else {
        clearInterval(scholarshipsInterval);
      }
    }, 200);
  };

  // Define sections for navigation dots
  const sections = ['about-hero', 'about-what', 'about-numbers', 'about-values', 'about-philosophy', 'about-founded', 'about-cta'];

  return (
    <div>
      <SEO title="About Us - Our Story & Vision" />
      <Navbar />
      <AnnouncementBanner />
      
      {/* Hero Section with Video */}
      <section id="about-hero" style={{
        position: 'relative',
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center',
        overflow: 'hidden',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        >
          <source src="/videos/children1.mp4" type="video/mp4" />
        </video>
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 'clamp(36px, 6vw, 56px)',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            ABOUT FLIGHT 13
          </h1>
          <p style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            maxWidth: '800px',
            margin: '0 auto',
            color: 'white',
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            Elite Basketball Program • Ages 5-18 • "It's a process."
          </p>
        </div>
      </section>

      <main style={{ backgroundColor: 'white' }}>
        
        {/* What is Flight 13 Section */}
        <section id="about-what" style={{ padding: '80px 0', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', color: 'var(--red)', marginBottom: '24px' }}>
            What is Flight 13?
          </h2>
          <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#444', marginBottom: '24px' }}>
            Flight 13 is an elite basketball program focused on skill development and basketball knowledge 
            for young athletes between the ages of 5-18. Our mission is to develop not just better players, 
            but better people — through discipline, hard work, and a love for the game.
          </p>
          <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#444', marginBottom: '24px' }}>
            Our training days are <strong>Monday, Wednesday, Friday, and Saturday</strong> — because consistency is key. 
            We believe that greatness doesn't happen overnight. <strong>"It's a process."</strong>
          </p>
          
          <div style={{
            backgroundColor: '#f5f5f5',
            padding: '30px',
            borderRadius: '16px',
            marginTop: '30px',
            borderLeft: `4px solid var(--red)`
          }}>
            <h3 style={{ fontSize: '24px', color: 'var(--red)', marginBottom: '12px' }}>Our Purpose</h3>
            <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#444' }}>
              To empower young athletes to reach their full potential on and off the court, 
              preparing them for success in basketball, academics, and life.
            </p>
          </div>
        </section>

        {/* By The Numbers Section */}
        <div ref={sectionRef}>
          <section id="about-numbers" style={{ backgroundColor: '#f9f9f9', padding: '80px 0' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
              <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', color: 'var(--red)', marginBottom: '48px', textAlign: 'center' }}>
                By The Numbers
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '40px',
                textAlign: 'center'
              }}>
                <div>
                  <h3 style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--red)', marginBottom: '8px' }}>
                    {counts.athletes === 50 ? '50+' : counts.athletes}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#666' }}>Active Athletes</p>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--red)', marginBottom: '8px' }}>
                    {counts.trainingDays}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#666' }}>Training Days/Week</p>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--red)', marginBottom: '8px' }}>
                    {counts.ageGroups === 1 ? '5-18' : '0'}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#666' }}>Age Groups</p>
                </div>
                
                <div>
                  <h3 style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--red)', marginBottom: '8px' }}>
                    {counts.scholarships === 2 ? '2+' : counts.scholarships}
                  </h3>
                  <p style={{ fontSize: '16px', color: '#666' }}>Scholarship Athletes</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Core Values Section */}
        <section id="about-values" style={{ padding: '80px 0', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', color: 'var(--red)', marginBottom: '16px', textAlign: 'center' }}>
            Our Core Values
          </h2>
          <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px auto' }}>
            The guiding principles that define who we are and how we train.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px'
          }}>
            {[
              { title: 'DISCIPLINE', description: 'Consistent effort every single day' },
              { title: 'HARD WORK', description: 'Nothing worth having comes easy' },
              { title: 'RESPECT', description: 'For the game, coaches, and teammates' },
              { title: 'GROWTH', description: 'Always improving, never satisfied' },
              { title: 'TEAMWORK', description: 'Together we achieve more' }
            ].map((value, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '24px',
                backgroundColor: '#f5f5f5',
                borderRadius: '12px',
                transition: 'transform 0.3s'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--red)', marginBottom: '12px' }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#666' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Training Program Section */}
        <section id="about-philosophy" style={{ backgroundColor: '#f9f9f9', padding: '80px 0' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', color: 'var(--red)', marginBottom: '24px' }}>
                  Our Training Philosophy
                </h2>
                <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#444', marginBottom: '20px' }}>
                  We combine fundamental skill development with game intelligence. Every session is designed 
                  to push athletes to their limits while teaching them the mental aspects of the game.
                </p>
                <p style={{ fontSize: '18px', lineHeight: '1.7', color: '#444', marginBottom: '20px' }}>
                  Our coaches focus on individual weaknesses while building team chemistry. From private workouts 
                  to competitive scrimmages, every moment on the court has a purpose.
                </p>
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
                  View Our Programs →
                </Link>
              </div>
              <div>
                <img 
                  src="/images/p6.jpeg" 
                  alt="Flight 13 Training"
                  style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* When We Started Section */}
        <section id="about-founded" style={{ padding: '80px 0', maxWidth: '1200px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', color: 'var(--red)', marginBottom: '16px', textAlign: 'center' }}>
            Our Journey
          </h2>
          <p style={{ fontSize: '18px', color: '#666', textAlign: 'center', marginBottom: '48px', maxWidth: '700px', margin: '0 auto 48px auto' }}>
            From vision to reality — the story of Flight 13.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '40px',
            justifyContent: 'center'
          }}>
            {/* Founded 2020 */}
            <div style={{
              backgroundColor: '#f9f9f9',
              borderRadius: '16px',
              padding: '40px 30px',
              textAlign: 'center',
              transition: 'transform 0.3s',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              borderTop: `4px solid var(--red)`
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/images/ball.webp" 
                  alt="Basketball"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }}
                />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Founded in 2020</h3>
              <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
                Flight 13 was born from a vision to create a premier basketball program 
                that develops young athletes into skilled, disciplined players. What started 
                as a dream became a reality in 2020.
              </p>
            </div>

            {/* Officially Registered 2023 */}
            <div style={{
              backgroundColor: '#f9f9f9',
              borderRadius: '16px',
              padding: '40px 30px',
              textAlign: 'center',
              transition: 'transform 0.3s',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
              borderTop: `4px solid var(--red)`
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/images/registered.jpg" 
                  alt="Official Registration"
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }}
                />
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Officially Registered in 2023</h3>
              <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6' }}>
                After years of dedication and growth, Flight 13 became an officially 
                registered academy in 2023, solidifying our commitment to excellence 
                and our promise to develop the next generation of basketball talent.
              </p>
            </div>
          </div>

          {/* Timeline note */}
          <div style={{
            marginTop: '40px',
            padding: '24px',
            backgroundColor: '#f5f5f5',
            borderRadius: '12px',
            textAlign: 'center',
            borderLeft: `4px solid var(--red)`
          }}>
            <p style={{ fontSize: '16px', color: '#444' }}>
              <strong>From 2020 to 2023:</strong> Three years of building, growing, and developing 
              young athletes. Today, Flight 13 continues to soar to new heights.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section id="about-cta" style={{ padding: '80px 0', textAlign: 'center', backgroundColor: 'var(--red)', color: 'white' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', marginBottom: '16px' }}>
            Ready to Join Flight 13?
          </h2>
          <p style={{ fontSize: '18px', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px auto', opacity: 0.9 }}>
            Take the first step toward becoming an elite athlete.
          </p>
          <Link to="/registration" style={{
            backgroundColor: 'white',
            color: 'var(--red)',
            padding: '14px 40px',
            borderRadius: '30px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '16px',
            display: 'inline-block',
            transition: 'all 0.3s'
          }}>
            Register Now →
          </Link>
        </section>
      </main>
      
      <Footer />
      <NavigationDots sections={sections} />
    </div>
  );
};

export default About;