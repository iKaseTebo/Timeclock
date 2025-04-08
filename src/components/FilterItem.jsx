
export default function FilterItem({ filter, activeFilter, setFilter, setEntries }) {
    function handleClick () {
        setFilter(filter);
        setEntries([]); // Reset entries when changing filter
    }
    return (
        <li key={`filter-${filter}`} onClick={handleClick} className={`cursor-pointer hover:text-purple-900 active:text-purple-300 ${activeFilter === filter ? 'text-purple-900' : 'text-gray-200'}`}>
            {filter}
        </li>
    );
}