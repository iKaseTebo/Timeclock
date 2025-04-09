"use server";

import sql from 'better-sqlite3';

const db = sql('timeClock.db');

export async function getEntries() {
    return db.prepare('SELECT * FROM entries WHERE check_out IS NOT NULL').all();
}

export async function getEntriesByDay() {
    const rows = db.prepare(`
        SELECT 
            strftime('%Y-%m-%d', check_in) AS day,
            json_group_array(json_object(
                'id', id,
                'check_in', check_in,
                'check_out', check_out,
                'note', note,
                'created_at', created_at
            )) AS sessions,
            COUNT(*) AS total_entries,
            SUM((julianday(check_out) - julianday(check_in)) * 24) AS total_hours
        FROM entries
        WHERE check_out IS NOT NULL
        GROUP BY day
        ORDER BY day DESC
    `).all();

    return rows.map(row => ({
        ...row,
        sessions: JSON.parse(row.sessions)
    }));
}

export async function getEntriesByWeek() {
    const rows = db.prepare(`
       SELECT 
            week,
            week_start,
            SUM(total_hours) AS week_total_hours,  -- Total hours worked in the week
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
                strftime('%Y-%W', check_in) AS week,  -- Year-Week format
                MIN(strftime('%Y-%m-%d', check_in)) AS week_start,  -- First day of the week
                strftime('%Y-%m-%d', check_in) AS day,  -- Grouped by day
                COUNT(*) AS total_entries,  -- Total entries for the day
                SUM((julianday(check_out) - julianday(check_in)) * 24) AS total_hours,  -- Total hours for the day
                json_group_array(
                    json_object(
                        'id', id,
                        'check_in', check_in,
                        'check_out', check_out,
                        'note', note,
                        'created_at', created_at
                    )
                ) AS sessions
            FROM entries
            WHERE check_out IS NOT NULL
            GROUP BY day  -- Group by each day
        ) AS daily_data
        GROUP BY week
        ORDER BY week DESC;
    `).all();

    return rows.map(row => ({
        ...row,
        daily_sessions: JSON.parse(row.daily_sessions).map(day => ({
            ...day,
            sessions: JSON.parse(day.sessions)
        }))
    }));
}

export async function getEntriesByMonth() {
    const rows = db.prepare(`
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
            strftime('%Y-%m', check_in) AS month,
            strftime('%Y-%m-01', check_in) AS month_start,
            strftime('%Y-%W', check_in) AS week,
            date(check_in, 'weekday 0', '-6 days') AS week_start, -- get Sunday as start of the week
            strftime('%Y-%m-%d', check_in) AS day,
            COUNT(*) AS total_entries,
            SUM((julianday(check_out) - julianday(check_in)) * 24) AS day_total_hours,
            json_group_array(
                json_object(
                'id', id,
                'check_in', check_in,
                'check_out', check_out,
                'note', note,
                'created_at', created_at
                )
            ) AS sessions
            FROM entries
            WHERE check_out IS NOT NULL
            GROUP BY day
        ) AS daily_data
        GROUP BY week
        ) AS weekly_data
        GROUP BY month
        ORDER BY month DESC;
     `).all();
 
     return rows.map(month => ({
        ...month,
        weekly_sessions: JSON.parse(month.weekly_sessions).map(week => ({
          ...week,
          daily_sessions: JSON.parse(week.daily_sessions).map(day => ({
            ...day,
            sessions: JSON.parse(day.sessions)
          }))
        }))
      }));
}

export async function getActiveSession() {
    const activeSession = db.prepare(`
        SELECT * FROM entries
        WHERE check_out IS NULL
        ORDER BY check_in DESC
        LIMIT 1
    `).get();

    return activeSession || null;
}

export async function clockIn() {
    const clockInTime = new Date().toISOString();
    return db.prepare(`
        INSERT INTO entries (check_in)
        VALUES (?)
    `).run(clockInTime);
}

export async function clockOut(note = "", task_id = "")  {
    const checkOutTime = new Date().toISOString();
    const result = db.prepare(`
        UPDATE entries
        SET check_out = ?, note = ?, task_id = ?
        WHERE check_out IS NULL;
    `).run(checkOutTime, note, task_id);

    const getEntry = db.prepare(`
        SELECT * FROM entries WHERE id = ?`);

    return getEntry.get(result.lastInsertRowid);

}