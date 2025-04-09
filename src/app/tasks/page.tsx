import { getAllTasks } from "@/lib/tasks"

export default async function Tasks() {
    const tasks = await getAllTasks();
    console.log(tasks);

    return (<>
        <div>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className="flex gap-2 mb-2">
                        <span className="text-gray-500">{task.id}</span>
                        <span className="text-gray-700">{task.name}</span>
                        <span className="text-gray-400">{task.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    </>)
}