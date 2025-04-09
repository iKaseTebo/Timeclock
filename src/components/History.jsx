"use client";
import { useState, useEffect, Suspense } from "react";
import { useClockContext } from "@/context/ClockContext";
import DailyHistoryTable from "./HistoryTables/DailyHistoryTable"
import WeeklyHistoryTable from "./HistoryTables/WeeklyHistoryTable"
import MonthlyHistoryTable from "./HistoryTables/MonthlyHistoryTable"

import { getEntriesByDay, getEntriesByWeek, getEntriesByMonth } from "../lib/entries";
// import { useEntries } from "../hooks/useEntries";

import HistoryFilters from "./HistoryFilters";
import { get } from "http";



export default function History() {
    const { refreshKey } = useClockContext();
    const [filter, setFilter] = useState("Daily");
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchEntries = async (filter) => {
        setLoading(true);
        setError(null);
        try {
            filter = filter.toLowerCase();
            const res = await fetch(`/api/entries/${filter}`);
            if (!res.ok) throw new Error(`Failed to load ${filter} data`);
            const data = await res.json();

            if ( data.length === 0) {
                throw new Error("No data returned");
            }

            setEntries(data);
        } catch (err) {
            console.error("Error fetching entries:", err);
            setError(err.message || "An error occurred while fetching entries.");
            setEntries([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchEntries(filter);
    }, [filter, refreshKey]);

    function renderTable() {
        if (loading) return <div className="text-white">Loading...</div>;
        if (error) return <div className="text-red-500">{error}</div>;

        console.log("Rendering Table with Entries:", entries);  // Debugging the rendering process

        switch (filter) {
            case "Daily":
                return <DailyHistoryTable entries={entries} />;
            case "Weekly":
                return <WeeklyHistoryTable entries={entries} />;
            case "Monthly":
                return <MonthlyHistoryTable entries={entries} />;
            default:
                return <DailyHistoryTable entries={entries} />;
        }
    }
    

    return (
        <>
            <HistoryFilters filter={filter} setEntries={setEntries} setFilter={setFilter} />  
            {renderTable()}

        </>
    )
}