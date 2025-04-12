import Database from 'better-sqlite3';

const db = new Database('timeClock.db');

// 1. Create the tasks table
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    active INTEGER NOT NULL DEFAULT 1,
    deleted	INTEGER NOT NULL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// 2. Add task_id to entries if it doesn't exist
try {
  db.exec(`ALTER TABLE entries ADD COLUMN task_id INTEGER;`);
  console.log('Added task_id column to entries table.');
} catch (err) {
  if (!err.message.includes('duplicate column name')) {
    throw err;
  } else {
    console.log('task_id column already exists in entries table.');
  }
}

// 3. Optional: Seed some example tasks
const tasks = [
  { name: 'Client Project A', description: 'Frontend development' },
  { name: 'Internal Cleanup', description: 'Refactor old components' },
  { name: 'Research Time', description: 'Explore new tech stacks' }
];

const insert = db.prepare(`
  INSERT INTO tasks (name, description) VALUES (@name, @description)
`);

for (const task of tasks) {
  insert.run(task);
}

console.log('Tasks table initialized and seeded.');