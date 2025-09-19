const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, 'tasks.db');
let db;

// Initialize database connection
function initDatabase() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
        reject(err);
        return;
      }
      console.log('📁 Connected to SQLite database');
      createTables().then(resolve).catch(reject);
    });
  });
}

// Create tables
function createTables() {
  return new Promise((resolve, reject) => {
    const createTasksTable = `
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        isDone INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.run(createTasksTable, (err) => {
      if (err) {
        console.error('Error creating tasks table:', err.message);
        reject(err);
        return;
      }
      console.log('📋 Tasks table created/verified');
      resolve();
    });
  });
}

// Get all tasks
function getTasks() {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM tasks ORDER BY isDone ASC, createdAt DESC';
    db.all(query, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      // Transform the data to match frontend expectations
      const tasks = rows.map(row => ({
        id: row.id,
        text: row.text,
        isDone: Boolean(row.isDone),
        createdAt: row.createdAt,
        updatedAt: row.updatedAt
      }));
      resolve(tasks);
    });
  });
}

// Create a new task
function createTask(taskData) {
  return new Promise((resolve, reject) => {
    const { text } = taskData;
    if (!text || !text.trim()) {
      reject(new Error('Task text is required'));
      return;
    }

    const id = uuidv4();
    const query = 'INSERT INTO tasks (id, text, isDone) VALUES (?, ?, ?)';
    const values = [id, text.trim(), 0];

    db.run(query, values, function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id, text: text.trim(), isDone: false });
    });
  });
}

// Update a task
function updateTask(id, taskData) {
  return new Promise((resolve, reject) => {
    const { text, isDone } = taskData;
    const query = 'UPDATE tasks SET text = ?, isDone = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?';
    const values = [text, isDone ? 1 : 0, id];

    db.run(query, values, function(err) {
      if (err) {
        reject(err);
        return;
      }
      if (this.changes === 0) {
        reject(new Error('Task not found'));
        return;
      }
      resolve({ id, text, isDone: Boolean(isDone) });
    });
  });
}

// Delete a task
function deleteTask(id) {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.run(query, [id], function(err) {
      if (err) {
        reject(err);
        return;
      }
      if (this.changes === 0) {
        reject(new Error('Task not found'));
        return;
      }
      resolve({ id, deleted: true });
    });
  });
}

// Close database connection
function closeDatabase() {
  if (db) {
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database connection closed');
      }
    });
  }
}

module.exports = {
  initDatabase,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  closeDatabase
};
