import { Link } from 'react-router-dom'

const gradeColors = {
    a: 'bg-green-500',
    b: 'bg-lime-500',
    c: 'bg-yellow-500',
    d: 'bg-orange-500',
    e: 'bg-red-500',
}

function ProductCard({ product }) {
    const barcode = product.code || product._id
    const name = product.product_name || 'Unknown Product'
    const image = product.image_url || product.image_front_url || null
    const category = product.categories?.split(',')[0]?.trim() || 'Uncategorized'
    const grade = product.nutrition_grades?.toLowerCase() || null
    const ingredients = product.ingredients_text?.slice(0, 100) || null

    return (
        <Link
            to={`/product/${barcode}`}
            className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden flex flex-col hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-900/30 transition-all duration-300 group"
        >
            <div className="relative h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <span className="text-6xl opacity-30">🛒</span>
                )}
                {grade && (
                    <div className={`absolute top-3 right-3 w-9 h-9 rounded-full ${gradeColors[grade] || 'bg-gray-600'} flex items-center justify-center font-bold text-white text-sm uppercase shadow-md`}>
                        {grade}
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
                <h3 className="font-semibold text-white text-sm leading-snug line-clamp-2 group-hover:text-emerald-400 transition-colors">
                    {name}
                </h3>
                <span className="text-xs text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full w-fit truncate max-w-full">
                    {category}
                </span>
                {ingredients && (
                    <p className="text-xs text-gray-500 line-clamp-2 mt-auto">
                        {ingredients}…
                    </p>
                )}
            </div>
        </Link>
    )
}

export default ProductCard
