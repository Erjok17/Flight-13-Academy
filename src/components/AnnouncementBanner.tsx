import { useState, useEffect } from 'react';
import { X, Megaphone, Calendar, ShoppingBag, Clock } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  message: string;
  icon: 'camp' | 'store' | 'urgent';
  link?: string;
  linkText?: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: '🏀 HOLIDAY CAMP REGISTRATION OPEN!',
    message: 'Summer basketball camp starts June 15th. Early bird discount ends May 30th.',
    icon: 'camp',
    link: '/registration',
    linkText: 'Register Now →'
  },
  {
    id: 2,
    title: '🛍️ NEW MERCHANDISE ARRIVED!',
    message: 'Flight 13 jerseys, hoodies, and accessories now available in our online store.',
    icon: 'store',
    link: '/shop',
    linkText: 'Shop Now →'
  },
  {
    id: 3,
    title: '⏰ PRACTICE SCHEDULE UPDATE',
    message: 'Monday, Wednesday, Friday & Saturday — Check our programs page for full schedule details.',
    icon: 'urgent',
    link: '/programs',
    linkText: 'View Schedule →'
  }
];

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Rotate announcements every 8 seconds
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isHovering]);

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'camp':
        return <Calendar size={20} />;
      case 'store':
        return <ShoppingBag size={20} />;
      case 'urgent':
        return <Clock size={20} />;
      default:
        return <Megaphone size={20} />;
    }
  };

  if (!isVisible) return null;

  const announcement = announcements[currentAnnouncement];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      backgroundColor: 'var(--red)',
      overflow: 'hidden',
      zIndex: 100,
      marginTop: '16px',
      marginBottom: '16px',
      borderRadius: '0px'
    }}>
      {/* Animated background stripes */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 20px, transparent 20px, transparent 40px)',
        pointerEvents: 'none'
      }} />
      
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Left: Icon */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexShrink: 0
        }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {getIcon(announcement.icon)}
          </div>
        </div>

        {/* Center: Announcement Content */}
        <div 
          style={{
            flex: 1,
            textAlign: 'center',
            cursor: 'pointer'
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => announcement.link && window.location.assign(announcement.link)}
        >
          <h4 style={{
            color: 'white',
            fontSize: 'clamp(14px, 2vw, 16px)',
            fontWeight: 'bold',
            marginBottom: '4px'
          }}>
            {announcement.title}
          </h4>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: 'clamp(12px, 1.8vw, 14px)',
            marginBottom: '4px'
          }}>
            {announcement.message}
          </p>
          {announcement.linkText && (
            <span style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
              textDecoration: 'underline',
              display: 'inline-block',
              marginTop: '4px'
            }}>
              {announcement.linkText}
            </span>
          )}
        </div>

        {/* Right: Close Button + Navigation Dots */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          flexShrink: 0
        }}>
          {/* Navigation Dots for multiple announcements */}
          <div style={{
            display: 'flex',
            gap: '6px'
          }}>
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAnnouncement(index)}
                style={{
                  width: currentAnnouncement === index ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  backgroundColor: currentAnnouncement === index ? 'white' : 'rgba(255,255,255,0.5)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
          
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            style={{
              backgroundColor: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
          >
            <X size={16} color="white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBanner;