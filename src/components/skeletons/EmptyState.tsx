import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionPath?: string;
  actionCallback?: () => void;
  iconType?: 'cart' | 'search' | 'list' | 'inbox';
}

export const EmptyState = ({
  title,
  description,
  actionText,
  actionPath,
  actionCallback,
  iconType = 'list'
}: EmptyStateProps) => {
  const renderIcon = () => {
    const iconProps = {
      width: "64",
      height: "64",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "var(--red)",
      strokeWidth: "1.5",
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
      style: { marginBottom: '24px', opacity: 0.85 }
    };

    switch (iconType) {
      case 'cart':
        return (
          <svg {...iconProps}>
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
        );
      case 'search':
        return (
          <svg {...iconProps}>
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        );
      case 'inbox':
        return (
          <svg {...iconProps}>
            <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          </svg>
        );
      case 'list':
      default:
        return (
          <svg {...iconProps}>
            <line x1="8" x2="21" y1="6" y2="6" />
            <line x1="8" x2="21" y1="12" y2="12" />
            <line x1="8" x2="21" y1="18" y2="18" />
            <line x1="3" x2="3.01" y1="6" y2="6" />
            <line x1="3" x2="3.01" y1="12" y2="12" />
            <line x1="3" x2="3.01" y1="18" y2="18" />
          </svg>
        );
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
      textAlign: 'center',
      backgroundColor: '#f9f9f9',
      borderRadius: '16px',
      border: '1px dashed #e0e0e0',
      maxWidth: '600px',
      margin: '40px auto'
    }}>
      {renderIcon()}
      <h3 style={{
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#222',
        marginBottom: '12px'
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '15px',
        color: '#666',
        maxWidth: '400px',
        lineHeight: '1.6',
        marginBottom: '32px'
      }}>
        {description}
      </p>

      {actionText && (
        actionPath ? (
          <Link
            to={actionPath}
            style={{
              backgroundColor: 'var(--red)',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '30px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '15px',
              boxShadow: '0 4px 12px rgba(237, 0, 55, 0.2)',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--red)'}
          >
            {actionText}
          </Link>
        ) : (
          <button
            onClick={actionCallback}
            style={{
              backgroundColor: 'var(--red)',
              color: 'white',
              padding: '12px 28px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '15px',
              boxShadow: '0 4px 12px rgba(237, 0, 55, 0.2)',
              transition: 'background-color 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--red)'}
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
};

export default EmptyState;
