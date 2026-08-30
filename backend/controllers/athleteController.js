const { supabase, supabaseAdmin } = require('../config/supabase');

// Public: get all active athletes
const getAllAthletes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('athletes')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in getAllAthletes:', error);
    res.status(500).json({ error: 'Failed to fetch athletes: ' + error.message });
  }
};

// Public: get single athlete
const getAthleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('athletes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Athlete not found' });
      }
      throw error;
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in getAthleteById:', error);
    res.status(500).json({ error: 'Failed to fetch athlete: ' + error.message });
  }
};

// Admin: create athlete
const createAthlete = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('athletes')
      .insert([req.body])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.error('Error creating athlete:', error);
    res.status(500).json({ error: 'Failed to create athlete: ' + error.message });
  }
};

// Admin: update athlete
const updateAthlete = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseAdmin
      .from('athletes')
      .update(req.body)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error updating athlete:', error);
    res.status(500).json({ error: 'Failed to update athlete: ' + error.message });
  }
};

// Admin: delete athlete
const deleteAthlete = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabaseAdmin
      .from('athletes')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Athlete deleted successfully' });
  } catch (error) {
    console.error('Error deleting athlete:', error);
    res.status(500).json({ error: 'Failed to delete athlete: ' + error.message });
  }
};

module.exports = {
  getAllAthletes,
  getAthleteById,
  createAthlete,
  updateAthlete,
  deleteAthlete
};