const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTaskHandler,
  updateTaskHandler,
  deleteTaskHandler
} = require('../controllers/tasksController');

// GET /api/tasks - Get all tasks
router.get('/', getAllTasks);

// GET /api/tasks/:id - Get a specific task
router.get('/:id', getTaskById);

// POST /api/tasks - Create a new task
router.post('/', createTaskHandler);

// PUT /api/tasks/:id - Update a task
router.put('/:id', updateTaskHandler);

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', deleteTaskHandler);

module.exports = router;
