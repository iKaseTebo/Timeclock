import { getEntriesByMonth } from "@/lib/entries";

export async function GET() {
  const entries = await getEntriesByMonth();
  return Response.json(entries);
}