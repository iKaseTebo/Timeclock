import { useQuery } from "@tanstack/react-query";

const fetchEntries = async (type) => {
    const response = await fetch(`/api/entries/${type}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return response.json();
};

export const useEntries = (type) => {
    return useQuery({
        queryKey: ["entries", type],
        queryFn: () => fetchEntries(type),
        refetchInterval: 1000,  // Optional: Keep data fresh
    });
};