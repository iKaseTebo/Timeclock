"use client";
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
  return (
    <Modal open={open} onClose={onCancel}>
      <TaskCard />
      {/* <h1>Hello</h1> */}
    </Modal>
  );
}
