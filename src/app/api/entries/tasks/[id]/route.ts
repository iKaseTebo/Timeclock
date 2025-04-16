import { getEntriesByTask } from "@/lib/entries";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  console.log("taskId", id);

  const entries = await getEntriesByTask(id);
  return Response.json(entries);
}
