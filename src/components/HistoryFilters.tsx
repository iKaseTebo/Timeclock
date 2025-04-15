import FilterItem from "./FilterItem";

export default function HistoryFilters({
  filter,
  setFilter,
}: {
  filter: string;
  setFilter: (filter: string) => void;
}) {
  return (
    <div className="flex justify-between mb-5">
      <h2 className="text-lg font-bold text-gray-200">{filter}</h2>
      <div>
        <ul className="flex space-x-4 text-gray-200">
          {["Daily", "Weekly", "Monthly"].map((item) => (
            <FilterItem
              key={item}
              filter={item}
              activeFilter={filter}
              setFilter={setFilter}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
