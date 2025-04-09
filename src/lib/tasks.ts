
"use server";
// @ts-expect-error better-sqlite3

import sql from 'better-sqlite3';
const db = sql('timeClock.db');

export type Task = {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    created_at: string;
  };

export async function CreateNewTask(task: {name: string; description: string}) {
    if (!task.name || typeof task.name !== 'string') {
        throw new Error('Task name is required and must be a string.');
      }

      const createdAt = new Date().toISOString();
      const insert = db.prepare(`
        INSERT INTO tasks (name, description, created_at) VALUES (?, ?, ?)`);

        const result = insert.run(task.name, task.description, createdAt);

        const getTask = db.prepare(`
        SELECT * FROM tasks WHERE id = ?`);

        return getTask.get(result.lastInsertRowid);
}

export async function getAllTasks(): Promise<Task[]> {
    const rows = db.prepare(`SELECT * FROM tasks ORDER BY name ASC`).all();
    return rows as Task[];
}