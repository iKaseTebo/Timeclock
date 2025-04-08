import { getEntriesByDay } from "../../../lib/entries";

export default async function handler(req, res) {
    try {
        const data = await getEntriesByDay();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error || "Failed to fetch daily entries" });
    }
}