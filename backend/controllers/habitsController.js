const { getHabits,getHabitsWithChecks, createHabit, deleteHabit, addHabitCheck, getHabitChecks } = require('../database/habitsRepo');

async function getAllHabitsHandler(req, res) {
  try {
    const habits = await getHabits();
    res.json({
      success: true,
      data: habits,
      count: habits.length
    });
  } catch (error) {
    console.error('Error fetching habits:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch habits',
      error: error.message
    });
  }
}

async function getHabitsWithChecksHandler(req, res) {
  try {
    const habits = await getHabitsWithChecks();
    res.json({
      success: true,
      data: habits,
      count: habits.length
    });
  } catch (error) {
    console.error('Error fetching habits with checks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch habits with checks',
      error: error.message
    });
  }
}

async function createHabitHandler(req, res) {
  try {
    const { name, desiredQuantity } = req.body;
    
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Habit name is required'
      });
    }

    const newHabit = await createHabit({ name: name.trim(), desiredQuantity: desiredQuantity });
    res.status(201).json({
      success: true,
      data: newHabit,
      message: 'Habit created successfully'
    });
  } catch (error) {
    console.error('Error creating habit:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create habit',
      error: error.message
    });
  }
}

async function deleteHabitHandler(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Habit ID is required'
      });
    }

    await deleteHabit(id);
    res.json({
      success: true,
      message: 'Habit deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting habit:', error);
    if (error.message === 'Habit not found') {
      return res.status(404).json({
        success: false,
        message: 'Habit not found'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Failed to delete habit',
      error: error.message
    });
  }
}

async function addHabitCheckHandler(req, res) {
  try {
    const { habitId, date, doneQuantity } = req.body;

    if (!habitId) {
      return res.status(400).json({
        success: false,
        message: 'Habit ID is required'
      });
    }

    const newCheck = await addHabitCheck({ habitId, date, doneQuantity });
    res.status(201).json({
      success: true,
      data: newCheck,
      message: 'Habit check added successfully'
    });
  } catch (error) {
    console.error('Error adding habit check:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add habit check',
      error: error.message
    });
  }
}

async function getHabitChecksHandler(req, res) {
  try {
    const { habitId } = req.query;
    const checks = await getHabitChecks(habitId);
    res.json({
      success: true,
      data: checks,
      count: checks.length
    });
  } catch (error) {
    console.error('Error fetching habit checks:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch habit checks',
      error: error.message
    });
  }
}

module.exports = {
  getAllHabitsHandler,
  getHabitsWithChecksHandler,
  createHabitHandler,
  deleteHabitHandler,
  addHabitCheckHandler,
  getHabitChecksHandler
};

