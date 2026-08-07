import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export const CartEmptyState = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
      textAlign: 'center',
      backgroundColor: 'white',
      borderRadius: '16px',
      border: '1px dashed #e0e0e0',
      boxShadow: '0 8px 30px rgba(0, 0, 0, 0.02)',
      maxWidth: '650px',
      margin: '40px auto'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: 'rgba(237, 0, 55, 0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px'
      }}>
        <ShoppingBag size={40} color="var(--red)" />
      </div>
      
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#222',
        marginBottom: '12px',
        letterSpacing: '0.5px'
      }}>
        Your Shopping Cart is Empty
      </h2>
      
      <p style={{
        fontSize: '15px',
        color: '#666',
        maxWidth: '440px',
        lineHeight: '1.6',
        marginBottom: '32px'
      }}>
        You haven't added any training gear, jerseys, or accessories to your cart yet. Let's find some elite gear to elevate your game.
      </p>

      <Link
        to="/shop"
        style={{
          backgroundColor: 'var(--red)',
          color: 'white',
          padding: '14px 36px',
          borderRadius: '30px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '16px',
          boxShadow: '0 6px 20px rgba(237, 0, 55, 0.25)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--red-dark)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--red)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Go To Shop
      </Link>
    </div>
  );
};

export default CartEmptyState;
