"use server";
// @ts-expect-error better-sqlite3
import sql from "better-sqlite3";
import {
  Entry,
  EntryByDayRow,
  EntryByWeekRow,
  ParsedEntryByWeekRow,
  EntryByMonthRow,
  ParsedEntryByMonthRow,
  SQLiteRunResult,
} from "@/types/entries";

const db = sql("timeClock.db");

export async function getEntries() {
  return db.prepare("SELECT * FROM entries WHERE check_out IS NOT NULL").all();
}

export async function getEntriesByDay() {
  const rows = db
    .prepare(
      `
        SELECT 
            strftime('%Y-%m-%d', e.check_in) AS day,
            json_group_array(json_object(
                'id', e.id,
                'check_in', e.check_in,
                'check_out', e.check_out,
                'note', e.note,
                'created_at', e.created_at,
                'task', t.name
            )) AS sessions,
            COUNT(*) AS total_entries,
            SUM((julianday(e.check_out) - julianday(e.check_in)) * 24) AS total_hours
        FROM entries e
        LEFT JOIN tasks t ON e.task_id = t.id
        WHERE e.check_out IS NOT NULL
        GROUP BY day
        ORDER BY day DESC
    `
    )
    .all();

  return rows.map((row: EntryByDayRow) => ({
    ...row,
    sessions: JSON.parse(row.sessions),
  }));
}

export async function getEntriesByWeek(): Promise<ParsedEntryByWeekRow[]> {
  const rows: EntryByWeekRow[] = db
    .prepare(
      `
       SELECT 
            week,
            week_start,
            SUM(total_hours) AS week_total_hours,
            json_group_array(
                json_object(
                    'day', day,
                    'total_entries', total_entries,
                    'total_hours', total_hours,
                    'sessions', sessions
                )
            ) AS daily_sessions
        FROM (
            SELECT 
                strftime('%Y-%W', e.check_in) AS week,
                MIN(strftime('%Y-%m-%d', e.check_in)) AS week_start,
                strftime('%Y-%m-%d', e.check_in) AS day,
                COUNT(*) AS total_entries,
                SUM((julianday(e.check_out) - julianday(e.check_in)) * 24) AS total_hours,
                json_group_array(
                    json_object(
                        'id', e.id,
                        'check_in', e.check_in,
                        'check_out', e.check_out,
                        'note', e.note,
                        'created_at', e.created_at,
                        'task', t.name
                    )
                ) AS sessions
            FROM entries e
            LEFT JOIN tasks t ON e.task_id = t.id
            WHERE e.check_out IS NOT NULL
            GROUP BY day
        ) AS daily_data
        GROUP BY week
        ORDER BY week DESC;
    `
    )
    .all();

  return rows.map((row: EntryByWeekRow) => ({
    ...row,
    daily_sessions: JSON.parse(row.daily_sessions).map(
      (day: EntryByDayRow) => ({
        ...day,
        sessions: JSON.parse(day.sessions) as Entry,
      })
    ),
  }));
}

export async function getEntriesByMonth(): Promise<ParsedEntryByMonthRow[]> {
  const rows: EntryByMonthRow[] = db
    .prepare(
      `
        SELECT 
            month,
            month_start,
            SUM(week_total_hours) AS month_total_hours,
            json_group_array(
                json_object(
                    'week', week,
                    'week_start', week_start,
                    'week_total_hours', week_total_hours,
                    'daily_sessions', daily_sessions
                )
            ) AS weekly_sessions
        FROM (
            SELECT 
                month,
                month_start,
                week,
                week_start,
                SUM(day_total_hours) AS week_total_hours,
                json_group_array(
                    json_object(
                        'day', day,
                        'total_entries', total_entries,
                        'total_hours', day_total_hours,
                        'sessions', sessions
                    )
                ) AS daily_sessions
            FROM (
                SELECT 
                    strftime('%Y-%m', e.check_in) AS month,
                    strftime('%Y-%m-01', e.check_in) AS month_start,
                    strftime('%Y-%W', e.check_in) AS week,
                    date(e.check_in, 'weekday 0', '-6 days') AS week_start,
                    strftime('%Y-%m-%d', e.check_in) AS day,
                    COUNT(*) AS total_entries,
                    SUM((julianday(e.check_out) - julianday(e.check_in)) * 24) AS day_total_hours,
                    json_group_array(
                        json_object(
                            'id', e.id,
                            'check_in', e.check_in,
                            'check_out', e.check_out,
                            'note', e.note,
                            'created_at', e.created_at,
                            'task', t.name
                        )
                    ) AS sessions
                FROM entries e
                LEFT JOIN tasks t ON e.task_id = t.id
                WHERE e.check_out IS NOT NULL
                GROUP BY day
            ) AS daily_data
            GROUP BY week
        ) AS weekly_data
        GROUP BY month
        ORDER BY month DESC;
     `
    )
    .all();

  return rows.map((month) => ({
    ...month,
    weekly_sessions: JSON.parse(month.weekly_sessions).map(
      (week: EntryByWeekRow) => ({
        ...week,
        daily_sessions: JSON.parse(week.daily_sessions).map(
          (day: EntryByDayRow) => ({
            ...day,
            sessions: JSON.parse(day.sessions) as Entry[],
          })
        ),
      })
    ),
  }));
}

export async function getEntriesByTask(taskId: number) {
  try {
    const rows = db
      .prepare(
        `
      SELECT 
        e.id,
        e.check_in,
        e.check_out,
        e.note,
        e.created_at,
        e.task_id,
        t.name as task_name,
        t.description as task_description,
        t.active,
        t.deleted
      FROM entries e
      JOIN tasks t ON e.task_id = t.id
      WHERE e.check_out IS NOT NULL AND e.task_id = ?
      ORDER BY e.check_in DESC
    `
      )
      .all(taskId);

    console.log("getEntriesByTask", rows);
    return rows;
  } catch (error) {
    console.error("Error fetching entries by task:", error);
    return [];
  }
}

export async function getActiveSession(): Promise<Entry | null> {
  const activeSession = db
    .prepare(
      `
        SELECT * FROM entries
        WHERE check_out IS NULL
        ORDER BY check_in DESC
        LIMIT 1
    `
    )
    .get() as Entry | undefined;

  return activeSession || null;
}

export async function clockIn(): Promise<SQLiteRunResult> {
  const clockInTime = new Date().toISOString();
  return db
    .prepare(
      `
        INSERT INTO entries (check_in)
        VALUES (?)
    `
    )
    .run(clockInTime) as SQLiteRunResult;
}

export async function clockOut({
  note = "",
  task_id = 0,
}: Pick<Entry, "note" | "task_id">): Promise<Entry | undefined> {
  const checkOutTime = new Date().toISOString();
  const result = db
    .prepare(
      `
        UPDATE entries
        SET check_out = ?, note = ?, task_id = ?
        WHERE check_out IS NULL;
    `
    )
    .run(checkOutTime, note, task_id);

  const getEntry = db.prepare(`
        SELECT * FROM entries WHERE id = ?`);

  return getEntry.get(result.lastInsertRowid) as Entry | undefined;
}
