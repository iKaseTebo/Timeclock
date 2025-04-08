"use client";
import { useState, useEffect, Suspense } from "react";

import DailyHistoryTable from "./HistoryTables/DailyHistoryTable"
import WeeklyHistoryTable from "./HistoryTables/WeeklyHistoryTable"
import MonthlyHistoryTable from "./HistoryTables/MonthlyHistoryTable"

import { getEntriesByDay, getEntriesByWeek, getEntriesByMonth } from "../lib/entries";
// import { useEntries } from "../hooks/useEntries";

import HistoryFilters from "./HistoryFilters";
import { get } from "http";



export default function History() {

    const [filter, setFilter] = useState("Daily");
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchData() {
            setEntries([]);
            setLoading(true);
            setError(null);
        
            try {
                let data;
                switch (filter) {
                    case "Daily":
                        data = await getEntriesByDay();
                        break;
                    case "Weekly":
                        data = await getEntriesByWeek();
                        break;
                    case "Monthly":
                        data = await getEntriesByMonth();
                        break;
                    default:
                        data = await getEntriesByDay();
                        break;
                }
                console.log(`Fetched ${filter} data:`, data);  // Debugging the correct data fetch
                setEntries(data);
            } catch (err) {
                setError("Failed to fetch data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [filter]);

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
            <HistoryFilters filter={filter} setEntries={setEntries} setFilter={setFilter}/>  
            {renderTable()}

        </>
    )
}