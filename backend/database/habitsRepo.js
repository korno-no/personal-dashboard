const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { getDb } = require('./db');

// Get all habits
function getHabits() {
  const db = getDb();
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM habits ORDER BY createdAt DESC';
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const habits = rows.map(row => ({
        id: row.id,
        name: row.name,
        desiredQuantity: row.disared_quantity || 1,
        userId: row.user_id,
        createdAt: row.createdAt,
        updatedAt: row.updatedAt
      }));
      resolve(habits);
    });
  });
}

// Create a new habit
function createHabit(habitData) {
  const db = getDb();
  return new Promise((resolve, reject) => {
    const { name, desiredQuantity } = habitData;
    if (!name || !name.trim()) {
      reject(new Error('Habit name is required'));
      return;
    }

    const id = uuidv4();
    const query = 'INSERT INTO habits (id, name, disared_quantity) VALUES (?, ?, ?)';
    const values = [id, name.trim(), desiredQuantity || 1];

    db.run(query, values, function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id, name: name.trim(), desiredQuantity: desiredQuantity || 1 });
    });
  });
}

// Delete a habit
function deleteHabit(id) {
  const db = getDb();
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM habits WHERE id = ?';
    db.run(query, [id], function(err) {
      if (err) {
        reject(err);
        return;
      }
      if (this.changes === 0) {
        reject(new Error('Habit not found'));
        return;
      }
      resolve({ id, deleted: true });
    });
  });
}

// Add a habit check
function addHabitCheck(checkData) {
  const db = getDb();
  return new Promise((resolve, reject) => {
    const { habitId, date, doneQuantity } = checkData;
    if (!habitId) {
      reject(new Error('Habit ID is required'));
      return;
    }

    const id = uuidv4();
    const query = 'INSERT INTO habit_checks (id, habit_id, date, done_quantity) VALUES (?, ?, ?, ?)';
    const values = [id, habitId, date || new Date().toISOString(), doneQuantity || 1];

    db.run(query, values, function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id, habitId, date: date || new Date().toISOString(), doneQuantity: doneQuantity || 1 });
    });
  });
}

// Get habit checks
function getHabitChecks(habitId) {
  const db = getDb();
  return new Promise((resolve, reject) => {
    let query = 'SELECT * FROM habit_checks';
    let params = [];
    
    if (habitId) {
      query += ' WHERE habit_id = ?';
      params = [habitId];
    }
    
    query += ' ORDER BY date DESC';
    
    db.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const checks = rows.map(row => ({
        id: row.id,
        habitId: row.habit_id,
        date: row.date,
        doneQuantity: row.done_quantity || 1
      }));
      resolve(checks);
    });
  });
}

module.exports = { getHabits, createHabit, deleteHabit, addHabitCheck, getHabitChecks };

