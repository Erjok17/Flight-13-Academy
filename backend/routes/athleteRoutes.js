const express = require('express');
const router = express.Router();
const {
  getAllAthletes,
  getAthleteById,
  createAthlete,
  updateAthlete,
  deleteAthlete
} = require('../controllers/athleteController');
const { authenticate, isAdmin } = require('../middleware/auth');
const { supabaseAdmin } = require('../config/supabase'); // <-- changed from supabase

// Public routes
router.get('/', getAllAthletes);
router.get('/:id', getAthleteById);

// Admin only routes
router.post('/', authenticate, isAdmin, createAthlete);
router.put('/:id', authenticate, isAdmin, updateAthlete);
router.delete('/:id', authenticate, isAdmin, deleteAthlete);

router.get('/:id/medical', authenticate, isAdmin, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('athlete_medical_notes')
      .select('*')
      .eq('athlete_id', req.params.id)
      .maybeSingle();

    if (error) throw error;
    res.json({ success: true, data: data || { notes: '' } });
  } catch (err) {
    console.error('Error fetching medical notes:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.put('/:id/medical', authenticate, isAdmin, async (req, res) => {
  try {
    const { notes } = req.body;

    const { data: existing } = await supabaseAdmin
      .from('athlete_medical_notes')
      .select('id')
      .eq('athlete_id', req.params.id)
      .maybeSingle();

    let result;
    if (existing) {
      result = await supabaseAdmin
        .from('athlete_medical_notes')
        .update({ notes, updated_at: new Date().toISOString() })
        .eq('athlete_id', req.params.id)
        .select()
        .single();
    } else {
      result = await supabaseAdmin
        .from('athlete_medical_notes')
        .insert([{ athlete_id: req.params.id, notes }])
        .select()
        .single();
    }

    if (result.error) throw result.error;
    res.json({ success: true, data: result.data });
  } catch (err) {
    console.error('Error saving medical notes:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;