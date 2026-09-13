const { supabaseAdmin } = require('../config/supabase');

const Review = {
  async create(reviewData) {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .insert([reviewData])
      .select('*, profiles(full_name)')
      .single();

    if (error) throw error;
    return data;
  },

  async findById(id) {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('*, profiles(full_name)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async findByUserAndProduct(userId, productId) {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async findByProductId(productId, page = 1, limit = 10) {
    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error, count } = await supabaseAdmin
      .from('reviews')
      .select('*, profiles(full_name)', { count: 'exact' })
      .eq('product_id', productId)
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) throw error;
    return { data, count: count || 0 };
  },

  async findByUserId(userId) {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('*, products(name, image_url)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async update(id, reviewData) {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .update({ ...reviewData, updated_at: new Date() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabaseAdmin
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  },

  async getProductStats(productId) {
    const { data, error } = await supabaseAdmin
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

  async markHelpful(reviewId, userId) {
    const { data, error } = await supabaseAdmin
      .from('review_helpful')
      .insert([{ review_id: reviewId, user_id: userId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async isHelpful(reviewId, userId) {
    const { data, error } = await supabaseAdmin
      .from('review_helpful')
      .select('id')
      .eq('review_id', reviewId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  },

  async removeHelpful(reviewId, userId) {
    const { error } = await supabaseAdmin
      .from('review_helpful')
      .delete()
      .eq('review_id', reviewId)
      .eq('user_id', userId);

    if (error) throw error;
    return true;
  },

  // Replaces the old payment-based check - now checks for a FULFILLED
  // order (set by admin) containing this product, matching the real flow
  async hasFulfilledOrderForProduct(userId, productId) {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('items')
      .eq('user_id', userId)
      .eq('status', 'fulfilled');

    if (error) throw error;

    return data.some(order =>
      Array.isArray(order.items) &&
      order.items.some((item) => item.product_id === productId)
    );
  }
};

module.exports = Review;