import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductByBarcode } from '../services/api'

const gradeColors = {
    a: 'bg-green-500',
    b: 'bg-lime-500',
    c: 'bg-yellow-500',
    d: 'bg-orange-500',
    e: 'bg-red-500',
}

function NutrientRow({ label, value, unit }) {
    if (!value && value !== 0) return null
    return (
        <div className="flex justify-between items-center py-2.5 border-b border-gray-800 text-sm">
            <span className="text-gray-400">{label}</span>
            <span className="text-white font-medium">{Number(value).toFixed(1)} {unit}</span>
        </div>
    )
}

function ProductDetails() {
    const { barcode } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await fetchProductByBarcode(barcode)
                if (data.status === 1 && data.product) {
                    setProduct(data.product)
                } else {
                    setError('Product not found.')
                }
            } catch {
                setError('Failed to load product details.')
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [barcode])

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 animate-pulse">
                <div className="h-6 bg-gray-800 rounded w-32 mb-8" />
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="h-80 bg-gray-800 rounded-2xl" />
                    <div className="space-y-4">
                        <div className="h-8 bg-gray-800 rounded w-3/4" />
                        <div className="h-4 bg-gray-800 rounded w-1/2" />
                        <div className="h-4 bg-gray-800 rounded w-2/3" />
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                <span className="text-6xl block mb-4">⚠️</span>
                <p className="text-red-400 mb-6">{error}</p>
                <Link to="/" className="text-emerald-400 hover:underline text-sm">← Back to Home</Link>
            </div>
        )
    }

    const name = product.product_name || 'Unknown Product'
    const image = product.image_url || product.image_front_url || null
    const grade = product.nutrition_grades?.toLowerCase()
    const n = product.nutriments || {}
    const labels = product.labels?.split(',').map(l => l.trim()).filter(Boolean) || []
    const categories = product.categories?.split(',').map(c => c.trim()).filter(Boolean) || []
    const ingredients = product.ingredients_text || null

    return (
        <main className="max-w-4xl mx-auto px-4 py-8">
            <Link to="/" className="inline-flex items-center gap-1 text-gray-400 hover:text-emerald-400 text-sm mb-8 transition-colors">
                ← Back to products
            </Link>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-center h-80">
                    {image ? (
                        <img src={image} alt={name} className="max-h-full max-w-full object-contain" />
                    ) : (
                        <span className="text-8xl opacity-30">🛒</span>
                    )}
                </div>

                <div className="flex flex-col gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white leading-tight mb-2">{name}</h1>
                        {grade && (
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">Nutri-Score</span>
                                <div className={`w-9 h-9 rounded-full ${gradeColors[grade] || 'bg-gray-600'} flex items-center justify-center font-bold text-white uppercase text-sm`}>
                                    {grade}
                                </div>
                            </div>
                        )}
                    </div>

                    {categories.length > 0 && (
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Categories</p>
                            <div className="flex flex-wrap gap-1.5">
                                {categories.slice(0, 5).map((cat) => (
                                    <span key={cat} className="text-xs bg-emerald-950 text-emerald-400 px-2 py-1 rounded-full">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {labels.length > 0 && (
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Labels</p>
                            <div className="flex flex-wrap gap-1.5">
                                {labels.map((label) => (
                                    <span key={label} className="text-xs bg-blue-950 text-blue-400 px-2 py-1 rounded-full">
                                        {label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="text-xs text-gray-600 mt-auto">
                        Barcode: <span className="text-gray-400 font-mono">{barcode}</span>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
                {ingredients && (
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                        <h2 className="font-semibold text-white mb-3">Ingredients</h2>
                        <p className="text-gray-400 text-sm leading-relaxed">{ingredients}</p>
                    </div>
                )}

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
                    <h2 className="font-semibold text-white mb-3">Nutritional Values <span className="text-xs text-gray-500 font-normal">(per 100g)</span></h2>
                    <NutrientRow label="Energy" value={n.energy_value || n['energy-kcal_100g']} unit="kcal" />
                    <NutrientRow label="Fat" value={n.fat_100g} unit="g" />
                    <NutrientRow label="Saturated Fat" value={n['saturated-fat_100g']} unit="g" />
                    <NutrientRow label="Carbohydrates" value={n.carbohydrates_100g} unit="g" />
                    <NutrientRow label="Sugars" value={n.sugars_100g} unit="g" />
                    <NutrientRow label="Fiber" value={n.fiber_100g} unit="g" />
                    <NutrientRow label="Proteins" value={n.proteins_100g} unit="g" />
                    <NutrientRow label="Salt" value={n.salt_100g} unit="g" />
                    {Object.keys(n).length === 0 && (
                        <p className="text-gray-600 text-sm py-2">No nutritional data available.</p>
                    )}
                </div>
            </div>
        </main>
    )
}

export default ProductDetails
