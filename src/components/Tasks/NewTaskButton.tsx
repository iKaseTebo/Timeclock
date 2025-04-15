"use client";
import NewTaskModal from "../Modal/NewTaskModal";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NewTaskButton() {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const pathname = usePathname();

  if (pathname !== "/tasks") return null;

  return (
    <>
      <button
        onClick={() => setShowNewTaskModal(true)}
        className=" cursor-pointer border-white border hover:bg-purple-800 text-white px-6 py-2 rounded-md font-semibold transition-colors"
      >
        NEW TASK
      </button>
      <NewTaskModal
        open={showNewTaskModal}
        onCancel={() => setShowNewTaskModal(false)}
      />
    </>
  );
}
