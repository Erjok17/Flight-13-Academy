import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AnnouncementBanner from '../components/AnnouncementBanner';
import Footer from '../components/Footer';
import { Search as SearchIcon, X, Loader, ArrowRight } from 'lucide-react';
import { API_URL } from '../config/api';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'program' | 'coach' | 'media' | 'product' | 'athlete' | 'announcement' | 'page';
  link: string;
  image?: string;
  price?: number;
}

const pageRedirects = [
  { keywords: ['home', 'main', 'landing'], link: '/', label: 'Home Page' },
  { keywords: ['about', 'academy', 'mission', 'who we are'], link: '/about', label: 'About Us' },
  { keywords: ['program', 'training', 'practice', 'weekly', 'holiday camp', 'camp', 'private session'], link: '/programs', label: 'Programs' },
  { keywords: ['register', 'sign up', 'join', 'enroll'], link: '/registration', label: 'Registration' },
  { keywords: ['media', 'video', 'photo', 'gallery', 'highlight'], link: '/media', label: 'Media' },
  { keywords: ['contact', 'reach', 'email', 'phone', 'location'], link: '/contact', label: 'Contact Us' },
  { keywords: ['shop', 'store', 'merchandise', 'jersey', 'merch', 'tshirt', 'cap', 'hoodie'], link: '/shop', label: 'Shop' },
  { keywords: ['account', 'profile', 'my account', 'dashboard'], link: '/account', label: 'My Account' },
  { keywords: ['cart', 'bag', 'checkout', 'purchase'], link: '/cart', label: 'Shopping Cart' },
  { keywords: ['athlete', 'player', 'scout', 'talent', 'recruit'], link: '/athletes', label: 'Athletes Directory' },
  { keywords: ['coach', 'trainer', 'instructor'], link: '/coaches/1', label: 'Coaches' },
  { keywords: ['admin', 'dashboard', 'manage'], link: '/admin', label: 'Admin Dashboard' }
];

const popularSearches = [
  { display: 'Weekly Practices', searchTerm: 'Weekly Practices', redirectPage: '/programs' },
  { display: 'Holiday Camps', searchTerm: 'Holiday Camps', redirectPage: '/programs' },
  { display: 'Coach Chut', searchTerm: 'Coach Chut', redirectPage: '/coaches/1' },
  { display: 'Coach Mark', searchTerm: 'Coach Mark', redirectPage: '/coaches/2' },
  { display: 'Coach Nathan', searchTerm: 'Coach Nathan', redirectPage: '/coaches/3' },
  { display: 'Training', searchTerm: 'training', redirectPage: '/programs' },
  { display: 'Games', searchTerm: 'games', redirectPage: '/programs' },
  { display: 'Jersey', searchTerm: 'jersey', redirectPage: '/shop' },
  { display: 'Basketball', searchTerm: 'basketball', redirectPage: '/shop' },
  { display: 'Scholarship', searchTerm: 'scholarship', redirectPage: '/athletes' },
  { display: 'Private Sessions', searchTerm: 'Private Sessions', redirectPage: '/programs' },
  { display: 'About Us', searchTerm: 'about', redirectPage: '/about' },
  { display: 'Contact', searchTerm: 'contact', redirectPage: '/contact' },
  { display: 'Shop', searchTerm: 'shop', redirectPage: '/shop' },
  { display: 'Athletes', searchTerm: 'athletes', redirectPage: '/athletes' },
  { display: 'Media', searchTerm: 'media', redirectPage: '/media' }
];

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [pageMatch, setPageMatch] = useState<{ link: string; label: string } | null>(null);

  const checkPageRedirect = (term: string): { link: string; label: string } | null => {
    for (const redirect of pageRedirects) {
      for (const keyword of redirect.keywords) {
        if (term.toLowerCase().includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(term.toLowerCase())) {
          return { link: redirect.link, label: redirect.label };
        }
      }
    }
    return null;
  };

  const performSearch = async (searchValue?: string) => {
    const termToSearch = (searchValue !== undefined ? searchValue : searchTerm).trim();
    
    if (!termToSearch) {
      setResults([]);
      setPageMatch(null);
      setHasSearched(true);
      return;
    }

    setIsLoading(true);
    const term = termToSearch.toLowerCase();
    const allResults: SearchResult[] = [];

    const matchedPage = checkPageRedirect(term);
    setPageMatch(matchedPage);

    try {
      const programsRes = await fetch(`${API_URL}/api/programs`);
      const programsData = await programsRes.json();
      if (programsData.success) {
        programsData.data.forEach((program: any) => {
          if (
            program.title?.toLowerCase().includes(term) ||
            program.description?.toLowerCase().includes(term) ||
            program.type?.toLowerCase().includes(term)
          ) {
            allResults.push({
              id: program.id,
              title: program.title,
              description: program.description || 'Learn more about this program',
              type: 'program',
              link: '/programs',
              image: program.image_url
            });
          }
        });
      }

      const coachesRes = await fetch(`${API_URL}/api/coaches`);
      const coachesData = await coachesRes.json();
      if (coachesData.success) {
        coachesData.data.forEach((coach: any, index: number) => {
          if (
            coach.name?.toLowerCase().includes(term) ||
            coach.role?.toLowerCase().includes(term) ||
            coach.bio?.toLowerCase().includes(term)
          ) {
            allResults.push({
              id: coach.id,
              title: coach.name,
              description: coach.role + ' - ' + (coach.bio?.substring(0, 100) || ''),
              type: 'coach',
              link: `/coaches/${index + 1}`,
              image: coach.image_url
            });
          }
        });
      }

      const productsRes = await fetch(`${API_URL}/api/products`);
      const productsData = await productsRes.json();
      if (productsData.success) {
        productsData.data.forEach((product: any) => {
          if (
            product.name?.toLowerCase().includes(term) ||
            product.description?.toLowerCase().includes(term) ||
            product.category?.toLowerCase().includes(term)
          ) {
            allResults.push({
              id: product.id,
              title: product.name,
              description: product.description || `UGX ${product.price?.toLocaleString()} - ${product.category}`,
              type: 'product',
              link: '/shop',
              image: product.image_url,
              price: product.price
            });
          }
        });
      }

      const athletesRes = await fetch(`${API_URL}/api/athletes`);
      const athletesData = await athletesRes.json();
      if (athletesData.success) {
        athletesData.data.forEach((athlete: any) => {
          if (
            athlete.full_name?.toLowerCase().includes(term) ||
            athlete.position?.toLowerCase().includes(term) ||
            athlete.school?.toLowerCase().includes(term)
          ) {
            allResults.push({
              id: athlete.id,
              title: athlete.full_name,
              description: `${athlete.position} | Age ${athlete.age} | ${athlete.school}`,
              type: 'athlete',
              link: `/athletes/${athlete.id}`,
              image: athlete.avatar_url
            });
          }
        });
      }

      const announcementsRes = await fetch(`${API_URL}/api/announcements/active`);
      const announcementsData = await announcementsRes.json();
      if (announcementsData.success) {
        announcementsData.data.forEach((announcement: any) => {
          if (
            announcement.title?.toLowerCase().includes(term) ||
            announcement.message?.toLowerCase().includes(term)
          ) {
            allResults.push({
              id: announcement.id,
              title: announcement.title,
              description: announcement.message,
              type: 'announcement',
              link: announcement.link || '/',
              image: undefined
            });
          }
        });
      }

      setResults(allResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  const handleSearch = () => {
    performSearch();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const handlePopularSearch = (item: typeof popularSearches[0]) => {
    setSearchTerm(item.display);
    const matchedPage = checkPageRedirect(item.searchTerm);
    setPageMatch(matchedPage);
    performSearch(item.searchTerm);
  };

  const handlePageRedirect = (link: string) => {
    navigate(link);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'program': return 'var(--red)';
      case 'coach': return '#2196F3';
      case 'media': return '#4CAF50';
      case 'product': return '#FF9800';
      case 'athlete': return '#9C27B0';
      case 'announcement': return '#00BCD4';
      case 'page': return '#607D8B';
      default: return '#888';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'program': return 'Program';
      case 'coach': return 'Coach';
      case 'media': return 'Media';
      case 'product': return 'Product';
      case 'athlete': return 'Athlete';
      case 'announcement': return 'Announcement';
      case 'page': return 'Page';
      default: return 'Other';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'program': return '🏀';
      case 'coach': return '👨‍🏫';
      case 'product': return '👕';
      case 'athlete': return '🏃';
      case 'announcement': return '📢';
      case 'page': return '📄';
      default: return '📄';
    }
  };

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />
      
      <section style={{
        backgroundColor: 'var(--red)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Search Flight 13</h1>
        <p style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto', opacity: 0.95 }}>
          Find programs, coaches, products, athletes, and more
        </p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9', minHeight: '60vh' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
          
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
              placeholder="Search for programs, coaches, products, athletes..."
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
                  setPageMatch(null);
                  setHasSearched(false);
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} color="#888" />
              </button>
            )}
            <button
              onClick={handleSearch}
              disabled={isLoading}
              style={{
                backgroundColor: 'var(--red)',
                color: 'white',
                border: 'none',
                padding: '8px 24px',
                borderRadius: '50px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                opacity: isLoading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {isLoading ? <Loader size={18} className="spinner" /> : <SearchIcon size={18} />}
              Search
            </button>
          </div>

          {hasSearched && !isLoading && pageMatch && (
            <div style={{
              backgroundColor: '#e3f2fd',
              border: '1px solid #2196F3',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>🔍</span>
                  <span style={{ fontWeight: 'bold', color: '#1976D2' }}>Go directly to:</span>
                </div>
                <span style={{ fontSize: '18px', color: '#333' }}>{pageMatch.label}</span>
              </div>
              <button
                onClick={() => handlePageRedirect(pageMatch.link)}
                style={{
                  backgroundColor: '#2196F3',
                  color: 'white',
                  border: 'none',
                  padding: '10px 24px',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Go to {pageMatch.label} <ArrowRight size={16} />
              </button>
            </div>
          )}

          {hasSearched && (
            <>
              {isLoading ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '16px' }}>
                  <Loader size={40} className="spinner" />
                  <p style={{ marginTop: '16px', color: '#888' }}>Searching...</p>
                </div>
              ) : results.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'white', borderRadius: '16px' }}>
                  <p style={{ fontSize: '18px', color: '#888' }}>No results found for "{searchTerm}"</p>
                  <p style={{ fontSize: '14px', color: '#aaa', marginTop: '8px' }}>
                    Try one of the popular searches below
                  </p>
                </div>
              ) : (
                <>
                  <p style={{ marginBottom: '20px', color: '#666' }}>
                    Found {results.length} result(s) for "{searchTerm}"
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {results.map((result, index) => (
                      <Link
                        key={`${result.type}-${result.id}-${index}`}
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                          <span style={{
                            backgroundColor: getTypeColor(result.type),
                            color: 'white',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {getTypeIcon(result.type)} {getTypeLabel(result.type)}
                          </span>
                          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#222' }}>{result.title}</h3>
                          {result.price && (
                            <span style={{ color: 'var(--red)', fontWeight: 'bold', fontSize: '14px' }}>
                              UGX {result.price.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '14px', color: '#666' }}>{result.description}</p>
                        {result.image && (
                          <div style={{ marginTop: '12px' }}>
                            <img src={result.image} alt={result.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} />
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {!hasSearched && !isLoading && (
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '30px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '20px', marginBottom: '20px', color: '#333' }}>🔍 Popular Searches</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                {popularSearches.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handlePopularSearch(item)}
                    style={{
                      backgroundColor: '#f0f0f0',
                      border: 'none',
                      padding: '10px 20px',
                      borderRadius: '30px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#333'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--red)';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f0f0';
                      e.currentTarget.style.color = '#333';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {item.display}
                  </button>
                ))}
              </div>
              
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                <p style={{ fontSize: '13px', color: '#888' }}>
                  💡 Tip: Click any popular search to instantly see results and page suggestions!
                </p>
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