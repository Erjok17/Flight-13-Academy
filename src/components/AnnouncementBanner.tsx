import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { API_URL } from '../config/api'; // adjust path to match this file's location

interface Announcement {
  id: string;
  title: string;
  message: string;
  icon: string;
  link?: string;
  link_text?: string;
  event_date?: string;
  location?: string;
  price?: string;
}

const AnnouncementBanner = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${API_URL}/api/announcements/active`);
        const data = await response.json();
        if (data.success) {
          setAnnouncements(data.data);
        }
      } catch (err) {
        console.error('Error fetching announcements:', err);
      }
    };

    fetchAnnouncements();
  }, []);

  // Rotate announcements every 8 seconds
  useEffect(() => {
    if (isHovering || announcements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [isHovering, announcements.length]);

  if (!isVisible || announcements.length === 0) return null;

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            width: '20px',
            height: '20px'
          }}>
            {announcement.icon || '📢'}
          </div>
        </div>

        <div
          style={{ flex: 1, textAlign: 'center', cursor: announcement.link ? 'pointer' : 'default' }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onClick={() => announcement.link && window.location.assign(announcement.link)}
        >
          <h4 style={{ color: 'white', fontSize: 'clamp(14px, 2vw, 16px)', fontWeight: 'bold', marginBottom: '4px' }}>
            {announcement.title}
          </h4>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'clamp(12px, 1.8vw, 14px)', marginBottom: '4px' }}>
            {announcement.message}
            {announcement.event_date && ` • ${new Date(announcement.event_date).toLocaleDateString()}`}
            {announcement.location && ` • ${announcement.location}`}
            {announcement.price && ` • ${announcement.price}`}
          </p>
          {announcement.link_text && (
            <span style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
              textDecoration: 'underline',
              display: 'inline-block',
              marginTop: '4px'
            }}>
              {announcement.link_text}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          {announcements.length > 1 && (
            <div style={{ display: 'flex', gap: '6px' }}>
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
          )}

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