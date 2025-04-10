"use server";

import { CreateNewTask, setActiveTask } from '@/lib/tasks';



export async function NewTaskAction(data: FormData) {
    "use server";

    if (!data.get("name")) return {error: "Task name is required", success:false, status: 400 };
    if (!data.get("description")) return {error: "Task description is required", success:false, status: 400 };

    const task = {
        name: data.get("name")?.toString() || "",
        description: data.get("description")?.toString() || "" 
    } as { name: string; description: string };

    try {
        const response = await CreateNewTask(task);
        return {data: response, success: true, status: 200};
    } catch (error) {
        console.error("Error creating task:", error);
        return {error: "Failed to create task", status: 500};
    }

}

export async function toggleActiveTask(task: {id: number; active: number}) {
    "use server";

    if (!task.id) return {error: "Task id is required", success:false, status: 400 };

    try {
        const response = await setActiveTask(task);
        return {data: response, success: true, status: 200};
    } catch (error) {
        console.error("Error toggling task:", error);
        return {error: "Failed to toggle task", status: 500};
    }

}