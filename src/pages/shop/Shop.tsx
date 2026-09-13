import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  in_stock: boolean;
  description: string;
}

interface RatingInfo {
  averageRating: number;
  totalReviews: number;
}

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [ratings, setRatings] = useState<Record<string, RatingInfo>>({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
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
        fetchRatings(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRatings = async (productList: Product[]) => {
    try {
      const results = await Promise.all(
        productList.map(p =>
          fetch(`${API_URL}/api/reviews/product/${p.id}/rating`)
            .then(res => res.json())
            .then(json => ({ id: p.id, stats: json.data }))
            .catch(() => ({ id: p.id, stats: null }))
        )
      );

      const map: Record<string, RatingInfo> = {};
      results.forEach(r => {
        if (r.stats) {
          map[r.id] = { averageRating: r.stats.averageRating, totalReviews: r.stats.totalReviews };
        }
      });
      setRatings(map);
    } catch (err) {
      console.error('Error fetching ratings:', err);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1, product.sizes?.[0] || undefined);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
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

          {filteredProducts.length === 0 ? (
            <ProductsEmptyState onReset={() => { setSearchTerm(''); setSelectedCategory('all'); }} />
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
              {filteredProducts.map(product => {
                const rating = ratings[product.id];
                return (
                  <Link
                    key={product.id}
                    to={`/product/${product.id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                      backgroundColor: 'white',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                      transition: 'transform 0.3s',
                      display: 'block'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
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
                        {rating && rating.totalReviews > 0 && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={14} fill="#FFB800" color="#FFB800" />
                            <span style={{ fontSize: '13px', color: '#666' }}>{rating.averageRating} ({rating.totalReviews})</span>
                          </div>
                        )}
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
                        onClick={(e) => handleQuickAdd(e, product)}
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
                        <ShoppingCart size={16} /> {product.in_stock ? 'Quick Add' : 'Out of Stock'}
                      </button>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;