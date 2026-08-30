// Order model
const { supabaseAdmin } = require('../config/supabase');

const Order = {
  // Create order
  async create(orderData) {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert([orderData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Find by ID
  async findById(id) {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Find by user ID
  async findByUserId(userId) {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get all orders (admin)
  async findAll() {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Find by status (admin)
  async findByStatus(status) {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Update order status (admin)
  async updateStatus(id, status, payment_status) {
    const updates = {};
    if (status) updates.status = status;
    if (payment_status) updates.payment_status = payment_status;

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Total sales across completed orders
  async getTotalSales() {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('total_amount')
      .eq('payment_status', 'completed');

    if (error) throw error;
    return data.reduce((sum, order) => sum + Number(order.total_amount), 0);
  },

  // General order stats (admin)
  async getStats() {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('status, payment_status, total_amount');

    if (error) throw error;

    return {
      totalOrders: data.length,
      pending: data.filter(o => o.status === 'pending').length,
      completed: data.filter(o => o.status === 'completed').length,
      cancelled: data.filter(o => o.status === 'cancelled').length,
    };
  }
};

module.exports = Order;