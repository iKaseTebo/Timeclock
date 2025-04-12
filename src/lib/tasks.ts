
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
    active: number;
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

export async function setActiveTask(task: {id: number; active: number}) {

    if (!task.id || typeof task.id !== 'number') {
      throw new Error('Task ID is required and must be a number.');
    }
    if (task.active !== 0 && task.active !== 1) {
      throw new Error('Task active status must be either 0 or 1.');
    }
    const update = db.prepare(`UPDATE tasks SET active = ? WHERE id = ?`);
    const result = update.run(task.active, task.id);

    return result.changes > 0; // Returns true if the update was successful
}

export async function getAllTasks(): Promise<Task[]> {
    const rows = db.prepare(`SELECT * FROM tasks WHERE deleted = 0 ORDER BY name ASC`).all();
    return rows as Task[];
}

export async function getActiveTasks(): Promise<Task[]> {
    const rows = db.prepare(`SELECT * FROM tasks WHERE active = 1 AND deleted = 0 ORDER BY name ASC`).all();
    return rows as Task[];
}

export async function updateTask(task: {id: number; name?: string; description?: string; deleted?: number}) {
  try {
    const fields: string[] = [];
    const values: (string | number)[] = [];

    if ( task.name !== undefined) {
      fields.push('name = ?');
      values.push(task.name);
    }
    if (task.description !== undefined) {
      fields.push('description = ?');
      values.push(task.description);
    }
    if (task.deleted !== undefined) {
      fields.push('deleted = ?');
      values.push(task.deleted);
    }

    if (task.id === undefined) {
      throw new Error('Task ID is required');
    }

    const query = `UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`;
    values.push(task.id);

    const stmt = db.prepare(query);

    const result = stmt.run(...values);

    if (result.changes === 0) {
      throw new Error(`No task found with id ${task.id}`);
    }

    return {
      success: true,
      changes: result.changes,
      message: 'Task updated successfully'
    };
  } catch (error: unknown) {
    console.error('Error updating task:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred while updating task';

    return {
      success: false,
      error: errorMessage || 'Unknown error occurred while updating task'
    };
  }
}