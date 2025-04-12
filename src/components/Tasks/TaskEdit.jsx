"use client";
import { useEffect, useState } from "react";
import ActiveTaskToggle from "../ActiveTaskToggle";
import { useSearchParams } from "next/navigation";
import { updateTaskAction } from "@/actions/tasks";
import SubmitButton from "../UI/SubmitButton";

export default function TaskEdit({ tasks }) {
    const [task, setTask] = useState(null);
    
    const searchParams = useSearchParams();
    const id = searchParams.get("edit");
    
    useEffect(() => {
        const foundTask = tasks.find((task) => task.id === parseInt(id));
        setTask(foundTask);
    }, [id, tasks]);

    if (!task) {
        return <div className="text-white text-center">Select a Task to Edit</div>;
    }

    return (
        <div className="flex md:min-h-[400px] flex-col p-4 gap-4 border rounded-lg shadow-md">
            <h2 className="text-3xl text-white">Edit Task</h2>
            <form action={updateTaskAction} className="flex flex-col gap-4 rounded-lg shadow-lg">
                <div className="flex flex-col">
                <input type="hidden" id="id" name='id' value={task.id}  />
                <label htmlFor="name" className="text-white mb-1 font-semibold">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, name: e.target.value })}
                    className="rounded-md border border-white  text-white p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                </div>

                <div className="flex flex-col">
                <label htmlFor="description" className="text-white mb-1 font-semibold">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={task.description}
                    onChange={(e) => setTask({ ...task, description: e.target.value })}
                    className="rounded-md border border-white text-white p-2 h-28 resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                </div>

                <div className="flex justify-between gap-2">
                    <div>
                        <label htmlFor={`active-${task.id}`} className="text-white mb-1 font-semibold">Active : </label>
                        <ActiveTaskToggle id={`active-${task.id}`} name={`active-${task.id}`} task={task} />
                    </div>
                    <SubmitButton text="Save" />
                </div>
            </form>
        </div>
    )
}