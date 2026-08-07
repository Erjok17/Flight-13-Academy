import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { ShoppingCart, Star, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { API_URL } from '../../config/api';
import SEO from '../../components/SEO';
import { ProductsEmptyState, SafeImage } from '../../components/skeletons';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  image_url: string;
  rating: number;
  in_stock: boolean;
  description: string;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState<string | null>(null);
  
  const { addToCart } = useCart();

  const categories = ['all', 'Jerseys', 'Apparel', 'Accessories', 'Equipment'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity, selectedSize);
      setAddedToCart(selectedProduct.id);
      setTimeout(() => setAddedToCart(null), 2000);
      setSelectedProduct(null);
      setSelectedSize('');
      setQuantity(1);
    }
  };

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <AnnouncementBanner />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <p>Loading products...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <SEO title="Official Shop - Merch & Gear" />
      <Navbar />
      <AnnouncementBanner />
      
      <section style={{
        backgroundColor: 'var(--red)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', marginBottom: '16px' }}>Flight 13 Shop</h1>
        <p style={{ fontSize: '18px' }}>Browse our official merchandise</p>
      </section>

      <main style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Search and Filters */}
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

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <ProductsEmptyState onReset={() => { setSearchTerm(''); setSelectedCategory('all'); }} />
          ) : (
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
                    <SafeImage 
                      src={product.image_url} 
                      alt={product.name} 
                      style={{ width: '100%', height: '250px' }} 
                    />
                  {!product.in_stock && (
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
                  {addedToCart === product.id && (
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      Added! ✓
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
                    {product.sizes?.slice(0, 3).map(size => (
                      <span key={size} style={{ fontSize: '12px', color: '#666', border: '1px solid #ddd', padding: '4px 10px', borderRadius: '20px' }}>{size}</span>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setSelectedSize(product.sizes?.[0] || '');
                      setQuantity(1);
                    }}
                    disabled={!product.in_stock}
                    style={{
                      width: '100%',
                      backgroundColor: product.in_stock ? 'var(--red)' : '#ccc',
                      color: 'white',
                      border: 'none',
                      padding: '10px',
                      borderRadius: '8px',
                      cursor: product.in_stock ? 'pointer' : 'not-allowed',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}
                  >
                    <ShoppingCart size={16} /> {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Product Modal */}
      {selectedProduct && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={() => setSelectedProduct(null)}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '30px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>{selectedProduct.name}</h2>
            <img 
              src={selectedProduct.image_url || '/images/placeholder.jpg'} 
              alt={selectedProduct.name}
              style={{ width: '100%', borderRadius: '12px', marginBottom: '16px' }}
            />
            <p style={{ color: '#666', marginBottom: '16px' }}>{selectedProduct.description}</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--red)', marginBottom: '16px' }}>
              UGX {selectedProduct.price.toLocaleString()}
            </p>
            
            {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Size</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {selectedProduct.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '8px',
                        border: selectedSize === size ? '2px solid var(--red)' : '1px solid #ddd',
                        backgroundColor: selectedSize === size ? 'rgba(211,47,47,0.1)' : 'white',
                        cursor: 'pointer'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <span>Quantity:</span>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ width: '32px', height: '32px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}
              >
                -
              </button>
              <span style={{ width: '40px', textAlign: 'center' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ width: '32px', height: '32px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}
              >
                +
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  backgroundColor: 'var(--red)',
                  color: 'white',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#ddd',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Shop;