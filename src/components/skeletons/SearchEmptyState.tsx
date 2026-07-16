import { Link } from 'react-router-dom';
import { Search, Compass } from 'lucide-react';

interface SearchEmptyStateProps {
  searchTerm: string;
}

export const SearchEmptyState = ({ searchTerm }: SearchEmptyStateProps) => {
  const suggestions = [
    'Double check your spelling',
    'Try searching for more general terms (e.g. "training" instead of specific drill names)',
    'Use different keywords associated with programs, coaches, or gear'
  ];

  const popularShortcuts = [
    { label: 'Basketball Shop', path: '/shop' },
    { label: 'Academy Programs', path: '/programs' },
    { label: 'Meet the Coaches', path: '/athletes' }, // athlete directory path
    { label: 'Register Now', path: '/registration' }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 24px',
      textAlign: 'center',
      backgroundColor: 'white',
      borderRadius: '16px',
      border: '1px dashed #e0e0e0',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
      maxWidth: '700px',
      margin: '40px auto'
    }}>
      <div style={{
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <Search size={32} color="#888888" />
      </div>

      <h3 style={{
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#222',
        marginBottom: '8px'
      }}>
        No results found for "{searchTerm}"
      </h3>
      <p style={{
        fontSize: '15px',
        color: '#666',
        marginBottom: '32px'
      }}>
        We couldn't find any matches. Check spelling or browse our popular categories.
      </p>

      {/* Spacing and lists */}
      <div style={{
        textAlign: 'left',
        width: '100%',
        maxWidth: '500px',
        backgroundColor: '#fafafa',
        padding: '24px',
        borderRadius: '12px',
        marginBottom: '32px',
        border: '1px solid #f0f0f0'
      }}>
        <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#333', marginBottom: '12px' }}>
          Suggestions:
        </h4>
        <ul style={{ paddingLeft: '20px', color: '#666', fontSize: '14px', lineHeight: '1.8', margin: 0 }}>
          {suggestions.map((s, idx) => (
            <li key={idx} style={{ marginBottom: '6px' }}>{s}</li>
          ))}
        </ul>
      </div>

      {/* Shortcuts grid */}
      <div style={{ width: '100%', maxWidth: '500px' }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#555',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px'
        }}>
          <Compass size={16} /> POPULAR SHORTCUTS
        </h4>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center'
        }}>
          {popularShortcuts.map((shortcut) => (
            <Link
              key={shortcut.path}
              to={shortcut.path}
              style={{
                backgroundColor: 'rgba(237, 0, 55, 0.06)',
                color: 'var(--red)',
                padding: '8px 16px',
                borderRadius: '20px',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                border: '1px solid rgba(237,0,55,0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--red)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(237, 0, 55, 0.06)';
                e.currentTarget.style.color = 'var(--red)';
              }}
            >
              {shortcut.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchEmptyState;
