// Payment model
const { supabaseAdmin } = require('../config/supabase');

const Payment = {
  // Create payment
  async create(paymentData) {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .insert([paymentData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Find by ID
  async findById(id) {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .select('*, profiles(*)')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Find by user ID
  async findByUserId(userId) {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Update payment status
  async updateStatus(id, status, transactionCode = null) {
    const updates = { status };
    if (transactionCode) updates.transaction_code = transactionCode;
    
    const { data, error } = await supabaseAdmin
      .from('payments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Get all payments (admin)
  async findAll() {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .select('*, profiles(*)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Get total revenue
  async getTotalRevenue() {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .select('amount')
      .eq('status', 'completed');
    
    if (error) throw error;
    
    const total = data.reduce((sum, payment) => sum + payment.amount, 0);
    return total;
  },

  // Get revenue by date range
  async getRevenueByDateRange(startDate, endDate) {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .select('amount')
      .eq('status', 'completed')
      .gte('created_at', startDate)
      .lte('created_at', endDate);
    
    if (error) throw error;
    
    const total = data.reduce((sum, payment) => sum + payment.amount, 0);
    return total;
  },

  // Get payment stats
  async getStats() {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .select('status, amount')
      .eq('status', 'completed');
    
    if (error) throw error;
    
    const stats = {
      total: data.length,
      totalAmount: data.reduce((sum, p) => sum + p.amount, 0),
      byStatus: {}
    };
    
    return stats;
  }
};

module.exports = Payment;