"use client";
import { clockIn, clockOut } from "../lib/entries";
import { useState } from "react";
import NoteModal from "./NoteModal";

export default function ClockInButton({ activeSession }) {
    const [ showNoteModal, setShowNoteModal ] = useState(false);
    const [ note, setNote ] = useState("");

    const handleClick = async () => {
        if (activeSession) {
            setShowNoteModal(true);
        } else {
            clockIn();
        }
    }

    const handleClockOut  = async (e) => {
        e.preventDefault()
        await clockOut(note);
        setNote("");
        setShowNoteModal(false);
    };

    const handleCancel = () => {
        setNote("");
        setShowNoteModal(false);
    };

    return (
        <>
            <button onClick={handleClick} className="bg-black-500 hover:bg-purple-900 active:bg-purple-300 border-white border-2 text-white font-bold py-2 px-4 rounded">
                { activeSession ? "Clock Out" :  "Clock In" }
            </button>

            <NoteModal
                open={showNoteModal}
                note={note}
                setNote={setNote}
                onSubmit={handleClockOut}
                onCancel={handleCancel}
            />
        </>   
    );
}