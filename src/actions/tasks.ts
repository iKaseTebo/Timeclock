"use server";

import { CreateNewTask } from '@/lib/tasks';



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