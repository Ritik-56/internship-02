const categories = [
    { value: 'snacks', label: 'Snacks' },
    { value: 'beverages', label: 'Beverages' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'biscuits', label: 'Biscuits' },
    { value: 'chocolates', label: 'Chocolates' },
]

function CategoryFilter({ selected, onChange }) {
    return (
        <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
        >
            {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                    {cat.label}
                </option>
            ))}
        </select>
    )
}

export default CategoryFilter
