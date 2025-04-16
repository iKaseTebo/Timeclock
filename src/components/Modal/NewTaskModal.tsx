"use client";
// import { useState, useEffect } from "react";
import Modal from "./Modal";
import TaskCard from "../Tasks/TaskCard";

type NewTaskModalProps = {
  open: boolean;
  onCancel: () => void;
};

export default function NewTaskModal({
  open,
  //   onSubmit,
  onCancel,
}: NewTaskModalProps) {
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);

  // if (!mounted) return null;
  return (
    <Modal open={open} onClose={onCancel}>
      <TaskCard onSuccess={onCancel} />
    </Modal>
  );
}
