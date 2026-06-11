import { useState, useEffect } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

interface Review {
  id: string;
  rating: number;
  title: string;
  comment: string;
  user_id: string;
  profiles: {
    full_name: string;
    avatar_url: string;
  };
  is_verified_purchase: boolean;
  helpful_count: number;
  created_at: string;
}

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: ''
  });

  useEffect(() => {
    fetchReviews();
    fetchRatingStats();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/product/${productId}`);
      const data = await response.json();
      if (data.success) {
        setReviews(data.data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRatingStats = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/product/${productId}/rating`);
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: productId,
          ...newReview
        })
      });
      
      if (response.ok) {
        setShowForm(false);
        setNewReview({ rating: 5, title: '', comment: '' });
        fetchReviews();
        fetchRatingStats();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderStars = (rating: number, interactive = false, onClick?: (rating: number) => void) => {
    return (
      <div style={{ display: 'flex', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={interactive ? 28 : 16}
            fill={star <= rating ? '#FFB800' : 'none'}
            color="#FFB800"
            style={{
              cursor: interactive ? 'pointer' : 'default',
              transition: 'transform 0.2s'
            }}
            onClick={() => interactive && onClick?.(star)}
            onMouseEnter={(e) => {
              if (interactive) e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              if (interactive) e.currentTarget.style.transform = 'scale(1)';
            }}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading reviews...</div>;
  }

  return (
    <div style={{ marginTop: '60px', borderTop: '2px solid #eee', paddingTop: '40px' }}>
      <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Customer Reviews</h2>
      
      {/* Rating Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '40px',
        backgroundColor: '#f9f9f9',
        padding: '24px',
        borderRadius: '16px',
        marginBottom: '40px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#333' }}>
            {stats.averageRating || 0}
          </div>
          <div style={{ margin: '8px 0' }}>
            {renderStars(Math.round(stats.averageRating))}
          </div>
          <div style={{ color: '#666' }}>
            Based on {stats.totalReviews} reviews
          </div>
        </div>
        
        <div>
          {[5, 4, 3, 2, 1].map((star) => {
            const count = stats.ratingDistribution[star as keyof typeof stats.ratingDistribution];
            const percentage = stats.totalReviews > 0 ? (count / stats.totalReviews) * 100 : 0;
            return (
              <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ width: '30px' }}>{star} ★</span>
                <div style={{
                  flex: 1,
                  height: '8px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: '#FFB800',
                    borderRadius: '4px'
                  }} />
                </div>
                <span style={{ width: '50px', color: '#666' }}>{count}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Write Review Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          backgroundColor: 'var(--red)',
          color: 'white',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '32px',
          fontWeight: 'bold'
        }}
      >
        {showForm ? 'Cancel' : 'Write a Review'}
      </button>
      
      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmitReview} style={{
          backgroundColor: '#f9f9f9',
          padding: '24px',
          borderRadius: '16px',
          marginBottom: '32px'
        }}>
          <h3 style={{ marginBottom: '16px' }}>Write Your Review</h3>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Rating</label>
            {renderStars(newReview.rating, true, (rating) => setNewReview({ ...newReview, rating }))}
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Title</label>
            <input
              type="text"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              required
              placeholder="Summarize your experience"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Review</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
              rows={4}
              placeholder="Share your detailed experience with this product"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                resize: 'vertical'
              }}
            />
          </div>
          
          <button
            type="submit"
            style={{
              backgroundColor: 'var(--red)',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Submit Review
          </button>
        </form>
      )}
      
      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#888' }}>
          No reviews yet. Be the first to review this product!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {reviews.map((review) => (
            <div key={review.id} style={{
              borderBottom: '1px solid #eee',
              paddingBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: '#666'
                }}>
                  {review.profiles?.full_name?.charAt(0) || 'U'}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{review.profiles?.full_name || 'Anonymous'}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>{formatDate(review.created_at)}</div>
                </div>
                {review.is_verified_purchase && (
                  <span style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    fontSize: '11px',
                    marginLeft: 'auto'
                  }}>
                    Verified Purchase
                  </span>
                )}
              </div>
              <div style={{ marginBottom: '8px' }}>
                {renderStars(review.rating)}
              </div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{review.title}</h4>
              <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '12px' }}>{review.comment}</p>
              <button
                onClick={async () => {
                  const token = localStorage.getItem('token');
                  await fetch(`http://localhost:5000/api/reviews/${review.id}/helpful`, {
                    method: 'POST',
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  });
                  fetchReviews();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                <ThumbsUp size={14} /> Helpful ({review.helpful_count || 0})
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductReviews;