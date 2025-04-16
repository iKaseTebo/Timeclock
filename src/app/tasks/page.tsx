import { getTasksWithEntries } from "@/lib/tasks";
import TaskEntryTable from "@/components/HistoryTables/TaskEntryTable";
import TaskTable from "@/components/Tasks/TaskTable";
import TaskEdit from "@/components/Tasks/TaskEdit";

export default async function Tasks() {
  const tasks = await getTasksWithEntries();

  // console.log(tasks);
  return (
    <>
      <div className="grid md:grid-cols-12 gap-10 md:gap-5 p-5 bg-slate rounded-lg shadow-md">
        <div className="col-span-12 lg:col-span-10 border rounded-lg overflow-hidden self-start">
          <TaskTable tasks={tasks} />
        </div>
        <div className="col-span-12 lg:col-span-2 rounded-lg shadow-md">
          <TaskEdit tasks={tasks} />
        </div>
        <div className="col-span-12 lg:col-span-10 min-h-[200px]">
          <TaskEntryTable />
        </div>
      </div>
    </>
  );
}
