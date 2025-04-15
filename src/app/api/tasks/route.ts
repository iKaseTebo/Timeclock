import { getAllTasks } from "@/lib/tasks";

export async function GET() {
  const tasks = await getAllTasks();
  return Response.json(tasks);
}
