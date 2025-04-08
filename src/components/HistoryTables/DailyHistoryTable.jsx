"use client"
import { Fragment } from "react";
import { useState } from "react";
import { hoursFormatter, calculateTotalHours } from "../../util/formatting";

export default function DailyHistoryTable({ entries }) {
    const [expandedRow, setExpandedRow] = useState('');

    const toggleExpandedRow = (key) => {
        setExpandedRow(key === expandedRow ? null : key);
    }

    // console.log(entries);
    
    return (
        <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full text-white border border-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-white">Date</th>
                        <th className="px-4 py-2 border border-white">Times Clocked In</th>
                        <th className="px-4 py-2 border border-white">Total Time</th>
                        <th className="px-4 py-2 border border-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                     {entries?.map((day) => (
                        <Fragment key={day.day}>
                        <tr key={`day${day.day}`} className="hover:bg-zinc-800">
                            <td className="px-4 border border-white text-gray-200">{day.day}</td>
                            <td className="px-4 py-2 border border-white text-gray-200">{day.total_entries}</td>
                            <td className="px-4 py-2 border border-white text-gray-200">{hoursFormatter(day.total_hours)}</td>
                            <td className="px-4 py-2 border border-white text-gray-200 text-center">
                            {expandedRow === day.day && (
                                <button onClick={() => toggleExpandedRow(day.day)} className="bg-purple-900 hover:bg-zinc-400 active:bg-purple-300 border-gray-200 border-2 text-gray-200 font-bold py-2 px-4 rounded">
                                {expandedRow === day.day ? "Hide" : "View"}
                                </button>
                            )}
                            {expandedRow !== day.day && (
                                <button onClick={() => toggleExpandedRow(day.day)} className="bg-black-500 hover:bg-purple-900 active:bg-purple-300 border-gray-200 border-2 text-gray-200 font-bold py-2 px-4 rounded">
                                View
                                </button>
                            )}
                            </td>
                        </tr>
                        {expandedRow === day.day && (
                            <>
                                <tr key={`header-${day.day}`} className="bg-zinc-800">
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>Total Hours</th>
                                    <th>Note</th>
                                </tr>
                                {day.sessions.map((session) => (
                                    <tr className="bg-zinc-800" key={session.id}>
                                        <td className="px-4 py-2 border border-white text-gray-200">{new Date(session.check_in).toLocaleTimeString()}</td>
                                        <td className="px-4 py-2 border border-white text-gray-200">{new Date(session.check_out).toLocaleTimeString()}</td>
                                        <td className="px-4 py-2 border border-white text-gray-200">{ calculateTotalHours(session.check_in, session.check_out)}</td>
                                        <td className="px-4 py-2 border border-white text-gray-200">{session.note}</td>
                                    </tr>
                                ))}
                            </>
                        )}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}