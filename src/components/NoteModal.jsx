"use client";
import Modal from "./Modal";

export default function NoteModal({ open, note, setNote, onSubmit, onCancel }) {
    return (
        <Modal open={open} onClose={onCancel}>
            <form onSubmit={onSubmit} className="space-y-4 p-4">
                <h2 className="text-lg font-semibold text-white">Add a note before clocking out</h2>
                <textarea
                    className="w-full h-24 p-2 rounded-md border border-white text-white"
                    placeholder="Optional note..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
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