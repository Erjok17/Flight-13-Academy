import { FilterX } from 'lucide-react';

interface ProductsEmptyStateProps {
  onReset?: () => void;
}

export const ProductsEmptyState = ({ onReset }: ProductsEmptyStateProps) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      textAlign: 'center',
      backgroundColor: '#fafafa',
      borderRadius: '16px',
      border: '1px dashed #e0e0e0',
      width: '100%',
      margin: '20px 0'
    }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        backgroundColor: 'rgba(237, 0, 55, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <FilterX size={30} color="var(--red)" />
      </div>

      <h3 style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px'
      }}>
        No Products Found
      </h3>
      <p style={{
        fontSize: '14px',
        color: '#666',
        maxWidth: '380px',
        lineHeight: '1.5',
        marginBottom: '24px'
      }}>
        We couldn't find any products matching your current selected category or price filters. Try adjusting your constraints.
      </p>

      {onReset && (
        <button
          onClick={onReset}
          style={{
            backgroundColor: 'var(--red)',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '30px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(237,0,55,0.2)',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--red-dark)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--red)'}
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default ProductsEmptyState;
