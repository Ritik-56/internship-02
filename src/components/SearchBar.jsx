import { useState } from 'react'

function SearchBar({ onSearch, onBarcodeSearch }) {
    const [name, setName] = useState('')
    const [barcode, setBarcode] = useState('')

    const handleNameSubmit = (e) => {
        e.preventDefault()
        if (name.trim()) onSearch(name.trim())
    }

    const handleBarcodeSubmit = (e) => {
        e.preventDefault()
        if (barcode.trim()) onBarcodeSearch(barcode.trim())
    }

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleNameSubmit} className="flex flex-1 gap-2">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Search by product name…"
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
                >
                    Search
                </button>
            </form>

            <form onSubmit={handleBarcodeSubmit} className="flex flex-1 gap-2">
                <input
                    type="text"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    placeholder="Search by barcode…"
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap"
                >
                    Barcode
                </button>
            </form>
        </div>
    )
}

export default SearchBar
