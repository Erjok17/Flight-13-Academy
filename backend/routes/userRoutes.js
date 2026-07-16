// User routes

const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats
} = require('../controllers/userController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Admin only routes
router.get('/', authenticate, isAdmin, getAllUsers);
router.get('/stats', authenticate, isAdmin, getUserStats);

// User profile routes
router.get('/:id', authenticate, getUserById);
router.put('/:id', authenticate, updateUser);
router.delete('/:id', authenticate, isAdmin, deleteUser);

module.exports = router;