const express = require('express');
const router = express.Router();
const {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  getUserReviews,
  markHelpful,
  getProductRating
} = require('../controllers/reviewController');
const { authenticate } = require('../middleware/auth');

// Public routes
router.get('/product/:productId', getProductReviews);
router.get('/product/:productId/rating', getProductRating);

// Authenticated routes
router.get('/my', authenticate, getUserReviews);
router.post('/', authenticate, createReview);
router.put('/:id', authenticate, updateReview);
router.delete('/:id', authenticate, deleteReview);
router.post('/:id/helpful', authenticate, markHelpful);

module.exports = router;