import { getEntriesByWeek } from "@/lib/entries";

export async function GET() {
  const entries = await getEntriesByWeek();
  return Response.json(entries);
}