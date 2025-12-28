const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, 'dashboard.db');
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

     // TODO: user_id later change to the NOT NULL and doo foreign key
    const queries = [`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        isDone INTEGER DEFAULT 0,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS habits (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        desired_quantity INTEGER DEFAULT 1,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      `CREATE TABLE IF NOT EXISTS habit_checks (
        id TEXT PRIMARY KEY,
        habit_id TEXT REFERENCES habits,
        date DATETIME NOT NULL,
        done_quantity INTEGER DEFAULT 1
      )`
    ]
    db.serialize(() => {
      queries.forEach((q) => db.run(q, (err) => {
        if (err) console.error('Error creating table:', err.message);
      }));
      resolve();
    });
  });
}

function getDb() {
  if (!db) throw new Error('Database not initialized');
  return db;
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
  getDb,
  closeDatabase
};
