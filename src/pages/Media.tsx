import { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { Play, Image, Grid3x3, List, X } from 'lucide-react';

interface MediaItem {
  id: number;
  type: string;
  src: string;
  title: string;
  category: string;
}

const Media = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const categories = [
    { id: 'all', name: 'All', icon: '🎬' },
    { id: 'training', name: 'Training', icon: '🏀' },
    { id: 'games', name: 'Games', icon: '🏆' },
    { id: 'camps', name: 'Camps', icon: '⛺' },
    { id: 'highlights', name: 'Highlights', icon: '⭐' }
  ];

  const mediaItems: MediaItem[] = [
    // Videos
    { id: 1, type: 'video', src: '/videos/ben1.mp4', title: 'Intensive Training Session', category: 'training' },
    { id: 2, type: 'video', src: '/videos/ben3.mp4', title: 'Skill Development Drills', category: 'training' },
    { id: 3, type: 'video', src: '/videos/gameday3.mp4', title: 'Game Day Highlights', category: 'games' },
    { id: 4, type: 'video', src: '/videos/tyron1.mp4', title: 'Private Session - One on One', category: 'training' },
    { id: 5, type: 'video', src: '/videos/idris.mp4', title: 'Individual Session - Idris, one of our youngest players', category: 'training' },
    { id: 6, type: 'video', src: '/videos/children1.mp4', title: 'Children\'s Training Session with Coach Mark', category: 'camps' },
    
    // Images

    { id: 7, type: 'image', src: '/images/p1.jpeg', title: 'Private Workout Session', category: 'training' },
    { id: 8, type: 'image', src: '/images/p6.jpeg', title: 'Team Practice', category: 'training' },
    { id: 9, type: 'image', src: '/images/p7.jpeg', title: 'Game Action', category: 'games' },
    { id: 10, type: 'image', src: '/images/p8.jpeg', title: 'Group Training', category: 'training' },
    { id: 11, type: 'image', src: '/images/p10.jpeg', title: 'Join the Academy', category: 'training' },
    { id: 12, type: 'image', src: '/images/p11.jpg', title: 'Milestone Celebration', category: 'highlights' },
    { id: 13, type: 'image', src: '/images/p12.jpeg', title: 'Coach on Touchline', category: 'games' },
    { id: 14, type: 'image', src: '/images/wal-deng-coaching.jpg', title: 'Coach Wal Deng Training Session', category: 'camps' },
    { id: 15, type: 'image', src: '/images/wal-deng-khaman.jpg', title: 'Coach Wal Deng with Kaman Maluach', category: 'camps' },
  ];

  const filteredMedia = activeCategory === 'all' 
    ? mediaItems 
    : mediaItems.filter(item => item.category === activeCategory);

  const openModal = (media: MediaItem) => {
    setSelectedMedia(media);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedMedia(null);
    document.body.style.overflow = 'auto';
  };

  const playVideo = (id: number) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play();
    }
  };

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />
      
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center',
        backgroundImage: 'url("/images/p7.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)'
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 52px)', marginBottom: '16px' }}>Flight 13 Media</h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            Relive the best moments — training, games, camps, and celebrations
          </p>
        </div>
      </section>

      <main style={{ backgroundColor: 'white', padding: '60px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Category Filters */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '40px',
            paddingBottom: '20px',
            borderBottom: '1px solid #eee'
          }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    borderRadius: '30px',
                    border: 'none',
                    backgroundColor: activeCategory === cat.id ? 'var(--red)' : '#f0f0f0',
                    color: activeCategory === cat.id ? 'white' : '#333',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    fontWeight: activeCategory === cat.id ? 'bold' : 'normal'
                  }}
                >
                  <span>{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>
            
            {/* View Mode Toggle */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setViewMode('grid')}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: viewMode === 'grid' ? '2px solid var(--red)' : '1px solid #ddd',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <Grid3x3 size={20} color={viewMode === 'grid' ? 'var(--red)' : '#888'} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: viewMode === 'list' ? '2px solid var(--red)' : '1px solid #ddd',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <List size={20} color={viewMode === 'list' ? 'var(--red)' : '#888'} />
              </button>
            </div>
          </div>

          {/* Media Grid */}
          {viewMode === 'grid' ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    boxShadow: '0 5px 15px rgba(0,0,0,0.08)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.08)';
                  }}
                >
                  {item.type === 'video' ? (
                    <div style={{ position: 'relative' }}>
                      <video
                        ref={el => videoRefs.current[item.id] = el}
                        src={item.src}
                        controls
                        style={{
                          width: '100%',
                          height: '220px',
                          objectFit: 'cover',
                          backgroundColor: '#1a1a1a'
                        }}
                      />
                    </div>
                  ) : (
                    <img 
                      src={item.src} 
                      alt={item.title}
                      style={{ width: '100%', height: '220px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => openModal(item)}
                    />
                  )}
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>{item.title}</h3>
                    <p style={{ fontSize: '12px', color: '#888', textTransform: 'capitalize' }}>{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredMedia.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                >
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      controls
                      style={{
                        width: '160px',
                        height: '90px',
                        objectFit: 'cover',
                        backgroundColor: '#1a1a1a',
                        flexShrink: 0
                      }}
                    />
                  ) : (
                    <img 
                      src={item.src} 
                      alt={item.title}
                      style={{ width: '160px', height: '90px', objectFit: 'cover', cursor: 'pointer', flexShrink: 0 }}
                      onClick={() => openModal(item)}
                    />
                  )}
                  <div style={{ flex: 1, padding: '12px 12px 12px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>{item.title}</h3>
                    <p style={{ fontSize: '12px', color: '#888', textTransform: 'capitalize' }}>{item.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredMedia.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <p style={{ fontSize: '18px', color: '#888' }}>No media found in this category.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal for Viewing Images (not videos) */}
      {selectedMedia && selectedMedia.type === 'image' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }} onClick={closeModal}>
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2001
            }}
          >
            <X size={20} />
          </button>
          
          <div style={{ maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedMedia.src}
              alt={selectedMedia.title}
              style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '8px' }}
            />
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '12px 20px',
              borderRadius: '8px',
              marginTop: '16px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'white', marginBottom: '4px' }}>{selectedMedia.title}</h3>
              <p style={{ color: '#ccc', fontSize: '12px', textTransform: 'capitalize' }}>{selectedMedia.category}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Video Modal (when clicking on video thumbnail) */}
      {selectedMedia && selectedMedia.type === 'video' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.9)',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer'
        }} onClick={closeModal}>
          <button
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2001
            }}
          >
            <X size={20} />
          </button>
          
          <div style={{ maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <video
              src={selectedMedia.src}
              controls
              autoPlay
              style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: '8px' }}
            />
            <div style={{
              backgroundColor: 'rgba(0,0,0,0.7)',
              padding: '12px 20px',
              borderRadius: '8px',
              marginTop: '16px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: 'white', marginBottom: '4px' }}>{selectedMedia.title}</h3>
              <p style={{ color: '#ccc', fontSize: '12px', textTransform: 'capitalize' }}>{selectedMedia.category}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Media;