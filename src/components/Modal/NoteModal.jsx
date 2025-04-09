"use client";
import { useEffect, useState } from "react";
import Modal from "./Modal";


export default function NoteModal({ open, note, setNote, setEntryTask, onSubmit, onCancel }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/tasks`);
            if (!res.ok) throw new Error(`Failed to fetch Tasks`);
            const data = await res.json();

            if ( data.length === 0) {
                throw new Error("No data returned");
            }

            setTasks(data);
        } catch (err) {
            console.error("Error fetching Tasks:", err);
            setError(err.message || "An error occurred while fetching Tasks.");
            setTasks(data);
            ([]);
        } finally {
            setLoading(false);
        }
    }

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
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <h2 className="text-lg font-semibold text-white">Assign a Task</h2>
                    <select name="task"  className="appearance-none pr-8 pl-3 py-2 bg-white text-black rounded" onChange={(e) => setEntryTask(e.target.value)}>
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