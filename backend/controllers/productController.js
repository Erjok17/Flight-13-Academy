// Product controller

const Product = require('../models/Product');
const { supabaseAdmin } = require('../config/supabase');

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let products;
    
    if (category) {
      products = await Product.findByCategory(category);
    } else {
      products = await Product.findAll();
    }
    
    res.json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get single product
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Create product (admin only)
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = await Product.create(productData);

    // Auto-post to announcement banner
    try {
      await supabaseAdmin.from('announcements').insert([{
        title: 'New Merchandise!',
        message: `${newProduct.name} is now available in the shop.`,
        icon: '🛍️',
        link: '/shop',
        link_text: 'Shop Now',
        is_active: true,
      }]);
    } catch (announceError) {
      // Don't fail the product creation if the announcement insert fails
      console.error('Failed to auto-create announcement for product:', announceError);
    }

    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

// Update product (admin only)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const updatedProduct = await Product.update(id, updates);
    res.json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct
};