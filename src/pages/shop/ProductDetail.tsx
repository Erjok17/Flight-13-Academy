import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import AnnouncementBanner from '../../components/AnnouncementBanner';
import Footer from '../../components/Footer';
import { ShoppingCart, Minus, Plus, Truck, RotateCcw, Star } from 'lucide-react';
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

interface Review {
  id: string;
  user_id: string;
  rating: number;
  title: string;
  comment: string;
  is_verified_purchase: boolean;
  created_at: string;
  profiles?: { full_name: string };
}

interface RatingStats {
  averageRating: number;
  totalReviews: number;
}

const StarRow = ({ rating, size = 16 }: { rating: number; size?: number }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1, 2, 3, 4, 5].map(n => (
      <Star key={n} size={size} fill={n <= rating ? '#FFB800' : 'none'} color="#FFB800" />
    ))}
  </div>
);

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<RatingStats>({ averageRating: 0, totalReviews: 0 });
  const [canReview, setCanReview] = useState(false);
  const [alreadyReviewed, setAlreadyReviewed] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Pagination state
  const [reviewPage, setReviewPage] = useState(1);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

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

  useEffect(() => {
    if (!id) return;
    fetchReviews(1);
    checkEligibility();
  }, [id]);

  const fetchReviews = async (page = 1, append = false) => {
    try {
      const response = await fetch(`${API_URL}/api/reviews/product/${id}?page=${page}&limit=5`);
      const data = await response.json();
      if (data.success) {
        setReviews(prev => append ? [...prev, ...data.data.reviews] : data.data.reviews);
        setStats(data.data.stats);
        setHasMoreReviews(data.data.pagination.page < data.data.pagination.totalPages);
        setReviewPage(page);

        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
          const currentUser = JSON.parse(userData);
          const mine = data.data.reviews.find((r: Review) => r.user_id === currentUser.id);
          if (mine) setAlreadyReviewed(true);
        }
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const handleLoadMore = async () => {
    setLoadingMore(true);
    await fetchReviews(reviewPage + 1, true);
    setLoadingMore(false);
  };

  const checkEligibility = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCanReview(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/orders/my`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        const eligible = data.data.some((order: any) =>
          order.status === 'fulfilled' &&
          Array.isArray(order.items) &&
          order.items.some((item: any) => item.product_id === id)
        );
        setCanReview(eligible);
      }
    } catch (err) {
      console.error('Error checking review eligibility:', err);
    }
  };

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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewError('');
    setSubmittingReview(true);

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          product_id: id,
          rating: reviewForm.rating,
          title: reviewForm.title,
          comment: reviewForm.comment,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setReviewSuccess(true);
        setReviewForm({ rating: 5, title: '', comment: '' });
        fetchReviews(1);
      } else {
        setReviewError(data.error || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setReviewError('Network error. Please try again.');
    } finally {
      setSubmittingReview(false);
    }
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', backgroundColor: 'white', borderRadius: '20px', padding: '40px', marginBottom: '30px' }}>
            <div>
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  width={600} 
                  height={600}
                  style={{ width: '100%', borderRadius: '16px', objectFit: 'cover' }} 
                />
              ) : (
                <div style={{ width: '100%', aspectRatio: '1', backgroundColor: '#f0f0f0', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '48px' }}>🛍️</span>
                </div>
              )}
            </div>

            <div>
              <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>{product.name}</h1>
              {product.category && (
                <p style={{ color: '#888', marginBottom: '12px', fontSize: '14px' }}>{product.category}</p>
              )}

              {stats.totalReviews > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <StarRow rating={Math.round(stats.averageRating)} />
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    {stats.averageRating} ({stats.totalReviews} review{stats.totalReviews !== 1 ? 's' : ''})
                  </span>
                </div>
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

          <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '40px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Reviews</h2>

            {canReview && !alreadyReviewed && !reviewSuccess && (
              <form onSubmit={handleSubmitReview} style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '16px' }}>Write a Review</h3>

                {reviewError && (
                  <div style={{ backgroundColor: '#ffebee', color: '#d32f2f', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
                    {reviewError}
                  </div>
                )}

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Your Rating</label>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {[1, 2, 3, 4, 5].map(n => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: n })}
                        aria-label={`Rate ${n} star${n !== 1 ? 's' : ''}`}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        <Star size={26} fill={n <= reviewForm.rating ? '#FFB800' : 'none'} color="#FFB800" />
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Title (optional)</label>
                  <input
                    type="text"
                    value={reviewForm.title}
                    onChange={(e) => setReviewForm({ ...reviewForm, title: e.target.value })}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                    placeholder="Sum up your experience"
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Comment</label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    rows={4}
                    style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '8px' }}
                    placeholder="What did you think?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  style={{
                    backgroundColor: 'var(--red)',
                    color: 'white',
                    padding: '10px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    opacity: submittingReview ? 0.7 : 1
                  }}
                >
                  {submittingReview ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            )}

            {reviewSuccess && (
              <div style={{ backgroundColor: '#d4edda', color: '#155724', padding: '12px', borderRadius: '8px', marginBottom: '24px' }}>
                Thanks for your review!
              </div>
            )}

            {alreadyReviewed && !reviewSuccess && (
              <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>You've already reviewed this product.</p>
            )}

            {reviews.length === 0 ? (
              <p style={{ color: '#888' }}>No reviews yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {reviews.map(review => (
                  <div key={review.id} style={{ borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <StarRow rating={review.rating} size={14} />
                      </div>
                      <span style={{ fontSize: '12px', color: '#888' }}>
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {review.title && <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{review.title}</p>}
                    <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '8px' }}>{review.comment}</p>
                    <p style={{ fontSize: '13px', color: '#888' }}>
                      {review.profiles?.full_name || 'Anonymous'}
                      {review.is_verified_purchase && (
                        <span style={{ color: '#4CAF50', marginLeft: '8px' }}>✓ Verified Purchase</span>
                      )}
                    </p>
                  </div>
                ))}

                {hasMoreReviews && (
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    style={{
                      alignSelf: 'center',
                      padding: '10px 28px',
                      backgroundColor: 'white',
                      border: '1px solid var(--red)',
                      color: 'var(--red)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      marginTop: '8px'
                    }}
                  >
                    {loadingMore ? 'Loading...' : 'Load More Reviews'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;