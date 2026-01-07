const { getHabits,getHabitsWithChecks, createHabit, updateHabitCheck, getHabitChecks } = require('../database/habitsRepo');

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

async function getHabitsWithChecksHandler(req, res) {
  try {
    const habits = await getHabitsWithChecks(req.query.startDate);
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

async function updateHabitCheckHandler(req, res) {
  try {
    const { id } = req.params;
    const { date, quantity } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Habit ID is required'
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }

    const updatedHabit = await updateHabitCheck({id, date, quantity});
    res.json({
      success: true,
      data: updatedHabit,
      message: 'Habit check updated successfully'
    });
  } catch (error) {
    console.error('Error updating habit check:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update habit check',
      error: error.message
    });
  }
}

module.exports = {
  getAllHabitsHandler,
  createHabitHandler,
  deleteHabitHandler,
  getHabitsWithChecksHandler,
  updateHabitCheckHandler
};

