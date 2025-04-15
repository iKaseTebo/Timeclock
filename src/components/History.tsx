"use client";
import { useState } from "react";
import { useClockContext } from "@/context/ClockContext";
import { useQuery } from "@tanstack/react-query";

import DailyHistoryTable from "./HistoryTables/DailyHistoryTable";
import WeeklyHistoryTable from "./HistoryTables/WeeklyHistoryTable";
import MonthlyHistoryTable from "./HistoryTables/MonthlyHistoryTable";
import HistoryFilters from "./HistoryFilters";
import { fetchEntries } from "@/util/http";

export default function History() {
  const { refreshKey } = useClockContext();
  const [filter, setFilter] = useState("Daily");

  const {
    data: entries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["entries", filter, refreshKey],
    queryFn: ({ signal }) => fetchEntries({ signal, filter }),
    staleTime: 10000,
  });

  function renderTable() {
    if (isLoading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-red-500">{error.message}</div>;

    // console.log("Rendering Table with Entries:", entries);  // Debugging the rendering process

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
      <HistoryFilters filter={filter} setFilter={setFilter} />
      {renderTable()}
    </>
  );
}
