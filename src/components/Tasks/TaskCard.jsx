import { NewTaskAction } from "@/actions/tasks"
import { getAllTasks } from "@/lib/tasks"
export default async function TaskCard() {
    const tasks = await getAllTasks(); // Fetch all tasks from the database or API
    // console.log(tasks);

    return (
            <div className="p-4 border rounded-lg shadow-md flex:sm flex-col">
                <h2 className="text-2xl mb-4">Tasks</h2>
                <form action={NewTaskAction} >
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium ">Task Name</label>
                        <input type="text" id="name" name="name" className="mt-1 p-3 block w-full border-white border text-white rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="Enter task here..." />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="description" className="block text-sm font-medium ">Description</label>
                        <textarea id="description" name="description" className="w-full h-24 p-2 rounded-md border border-white text-white" placeholder="Enter task here..." />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button type="submit" className="bg-black-500 hover:bg-purple-900 active:bg-purple-300 border-white border-2 text-white font-bold py-2 px-4 rounded">New Task</button>
                    </div>
                </form>
            </div>
    )
}