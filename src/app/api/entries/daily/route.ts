import { getEntriesByDay } from "@/lib/entries";

export async function GET() {
  const entries = await getEntriesByDay();
  return Response.json(entries);
}