"use client";
import { useQuery } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { fetchTaskEntries } from "@/util/http";
import { hoursFormatter, calculateTotalHours } from "../../util/formatting";
import { EntryWithTask, Entry } from "@/types/entries";
import { useSearchParams } from "next/navigation";

export default function TaskEntryTable() {
  const [expandedRow, setExpandedRow] = useState("");
  const searchParams = useSearchParams();
  const taskId = Number(searchParams.get("view"));

  const {
    data: entries = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", taskId],
    queryFn: ({ signal }) => fetchTaskEntries({ signal, taskId }),
    enabled: !!taskId,
    staleTime: 10000,
  });

  if (!taskId) return null;
  if (entries.length === 0)
    return <div className="text-center text-white">No entries</div>;
  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error.message}</div>;

  console.log("entries", entries);

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="min-w-full text-white border border-white">
        <thead>
          <tr className="bg-zinc-800">
            <th>Check In</th>
            <th>Check Out</th>
            <th>Total Hours</th>
            <th>Task</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {entries?.map((entry: EntryWithTask) => (
            <Fragment key={entry.id}>
              <tr className="bg-zinc-800" key={entry.id}>
                <td className="px-4 py-2 border border-white text-gray-200">
                  {new Date(entry.check_in).toLocaleTimeString()}
                </td>
                <td className="px-4 py-2 border border-white text-gray-200">
                  {new Date(entry.check_out).toLocaleTimeString()}
                </td>
                <td className="px-4 py-2 border border-white text-gray-200">
                  {calculateTotalHours(entry.check_in, entry.check_out)}
                </td>
                <td className="px-4 py-2 border border-white text-gray-200">
                  {entry.task_name}
                </td>
                <td className="px-4 py-2 border border-white text-gray-200">
                  {entry.note}
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
