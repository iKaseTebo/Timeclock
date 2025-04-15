"use client";
import { deleteTaskAction } from "@/actions/tasks";

export default function DeleteTask({ id }: { id: number }) {
  function handleDelete() {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTaskAction(id);
    }
  }
  return (
    <span
      onClick={handleDelete}
      className="text-red-800 hover:underline cursor-pointer"
    >
      Delete
    </span>
  );
}
