import { Entry } from "./entries";
// Task type definition
export type Task = {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  created_at: string;
  active: number;
  deleted: number;
};

export type TaskWithEntries = Task & {
  entries: Entry[];
  total_hours: number;
};

export type RawTaskRow = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  total_hours: number;
  entries: string | null;
};

export type UpdateTaskResult =
  | { success: true; changes: number; message: string }
  | { success: false; error: string };

export type UpdateTaskActionResponse =
  | ({ status: number } & { success: true; data: string })
  | ({ status: number } & { success: false; error: string });
