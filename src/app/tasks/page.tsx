import { getTasksWithEntries } from "@/lib/tasks";
import TaskTable from "@/components/Tasks/TaskTable";
import TaskEdit from "@/components/Tasks/TaskEdit";
// import TaskCard from "@/components/Tasks/TaskCard";

export default async function Tasks() {
  const tasks = await getTasksWithEntries();

  return (
    <>
      <div className="grid md:grid-cols-12 gap-10 md:gap-5 p-5 bg-slate rounded-lg shadow-md">
        <div className="col-span-12 lg:col-span-10 border rounded-lg overflow-hidden self-start">
          <TaskTable tasks={tasks} />
        </div>
        <div className="col-span-12 lg:col-span-2 rounded-lg shadow-md">
          <TaskEdit tasks={tasks} />
        </div>
        <div className="lg:col-start-3  col-span-12 lg:col-span-8 min-h-[200px] bg-amber-400"></div>
      </div>
    </>
  );
}
