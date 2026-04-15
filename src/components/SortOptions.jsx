const sortOptions = [
    { value: 'name-asc', label: 'Name A → Z' },
    { value: 'name-desc', label: 'Name Z → A' },
    { value: 'grade-asc', label: 'Grade Best First' },
    { value: 'grade-desc', label: 'Grade Worst First' },
]

function SortOptions({ selected, onChange }) {
    return (
        <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
        >
            {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>
            ))}
        </select>
    )
}

export default SortOptions
