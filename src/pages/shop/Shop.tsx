import { useState } from 'react';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { ShoppingCart, Star, Search } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  image: string;
  rating: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: 'Flight 13 Home Jersey', price: 75000, category: 'Jerseys', sizes: ['S', 'M', 'L', 'XL'], image: '/images/jersey-home.jpg', rating: 4.8, inStock: true },
  { id: 2, name: 'Flight 13 Away Jersey', price: 75000, category: 'Jerseys', sizes: ['S', 'M', 'L', 'XL'], image: '/images/jersey-away.jpg', rating: 4.7, inStock: true },
  { id: 3, name: 'Flight 13 Hoodie', price: 120000, category: 'Apparel', sizes: ['S', 'M', 'L', 'XL'], image: '/images/hoodie.jpg', rating: 4.9, inStock: true },
  { id: 4, name: 'Flight 13 Cap', price: 35000, category: 'Accessories', sizes: ['One Size'], image: '/images/cap.jpg', rating: 4.5, inStock: true },
  { id: 5, name: 'Flight 13 Basketball', price: 85000, category: 'Equipment', sizes: ['Size 7'], image: '/images/ball.jpg', rating: 4.6, inStock: false },
  { id: 6, name: 'Flight 13 Training T-Shirt', price: 55000, category: 'Apparel', sizes: ['S', 'M', 'L', 'XL'], image: '/images/tshirt.jpg', rating: 4.7, inStock: true },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'Jerseys', 'Apparel', 'Accessories', 'Equipment'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productName: string) => {
    alert(`${productName} added to cart!`);
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
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Flight 13 Shop</h1>
        <p style={{ fontSize: '18px' }}>Represent the Flight 13 brand with official merchandise</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '30px',
                    border: 'none',
                    backgroundColor: selectedCategory === cat ? 'var(--red)' : 'white',
                    color: selectedCategory === cat ? 'white' : '#333',
                    cursor: 'pointer',
                    fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                  }}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
            
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px 12px 10px 40px',
                  border: '1px solid #ddd',
                  borderRadius: '30px',
                  width: '250px'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {filteredProducts.map(product => (
              <div key={product.id} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ position: 'relative' }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                  {!product.inStock && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      backgroundColor: '#f44336',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      Sold Out
                    </div>
                  )}
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>{product.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={14} fill="#FFB800" color="#FFB800" />
                      <span style={{ fontSize: '13px', color: '#666' }}>{product.rating}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--red)', marginBottom: '12px' }}>
                    UGX {product.price.toLocaleString()}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {product.sizes.map(size => (
                      <span key={size} style={{ fontSize: '12px', color: '#666', border: '1px solid #ddd', padding: '4px 10px', borderRadius: '20px' }}>{size}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => addToCart(product.name)}
                    disabled={!product.inStock}
                    style={{
                      width: '100%',
                      backgroundColor: product.inStock ? 'var(--red)' : '#ccc',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      cursor: product.inStock ? 'pointer' : 'not-allowed',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <ShoppingCart size={16} /> {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;