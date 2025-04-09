import FilterItem from "./FilterItem";

export default function HistoryFilters({ filter, setFilter, setEntries }) {

    return (
        <div className="flex justify-between mb-5">
            <h2 className="text-lg font-bold text-gray-200">{filter}</h2>
            <div>
                <ul className="flex space-x-4 text-gray-200">
                    {['Daily', 'Weekly', 'Monthly'].map((item) => (
                        <FilterItem key={item} filter={item} activeFilter={filter} setFilter={setFilter} setEntries={setEntries} fetchEntries/>
                    ))}
                </ul>
            </div>
        </div>
    )
}