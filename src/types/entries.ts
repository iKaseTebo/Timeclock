// One Single Entry Structure
export type Entry = {
  id: number;
  check_in: Date;
  check_out: Date;
  note: string;
  created_at: string;
  task_id: number;
  task?: string;
};

// Raw Day Structure
export type EntryByDayRow = {
  day: string;
  sessions: string; // this is a JSON string that you'll parse
  total_entries: number;
  total_hours: number;
};

// Parsed Day Structure
export type DaySession = {
  day: string;
  total_entries: number;
  total_hours: number;
  sessions: Entry[];
};

// Raw Week Structure
export type EntryByWeekRow = {
  week: string;
  week_start: string;
  week_total_hours: number;
  daily_sessions: string; // JSON stringified array of DaySession but with sessions as strings
};

// Parsed week structure
export type ParsedEntryByWeekRow = Omit<EntryByWeekRow, "daily_sessions"> & {
  daily_sessions: DaySession[];
};

// Raw Month Structure
export type EntryByMonthRow = {
  month: string;
  month_start: string;
  month_total_hours: number;
  weekly_sessions: string; // JSON string of EntryByWeekRow[]
};

// Parsed month structure
export type ParsedEntryByMonthRow = Omit<EntryByMonthRow, "weekly_sessions"> & {
  weekly_sessions: ParsedEntryByWeekRow[];
};

// Sql Result Structure
export type SQLiteRunResult = {
  changes: number;
  lastInsertRowid: number;
};
