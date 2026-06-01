import { useEffect, useState } from 'react';

interface NavigationDotsProps {
  sections?: string[];
}

const NavigationDots = ({ sections: propSections }: NavigationDotsProps) => {
  const defaultSections = ['hero', 'train-purpose', 'scholarship', 'coaches', 'footer'];
  const sections = propSections || defaultSections;
  
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      right: '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => scrollTo(section)}
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: `2px solid var(--red)`,
            backgroundColor: activeSection === section ? 'var(--red)' : 'white',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.3)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      ))}
    </div>
  );
};

export default NavigationDots;