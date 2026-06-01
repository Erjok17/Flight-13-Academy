// src/pages/Search.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { Search as SearchIcon, X } from 'lucide-react';

interface SearchResult {
  id: number;
  title: string;
  description: string;
  type: 'program' | 'coach' | 'media';
  link: string;
}

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Sample data to search through
  const searchableData = {
    programs: [
      { id: 1, title: 'Weekly Practices', description: 'Monday, Wednesday, Friday & Saturday training sessions', link: '/programs' },
      { id: 2, title: 'Holiday Camps', description: 'Intensive week-long camps with guest coaches', link: '/programs' },
      { id: 3, title: 'Private Sessions', description: 'One-on-one personalized training', link: '/programs' },
      { id: 4, title: 'Competitive Games', description: 'Friendly games and tournaments', link: '/programs' },
    ],
    coaches: [
      { id: 1, title: 'Coach Chut Achol Matet', description: 'Head Coach & Skill Development', link: '/coaches/1' },
      { id: 2, title: 'Coach Bamutende Mark', description: 'Shooting & Offensive Coordinator', link: '/coaches/2' },
      { id: 3, title: 'Coach Nathan Ateng', description: 'Defense & Strength Conditioning', link: '/coaches/3' },
      { id: 4, title: 'Coach Wal Deng', description: 'Elite Basketball Coach & Mentor', link: '/programs' },
    ],
    media: [
      { id: 1, title: 'Training Highlights', description: 'Intensive training sessions', link: '/media' },
      { id: 2, title: 'Game Day Action', description: 'Competitive game moments', link: '/media' },
      { id: 3, title: 'Camp Highlights', description: 'Holiday camp memories', link: '/media' },
    ],
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setResults([]);
      setHasSearched(true);
      return;
    }

    const term = searchTerm.toLowerCase();
    const allResults: SearchResult[] = [];

    // Search programs
    searchableData.programs.forEach(program => {
      if (program.title.toLowerCase().includes(term) || program.description.toLowerCase().includes(term)) {
        allResults.push({ ...program, type: 'program' });
      }
    });

    // Search coaches
    searchableData.coaches.forEach(coach => {
      if (coach.title.toLowerCase().includes(term) || coach.description.toLowerCase().includes(term)) {
        allResults.push({ ...coach, type: 'coach' });
      }
    });

    // Search media
    searchableData.media.forEach(media => {
      if (media.title.toLowerCase().includes(term) || media.description.toLowerCase().includes(term)) {
        allResults.push({ ...media, type: 'media' });
      }
    });

    setResults(allResults);
    setHasSearched(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'program': return 'var(--red)';
      case 'coach': return '#2196F3';
      case 'media': return '#4CAF50';
      default: return '#888';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'program': return 'Program';
      case 'coach': return 'Coach';
      case 'media': return 'Media';
      default: return 'Other';
    }
  };

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />
      
      {/* Hero Section */}
      <section style={{
        backgroundColor: 'var(--red)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Search Flight 13</h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto', opacity: 0.95 }}>
          Find programs, coaches, and media content
        </p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Search Bar */}
          <div style={{
            display: 'flex',
            gap: '12px',
            backgroundColor: 'white',
            padding: '8px 16px',
            borderRadius: '50px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}>
            <SearchIcon size={24} color="#888" />
            <input
              type="text"
              placeholder="Search for programs, coaches, videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                padding: '12px 0'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setResults([]);
                  setHasSearched(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <X size={20} color="#888" />
              </button>
            )}
            <button
              onClick={handleSearch}
              style={{
                backgroundColor: 'var(--red)',
                color: 'white',
                border: 'none',
                padding: '8px 24px',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Search
            </button>
          </div>

          {/* Results */}
          {hasSearched && (
            <>
              {results.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  backgroundColor: 'white',
                  borderRadius: '16px'
                }}>
                  <p style={{ fontSize: '18px', color: '#888' }}>No results found for "{searchTerm}"</p>
                  <p style={{ fontSize: '14px', color: '#aaa', marginTop: '8px' }}>Try searching for "training", "coach", or "camp"</p>
                </div>
              ) : (
                <>
                  <p style={{ marginBottom: '20px', color: '#666' }}>Found {results.length} result(s) for "{searchTerm}"</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {results.map((result) => (
                      <Link
                        key={result.id}
                        to={result.link}
                        style={{
                          display: 'block',
                          backgroundColor: 'white',
                          padding: '20px',
                          borderRadius: '12px',
                          textDecoration: 'none',
                          transition: 'transform 0.3s, box-shadow 0.3s',
                          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateX(5px)';
                          e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateX(0)';
                          e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                          <span style={{
                            backgroundColor: getTypeColor(result.type),
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }}>
                            {getTypeLabel(result.type)}
                          </span>
                          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#222' }}>{result.title}</h3>
                        </div>
                        <p style={{ fontSize: '14px', color: '#666' }}>{result.description}</p>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Popular Searches */}
          {!hasSearched && (
            <div style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '30px',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#333' }}>Popular Searches</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                {['Weekly Practices', 'Holiday Camps', 'Coach Chut', 'Training', 'Games', 'Scholarship'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchTerm(term);
                      handleSearch();
                    }}
                    style={{
                      backgroundColor: '#f0f0f0',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '30px',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;