"use client";
import { FormEvent, useEffect, useState, ChangeEvent } from "react";
import Modal from "./Modal";
import { Task } from "@/types/tasks";

type NoteModalProps = {
  open: boolean;
  note: string;
  setNote: (note: string) => void;
  setEntryTask: (taskId: number) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
};

export default function NoteModal({
  open,
  note,
  setNote,
  setEntryTask,
  onSubmit,
  onCancel,
}: NoteModalProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState("");

  const fetchTasks = async () => {
    // setLoading(true);
    // setError("");
    try {
      const res = await fetch(`/api/tasks/active`);
      if (!res.ok) throw new Error(`Failed to fetch Tasks`);
      const data = await res.json();

      if (data.length === 0) {
        throw new Error("No data returned");
      }

      setTasks(data);
    } catch (err) {
      console.error("Error fetching Tasks:", err);
      //   setError("An error occurred while fetching Tasks.");
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Modal open={open} onClose={onCancel}>
      <form onSubmit={onSubmit} className="space-y-4 p-4">
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-white">Add a note</h2>
          <textarea
            className="w-full h-24 p-2 rounded-md border border-white text-white"
            placeholder="Optional note..."
            value={note}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setNote(e.target.value)
            }
          />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-white">Assign a Task</h2>
          <select
            name="task"
            className="appearance-none pr-8 pl-3 py-2 bg-white text-black rounded"
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setEntryTask(parseInt(e.target.value))
            }
          >
            <option value="">Select a task</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-800 hover:bg-purple-700 text-white px-4 py-2 rounded"
          >
            Clock Out
          </button>
        </div>
      </form>
    </Modal>
  );
}
