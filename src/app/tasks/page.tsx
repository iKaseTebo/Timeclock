import { getAllTasks } from "@/lib/tasks";
import TaskTable from "@/components/Tasks/TaskTable";
import TaskEdit from "@/components/Tasks/TaskEdit";
import TaskCard from "@/components/Tasks/TaskCard";

export default async function Tasks() {
  const tasks = await getAllTasks();

  return (
    <>
      <div className="grid md:grid-cols-12 gap-10 md:gap-5 p-5 bg-slate rounded-lg shadow-md">
        <div className="md:col-span-2">
          <TaskCard />
        </div>
        <div className="md:col-span-8 border rounded-lg overflow-hidden self-start">
          <TaskTable tasks={tasks} />
        </div>
        <div className="md:col-span-2 rounded-lg shadow-md">
          <TaskEdit tasks={tasks} />
        </div>
      </div>
    </>
  );
}
