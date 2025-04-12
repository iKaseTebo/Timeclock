import ActiveTaskToggle from "@/components/ActiveTaskToggle"
import DeleteTask from "@/components/Tasks/DeleteTask"
import Link from "next/link"

export default function TaskTable({ tasks }) {
    return (
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
                        <Link href={`?edit=${task.id}`} className="hover:text-purple-800 cursor-pointer">Edit</Link>
                        <span> - </span>
                        <DeleteTask id={task.id} />
                    </td>
                </tr>
            ))}
            </tbody>
            
        </table>
    )
}