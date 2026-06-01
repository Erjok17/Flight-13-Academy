import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { ShoppingCart, Star, Minus, Plus, Truck, RotateCcw } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  colors: string[];
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
  details: string[];
}

const productData: Record<number, Product> = {
  1: {
    id: 1,
    name: 'Flight 13 Home Jersey',
    price: 75000,
    category: 'Jerseys',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red', 'White', 'Black'],
    image: '/images/jersey-home.jpg',
    rating: 4.8,
    reviews: 45,
    inStock: true,
    description: 'Official Flight 13 home jersey. Made with breathable, moisture-wicking fabric.',
    details: ['100% Polyester', 'Breathable mesh panels', 'Official Flight 13 logo']
  }
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? productData[parseInt(id)] : null;
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div>
        <Navbar />
        <AnnouncementBanner />
        <main style={{ padding: '80px 20px', textAlign: 'center' }}>
          <h2>Product not found</h2>
          <Link to="/shop">← Back to Shop</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const addToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    alert(`${product.name} (Size: ${selectedSize}, Qty: ${quantity}) added to cart!`);
  };

  return (
    <div>
      <Navbar />
      <AnnouncementBanner />
      
      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <Link to="/shop" style={{ color: 'var(--red)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>← Back to Shop</Link>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', backgroundColor: 'white', borderRadius: '20px', padding: '40px' }}>
            <div>
              <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '16px' }} />
            </div>
            
            <div>
              <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>{product.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Star size={18} fill="#FFB800" color="#FFB800" />
                  <span>{product.rating}</span>
                </div>
                <span style={{ color: '#888' }}>({product.reviews} reviews)</span>
              </div>
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: 'var(--red)', marginBottom: '20px' }}>
                UGX {product.price.toLocaleString()}
              </p>
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '24px' }}>{product.description}</p>
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '12px' }}>Size</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
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
              
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '12px' }}>Quantity</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '36px', height: '36px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}><Minus size={16} /></button>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', width: '40px', textAlign: 'center' }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ width: '36px', height: '36px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}><Plus size={16} /></button>
                </div>
              </div>
              
              <button onClick={addToCart} style={{ width: '100%', backgroundColor: 'var(--red)', color: 'white', padding: '14px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
                <ShoppingCart size={18} /> Add to Cart
              </button>
              
              <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', display: 'flex', gap: '20px' }}>
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