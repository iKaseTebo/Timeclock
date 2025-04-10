import { getAllTasks } from "@/lib/tasks"
import ActiveTaskToggle from "@/components/ActiveTaskToggle"

export default async function Tasks() {
    const tasks = await getAllTasks();
    // console.log(tasks);
    return (<>
        <div className="flex gap-5 p-5 bg-slate rounded-lg shadow-md">
            <div className="flex-1 border rounded-lg overflow-hidden ">
                <table className="min-w-full text-white border border-white">
                    <thead>
                        <tr >
                            <th className="px-4 py-2 border border-white">ID</th>
                            <th className="px-4 py-2 border border-white">Name</th>
                            <th className="px-4 py-2 border border-white">Description</th>
                            <th className="px-4 py-2 border border-white">Active</th>
                            <th className="px-4 py-2 border border-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {tasks?.map((task) => (
                        <tr key={task.id} >
                            <td className="px-4 border border-white text-gray-200">{task.id}</td>
                            <td className="px-4 border border-white text-gray-200">{task.name}</td>
                            <td className="px-4 border border-white text-gray-200">{task.description}</td>
                            <td className="px-4 border border-white text-gray-200 text-center">
                                <ActiveTaskToggle task={task} />
                            </td>
                            <td className="flex gap-2 px-4 py-2 border border-white text-gray-200 justify-center">
                                <span className="hover:text-purple-800 cursor-pointer">Edit</span>
                                <span> - </span>
                                <span className="text-red-800">Delete</span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    
                </table>
            </div>
            <div className="flex-2 bg-amber-700">

            </div>
        </div>
    </>)
}