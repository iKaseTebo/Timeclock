import { getActiveTasks } from "@/lib/tasks";

export async function GET() {
  const tasks = await getActiveTasks();
  return Response.json(tasks);
}