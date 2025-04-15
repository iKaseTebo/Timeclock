import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchEntries({
  signal,
  filter,
}: {
  signal?: AbortSignal;
  filter: string;
}) {
  const url = "http://localhost:3000/api/entries/" + filter.toLowerCase();

  const res = await fetch(url, { signal });

  if (!res.ok) {
    const error = new Error(`Failed to load ${filter} data`) as Error & {
      code?: number;
      info?: unknown;
    };
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const data = await res.json();

  if (data.length === 0) {
    throw new Error("No data returned");
  }

  return data;
}
