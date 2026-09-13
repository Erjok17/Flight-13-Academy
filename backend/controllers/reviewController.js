const Review = require('../models/Review');

const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { data, count } = await Review.findByProductId(productId, page, limit);
    const stats = await Review.getProductStats(productId);

    res.json({
      success: true,
      data: {
        reviews: data,
        stats,
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit)
        }
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

const createReview = async (req, res) => {
  try {
    const { product_id, rating, title, comment } = req.body;
    const userId = req.user.id;

    if (!product_id || !rating) {
      return res.status(400).json({ error: 'Product and rating are required' });
    }

    const hasFulfilled = await Review.hasFulfilledOrderForProduct(userId, product_id);
    if (!hasFulfilled) {
      return res.status(403).json({
        error: 'You can only review a product after your order for it has been marked as fulfilled.'
      });
    }

    const existing = await Review.findByUserAndProduct(userId, product_id);
    if (existing) {
      return res.status(400).json({ error: 'You have already reviewed this product. Edit your existing review instead.' });
    }

    const reviewData = {
      product_id,
      user_id: userId,
      rating,
      title,
      comment,
      is_verified_purchase: true,
      helpful_count: 0
    };

    const review = await Review.create(reviewData);
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (existingReview.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { rating, title, comment } = req.body;
    const updatedReview = await Review.update(id, { rating, title, comment });

    res.json({ success: true, data: updatedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    if (existingReview.user_id !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Review.delete(id);
    res.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviews = await Review.findByUserId(userId);
    res.json({ success: true, data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user reviews' });
  }
};

const markHelpful = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const alreadyHelpful = await Review.isHelpful(id, userId);
    if (alreadyHelpful) {
      await Review.removeHelpful(id, userId);
      return res.json({ success: true, message: 'Removed helpful mark' });
    }

    await Review.markHelpful(id, userId);
    res.json({ success: true, message: 'Marked as helpful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to mark review as helpful' });
  }
};

const getProductRating = async (req, res) => {
  try {
    const { productId } = req.params;
    const stats = await Review.getProductStats(productId);
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product rating' });
  }
};

module.exports = {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  getUserReviews,
  markHelpful,
  getProductRating
};