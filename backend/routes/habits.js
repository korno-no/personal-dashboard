const express = require('express');
const router = express.Router();
const {
  getAllHabitsHandler,
  createHabitHandler,
  deleteHabitHandler,
  getHabitsWithChecksHandler,
  updateHabitCheckHandler
} = require('../controllers/habitsController');

// GET /api/habits - Get all habits
router.get('/', getAllHabitsHandler);

// POST /api/habits - Create a new habit
router.post('/', createHabitHandler);

// DELETE /api/habits/:id - Delete a habit
router.delete('/:id', deleteHabitHandler);

// GET /api/habits/checks - Get habits with checks
router.get('/checks', getHabitsWithChecksHandler);

// PUT /api/habits/:id/checks - Update a habit check
router.put('/:id/checks', updateHabitCheckHandler)

module.exports = router;

