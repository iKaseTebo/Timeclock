"use client";
import { clockInAction, clockOutAction } from "@/actions/clock";
import { useClockContext } from "@/context/ClockContext";
import { useState } from "react";
import NoteModal from "../Modal/NoteModal";
import { Entry } from "@/types/entries";

export default function ClockInButton({
  activeSession,
}: {
  activeSession: Entry | null;
}) {
  const { triggerRefresh } = useClockContext();
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [note, setNote] = useState("");
  const [task, setTask] = useState(0);

  const handleClick = async () => {
    if (activeSession) {
      setShowNoteModal(true);
    } else {
      await clockInAction();
    }
  };

  const handleClockOut = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await clockOutAction(note, task);
    setNote("");
    setShowNoteModal(false);
    triggerRefresh();
  };

  const handleCancel = () => {
    setNote("");
    setShowNoteModal(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-black-500 hover:bg-purple-900 active:bg-purple-300 border-white border-2 text-white font-bold py-2 px-4 rounded"
      >
        {activeSession ? "Clock Out" : "Clock In"}
      </button>

      <NoteModal
        open={showNoteModal}
        note={note}
        setNote={setNote}
        setEntryTask={setTask}
        onSubmit={handleClockOut}
        onCancel={handleCancel}
      />
    </>
  );
}
