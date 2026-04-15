import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-emerald-400 tracking-tight">
                    <span className="text-3xl">🍎</span>
                    <span>FoodExplorer</span>
                </Link>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                    <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
                    <span className="text-gray-700">|</span>
                    <span className="text-gray-500">Powered by OpenFoodFacts</span>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
