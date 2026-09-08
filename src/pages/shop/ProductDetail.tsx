import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { ShoppingCart, Minus, Plus, Truck, RotateCcw } from 'lucide-react';
import { API_URL } from '../../config/api';
import { useCart } from '../../context/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  image_url: string;
  description: string;
  details: string[];
  in_stock: boolean;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/api/products/${id}`);
        const data = await response.json();

        if (data.success) {
          setProduct(data.data);
        } else {
          setError(data.error || 'Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size');
      return;
    }

    addToCart(product, quantity, selectedSize || undefined);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <AnnouncementBanner />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <p>Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div>
        <Navbar />
        <AnnouncementBanner />
        <main style={{ padding: '80px 20px', textAlign: 'center' }}>
          <h2>{error || 'Product not found'}</h2>
          <Link to="/shop" style={{ color: 'var(--red)' }}>← Back to Shop</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <Link to="/shop" style={{ color: 'var(--red)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>← Back to Shop</Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', backgroundColor: 'white', borderRadius: '20px', padding: '40px' }}>
            <div>
              {product.image_url ? (
                <img src={product.image_url} alt={product.name} style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: '#f0f0f0', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '48px' }}>🛍️</span>
                </div>
              )}
            </div>

            <div>
              <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>{product.name}</h1>
              {product.category && (
                <p style={{ color: '#888', marginBottom: '16px', fontSize: '14px' }}>{product.category}</p>
              )}
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--red)', marginBottom: '20px' }}>
                UGX {Number(product.price).toLocaleString()}
              </p>
              {product.description && (
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>{product.description}</p>
              )}

              {product.details && product.details.length > 0 && (
                <ul style={{ marginBottom: '24px', paddingLeft: '20px', color: '#666', fontSize: '14px' }}>
                  {product.details.map((detail, idx) => (
                    <li key={idx} style={{ marginBottom: '4px' }}>{detail}</li>
                  ))}
                </ul>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ marginBottom: '12px' }}>Size</h3>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        style={{
                          padding: '10px 20px',
                          border: selectedSize === size ? '2px solid var(--red)' : '1px solid #ddd',
                          backgroundColor: selectedSize === size ? 'rgba(211,47,47,0.05)' : 'white',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontWeight: selectedSize === size ? 'bold' : 'normal'
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ marginBottom: '12px' }}>Available Colors</h3>
                  <p style={{ color: '#666', fontSize: '14px' }}>{product.colors.join(', ')}</p>
                </div>
              )}

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '12px' }}>Quantity</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '36px', height: '36px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}><Minus size={16} /></button>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', width: '40px', textAlign: 'center' }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ width: '36px', height: '36px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}><Plus size={16} /></button>
                </div>
              </div>

              {!product.in_stock && (
                <p style={{ color: '#d32f2f', fontWeight: 'bold', marginBottom: '16px' }}>Out of Stock</p>
              )}

              <button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                style={{
                  width: '100%',
                  backgroundColor: added ? '#4CAF50' : 'var(--red)',
                  color: 'white',
                  padding: '14px',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: product.in_stock ? 'pointer' : 'not-allowed',
                  opacity: product.in_stock ? 1 : 0.6,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '24px',
                  transition: 'background-color 0.3s'
                }}
              >
                <ShoppingCart size={18} /> {added ? 'Added!' : 'Add to Cart'}
              </button>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Truck size={18} color="#666" /><span style={{ fontSize: '13px', color: '#666' }}>Free Delivery on orders over UGX 100,000</span></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><RotateCcw size={18} color="#666" /><span style={{ fontSize: '13px', color: '#666' }}>14-day returns</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;