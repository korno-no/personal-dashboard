const express = require('express');
const router = express.Router();
const {
  getAllHabitsHandler,
  getHabitsWithChecksHandler,
  createHabitHandler,
  deleteHabitHandler,
  addHabitCheckHandler,
  getHabitChecksHandler
} = require('../controllers/habitsController');

// GET /api/habits - Get all habits
router.get('/', getAllHabitsHandler);

// GET /api/habits/checks - Get habits with checks
router.get('/checks', getHabitsWithChecksHandler);

// POST /api/habits - Create a new habit
router.post('/', createHabitHandler);

// DELETE /api/habits/:id - Delete a habit
router.delete('/:id', deleteHabitHandler);

// POST /api/habits/checks - Add a habit check
router.post('/checks', addHabitCheckHandler);

// GET /api/habits/checks - Get habit checks (optional habitId query param)
//router.get('/checks', getHabitChecksHandler);

module.exports = router;

