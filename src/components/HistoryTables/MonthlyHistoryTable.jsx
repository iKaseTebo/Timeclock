"use client";
import { Fragment, useState } from "react";
import { hoursFormatter, calculateTotalHours } from "../../util/formatting";

export default function MonthlyHistoryTable({ entries }) {
    const [expandedMonth, setExpandedMonth] = useState('');
    const [expandedWeek, setExpandedWeek] = useState('');
    const [expandedDay, setExpandedDay] = useState('');

    const toggle = (stateSetter, current, value) => {
        stateSetter(current === value ? null : value);
    };

    console.log(entries);
    
    return (
        <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full text-white border border-white">
                <thead>
                    <tr>
                        <th className="px-4 py-2 border border-white">Month</th>
                        <th className="px-4 py-2 border border-white">Month Start</th>
                        <th className="px-4 py-2 border border-white">Total Hours</th>
                        <th className="px-4 py-2 border border-white">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entries?.map((month) => (
                        <Fragment key={month.month}>
                            <tr className=" hover:bg-zinc-800">
                                <td className="px-4 border border-white text-gray-200">{month.month}</td>
                                <td className="px-4 py-2 border border-white text-gray-200">{month.month_start}</td>
                                <td className="px-4 py-2 border border-white text-gray-200">{hoursFormatter(month.month_total_hours)}</td>
                                <td className="text-center px-4 py-2 border border-white text-gray-200">
                                    <button 
                                        onClick={() => toggle(setExpandedMonth, expandedMonth, month.month)}
                                        className={`border-2 font-bold py-2 px-4 rounded ${
                                            expandedMonth === month.month
                                                ? "bg-purple-900 hover:bg-zinc-400"
                                                : "bg-black-500 hover:bg-purple-900"
                                        } text-gray-200 border-gray-200`}
                                    >
                                        {expandedMonth === month.month ? "Hide" : "View"}
                                    </button>
                                </td>
                            </tr>

                            {expandedMonth === month.month && (
                                <>
                                    <tr className="bg-zinc-800 font-semibold">
                                        <th colSpan="2" className="px-4 py-2">Week</th>
                                        <th className="px-4 py-2">Total Hours</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                    {month.weekly_sessions.map((week) => (
                                        <Fragment key={week.week}>
                                            <tr className="bg-zinc-800">
                                                <td colSpan="2" className="text-center px-4 py-2 border border-white text-gray-200">{week.week} (Start: {week.week_start})</td>
                                                <td className="px-4 py-2 border border-white text-gray-200">{hoursFormatter(week.week_total_hours)}</td>
                                                <td className="text-center px-4 py-2 border border-white text-gray-200">
                                                    <button 
                                                        onClick={() => toggle(setExpandedWeek, expandedWeek, week.week)}
                                                        className={`border-2 font-bold py-2 px-4 rounded ${
                                                            expandedWeek === week.week
                                                                ? "bg-purple-900 hover:bg-zinc-400"
                                                                : "bg-black-500 hover:bg-purple-900"
                                                        } text-gray-200 border-gray-200`}
                                                    >
                                                        {expandedWeek === week.week ? "Hide" : "View"}
                                                    </button>
                                                </td>
                                            </tr>

                                            {expandedWeek === week.week && (
                                                <>
                                                    <tr className="bg-zinc-700 font-medium">
                                                        <th colSpan="2" className="px-4 py-2">Date</th>
                                                        <th className="px-4 py-2">Total Time</th>
                                                        <th className="px-4 py-2">Actions</th>
                                                    </tr>
                                                    {week.daily_sessions.map((day) => (
                                                        <Fragment key={day.day}>
                                                            <tr className="bg-zinc-700">
                                                                <td colSpan="2" className="text-center px-4 py-2 border border-white text-gray-200">{day.day}</td>
                                                                <td className="px-4 py-2 border border-white text-gray-200">{hoursFormatter(day.total_hours)}</td>
                                                                <td className="text-center px-4 py-2 border border-white text-gray-200">
                                                                    <button 
                                                                        onClick={() => toggle(setExpandedDay, expandedDay, day.day)}
                                                                        className={`border-2 font-bold py-2 px-4 rounded ${
                                                                            expandedDay === day.day
                                                                                ? "bg-purple-900 hover:bg-zinc-400"
                                                                                : "bg-black-500 hover:bg-purple-900"
                                                                        } text-gray-200 border-gray-200`}
                                                                    >
                                                                        {expandedDay === day.day ? "Hide" : "View"}
                                                                    </button>
                                                                </td>
                                                            </tr>

                                                            {expandedDay === day.day && (
                                                                <>
                                                                    <tr className="bg-purple-950 text-white font-semibold">
                                                                        <th>Check In</th>
                                                                        <th>Check Out</th>
                                                                        <th>Total Hours</th>
                                                                        <th>Note</th>
                                                                    </tr>
                                                                    {day.sessions.map((session) => (
                                                                        <tr key={session.id} className="bg-purple-800 text-center shadow-inner hover:bg-purple-700 text-center">
                                                                            <td className="px-4 py-2 border border-white text-gray-200">
                                                                                {new Date(session.check_in).toLocaleTimeString()}
                                                                            </td>
                                                                            <td className="px-4 py-2 border border-white text-gray-200">
                                                                                {new Date(session.check_out).toLocaleTimeString()}
                                                                            </td>
                                                                            <td className="px-4 py-2 border border-white text-gray-200">
                                                                                {calculateTotalHours(session.check_in, session.check_out)}
                                                                            </td>
                                                                            <td className="px-4 py-2 border border-white text-gray-200">{session.note}</td>
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
                                </>
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}