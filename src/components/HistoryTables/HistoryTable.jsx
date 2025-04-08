import { useEffect } from "react";

export default function HistoryTable({filter}) {

    let TableHead = <thead>
        <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Distance</th>
            <th className="px-4 py-2">Calories</th>
        </tr>
    </thead>;

    if ( filter === 'Daily') {
        
        TableHead = <thead>
            <tr>
                <th className="px-4 py-2 border border-white">Date</th>
                <th className="px-4 py-2 border border-white">Times Clocked In</th>
                <th className="px-4 py-2 border border-white">Total Time</th>
                <th className="px-4 py-2 border border-white">Actions</th>
            </tr>
        </thead>
    } else if ( filter === 'Weekly') {
        TableHead = <thead>
            <tr>
                <th className="px-4 py-2 border border-white">Week</th>
                <th className="px-4 py-2 border border-white">Week Start Date</th>
                <th className="px-4 py-2 border border-white">Days Worked</th>
                <th className="px-4 py-2 border border-white">Total Hours</th>
                <th className="px-4 py-2 border border-white">Actions</th>
            </tr>
        </thead>
    } else if (filter === 'Monthly') {
        TableHead = <thead>
            <tr>
                <th className="px-4 py-2 border border-white">Month</th>
                <th className="px-4 py-2 border border-white">Total Hours</th>
                <th className="px-4 py-2 border border-white">Actions</th>
            </tr>
        </thead>
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full text-white border border-white">
                {TableHead}
                <tbody>
                    {/* Map through entries and render rows */}
                </tbody>
            </table>
        </div>
    )
}