const { supabase } = require('../config/supabase');

const Review = {
  // Create review
  async create(reviewData) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([reviewData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Find by ID
  async findById(id) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, profiles(full_name, avatar_url)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Find by product ID
  async findByProductId(productId, page = 1, limit = 10) {
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    
    const { data, error } = await supabase
      .from('reviews')
      .select('*, profiles(full_name, avatar_url)', { count: 'exact' })
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
      .range(start, end);
    
    if (error) throw error;
    return { data, count: data.length };
  },

  // Find by user ID
  async findByUserId(userId) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, products(name, image_url)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Update review
  async update(id, reviewData) {
    const { data, error } = await supabase
      .from('reviews')
      .update({ ...reviewData, updated_at: new Date() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Delete review
  async delete(id) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  },

  // Get product rating stats
  async getProductStats(productId) {
    const { data, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('product_id', productId);
    
    if (error) throw error;
    
    if (data.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      };
    }
    
    const totalReviews = data.length;
    const sumRatings = data.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = sumRatings / totalReviews;
    
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    data.forEach(r => {
      ratingDistribution[r.rating]++;
    });
    
    return {
      averageRating: parseFloat(averageRating.toFixed(1)),
      totalReviews,
      ratingDistribution
    };
  },

  // Mark review as helpful
  async markHelpful(reviewId, userId) {
    const { data, error } = await supabase
      .from('review_helpful')
      .insert([{ review_id: reviewId, user_id: userId }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Check if user found review helpful
  async isHelpful(reviewId, userId) {
    const { data, error } = await supabase
      .from('review_helpful')
      .select('id')
      .eq('review_id', reviewId)
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  },

  // Remove helpful mark
  async removeHelpful(reviewId, userId) {
    const { error } = await supabase
      .from('review_helpful')
      .delete()
      .eq('review_id', reviewId)
      .eq('user_id', userId);
    
    if (error) throw error;
    return true;
  },

  // Check if user has purchased product (for verified purchase)
  async hasPurchasedProduct(userId, productId) {
    const { data, error } = await supabase
      .from('orders')
      .select('id')
      .eq('user_id', userId)
      .eq('payment_status', 'completed')
      .contains('items', [{ product_id: productId }]);
    
    if (error) throw error;
    return data.length > 0;
  }
};

module.exports = Review;