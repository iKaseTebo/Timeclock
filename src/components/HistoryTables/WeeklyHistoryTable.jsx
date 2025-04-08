import { Fragment } from "react";
import { useState } from "react";
import { hoursFormatter, calculateTotalHours } from "../../util/formatting";
    
export default function WeeklyHistoryTable({ entries }) {
    const [expandedWeek, setExpandedWeek] = useState('');
    const [expandedDay, setExpandedDay] = useState('');

    const toggleExpandedWeek = (key) => {
        setExpandedWeek(key === expandedWeek ? null : key);
    }

    const toggleExpandedDay = (key) => {
        setExpandedDay(key === expandedDay ? null : key);
    }
    
    // console.log(entries)

    return (
        <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full text-white border border-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-white">Week</th>
                        <th className="px-4 py-2 border border-white">Week Start Date</th>
                        <th className="px-4 py-2 border border-white">Days Worked</th>
                        <th className="px-4 py-2 border border-white">Total Hours</th>
                        <th className="px-4 py-2 border border-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entries?.map((week) => (
                        <Fragment key={week.week}>
                        <tr key={`week-${week.week}`} className="hover:bg-zinc-800">
                            <td className="px-4 border border-white text-gray-200">{week.week}</td>
                            <td className="px-4 py-2 border border-white text-gray-200">{week.week_start}</td>
                            <td className="px-4 py-2 border border-white text-gray-200">{week.daily_sessions.length}</td>
                            <td className="px-4 py-2 border border-white text-gray-200">{hoursFormatter(week.week_total_hours)}</td>
                            <td className="px-4 py-2 border border-white text-gray-200 text-center">
                            {expandedWeek === week.week && (
                                <button onClick={() => toggleExpandedWeek(week.week)} className="bg-purple-900 hover:bg-zinc-400 active:bg-purple-300 border-gray-200 border-2 text-gray-200 font-bold py-2 px-4 rounded">
                                    Hide
                                </button>
                            )}
                            {expandedWeek !== week.week && (
                                <button onClick={() => toggleExpandedWeek(week.week)} className="bg-black-500 hover:bg-purple-900 active:bg-purple-300 border-gray-200 border-2 text-gray-200 font-bold py-2 px-4 rounded">
                                    View
                                </button>
                            )}
                            </td>
                        </tr>
                        {expandedWeek === week.week && (
                            <>
                                <tr className="bg-zinc-800">
                                    <th colSpan="2" className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Times Clocked In</th>
                                    <th className="px-4 py-2">Total Time</th>
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                                {week.daily_sessions.map((dailySessions) => (
                                    <Fragment key={dailySessions.day}>
                                        <tr className="bg-zinc-800">
                                            <td colSpan="2" className="text-center px-4 py-2 border border-white text-gray-200">{dailySessions.day}</td>
                                            <td className="px-4 py-2 border border-white text-gray-200">{dailySessions.total_entries}</td>
                                            <td className="px-4 py-2 border border-white text-gray-200">{hoursFormatter(dailySessions.total_hours)}</td>
                                            <td className="text-center px-4 py-2 border border-white text-gray-200">
                                                {expandedDay === String(dailySessions.day) ? (
                                                    <button 
                                                        onClick={() => toggleExpandedDay(String(dailySessions.day))} 
                                                        className="bg-purple-900 hover:bg-zinc-400 active:bg-purple-300 border-gray-200 border-2 text-gray-200 font-bold py-2 px-4 rounded"
                                                    >
                                                        Hide
                                                    </button>
                                                ) : (
                                                    <button 
                                                        onClick={() => toggleExpandedDay(String(dailySessions.day))} 
                                                        className="bg-black-500 hover:bg-purple-900 active:bg-purple-300 border-gray-200 border-2 text-gray-200 font-bold py-2 px-4 rounded"
                                                    >
                                                        View
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                        {expandedDay === String(dailySessions.day) && (
                                            <>
                                                <tr className="bg-purple-900">
                                                    <th>Check In</th>
                                                    <th>Check Out</th>
                                                    <th>Total Hours</th>
                                                    <th colSpan="2">Note</th>
                                                </tr>
                                                {dailySessions.sessions.map((session) => (
                                                    <tr className="bg-purple-900 text-center" key={session.id}>
                                                        <td className="px-4 py-2 border border-white text-gray-200">
                                                            {new Date(session.check_in).toLocaleTimeString()}
                                                        </td>
                                                        <td className="px-4 py-2 border border-white text-gray-200">
                                                            {new Date(session.check_out).toLocaleTimeString()}
                                                        </td>
                                                        <td className="px-4 py-2 border border-white text-gray-200">
                                                            {calculateTotalHours(session.check_in, session.check_out)}
                                                        </td>
                                                        <td colSpan="2" className="px-4 py-2 border border-white text-gray-200">
                                                            {session.note}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </>
                                        )}
                                    </Fragment>
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