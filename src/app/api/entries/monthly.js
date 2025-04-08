import { getEntriesByMonth } from "../../../lib/entries";

export default async function handler(req, res) {
    try {
        const data = await getEntriesByMonth();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error || "Failed to fetch monthly entries" });
    }
}