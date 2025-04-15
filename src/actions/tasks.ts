"use server";

import { CreateNewTask, setActiveTask, updateTask } from "@/lib/tasks";
import { Task } from "@/types/tasks";
import { AppResponse, UpdateResponse } from "@/types/generic";

export async function NewTaskActionVoid(data: FormData) {
  "use server";
  NewTaskAction(data); // discard the result
}

export async function NewTaskAction(
  prevState: {
    success: boolean;
    error?: string;
    status?: number;
    data?: unknown;
  },
  data: FormData
): Promise<{
  success: boolean;
  error?: string;
  status?: number;
  data?: unknown;
}> {
  "use server";

  if (!data.get("name"))
    return { error: "Task name is required", success: false, status: 400 };
  if (!data.get("description"))
    return {
      error: "Task description is required",
      success: false,
      status: 400,
    };

  const task = {
    name: data.get("name")?.toString() || "",
    description: data.get("description")?.toString() || "",
  } as { name: string; description: string };

  try {
    const response = await CreateNewTask(task);
    return { data: response, success: true, status: 200 };
  } catch (error) {
    console.error("Error creating task:", error);
    return { error: "Failed to create task", success: false, status: 500 };
  }
}

export async function toggleActiveTask(task: Task) {
  "use server";

  if (!task.id)
    return { error: "Task id is required", success: false, status: 400 };

  try {
    const response = await setActiveTask(task);
    return { data: response, success: true, status: 200 };
  } catch (error) {
    console.error("Error toggling task:", error);
    return { error: "Failed to toggle task", status: 500 };
  }
}

export async function updateTaskAction(data: FormData): Promise<void> {
  "use server";
  await updateTaskActionWithResult(data); // discard the result
}

export async function updateTaskActionWithResult(
  data: FormData
): Promise<AppResponse<UpdateResponse>> {
  "use server";

  if (!data.get("id"))
    return { success: false, status: 400, error: "Task id is required" };
  if (!data.get("name"))
    return { success: false, status: 400, error: "Task name is required" };

  const task = {
    id: parseInt(data.get("id")?.toString() || "0"),
    name: data.get("name")?.toString() || "",
    description: data.get("description")?.toString() || "",
  } as { id: number; name: string; description: string };

  try {
    const response = await updateTask(task);
    if (response.success) {
      return { success: true, status: 200, data: response };
    } else {
      return { success: false, status: 500, error: response.error };
    }
  } catch (error) {
    console.error("Error toggling task:", error);
    return { success: false, status: 500, error: "Failed to toggle task" };
  }
}

export async function deleteTaskAction(id: number) {
  "use server";

  if (!id) return { error: "Task id is required", success: false, status: 400 };

  const task = {
    id: parseInt(id?.toString() || "0"),
    deleted: 1,
  } as { id: number; deleted: number };

  try {
    const response = await updateTask(task);
    return { data: response, success: true, status: 200 };
  } catch (error) {
    console.error("Error toggling task:", error);
    return { error: "Failed to toggle task", status: 500 };
  }
}
