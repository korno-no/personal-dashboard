const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../database/db');

// GET /api/tasks - Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await getTasks();
    res.json({
      success: true,
      data: tasks,
      count: tasks.length
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tasks',
      error: error.message
    });
  }
});

// POST /api/tasks - Create a new task
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Task text is required'
      });
    }

    const newTask = await createTask({ text: text.trim() });
    res.status(201).json({
      success: true,
      data: newTask,
      message: 'Task created successfully'
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create task',
      error: error.message
    });
  }
});

// PUT /api/tasks/:id - Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, isDone } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Task ID is required'
      });
    }

    if (text !== undefined && (!text || !text.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Task text cannot be empty'
      });
    }

    const updateData = {};
    if (text !== undefined) updateData.text = text.trim();
    if (isDone !== undefined) updateData.isDone = Boolean(isDone);

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    const updatedTask = await updateTask(id, updateData);
    res.json({
      success: true,
      data: updatedTask,
      message: 'Task updated successfully'
    });
  } catch (error) {
    console.error('Error updating task:', error);
    if (error.message === 'Task not found') {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to update task',
      error: error.message
    });
  }
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Task ID is required'
      });
    }

    await deleteTask(id);
    res.json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting task:', error);
    if (error.message === 'Task not found') {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete task',
      error: error.message
    });
  }
});

// GET /api/tasks/:id - Get a specific task
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tasks = await getTasks();
    const task = tasks.find(t => t.id === id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    res.json({
      success: true,
      data: task
    });
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch task',
      error: error.message
    });
  }
});

module.exports = router;
