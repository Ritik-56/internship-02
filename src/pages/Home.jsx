import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import CategoryFilter from '../components/CategoryFilter'
import SortOptions from '../components/SortOptions'
import ProductCard from '../components/ProductCard'
import LoadMore from '../components/LoadMore'
import { fetchProductsByCategory, searchProductsByName, fetchProductByBarcode } from '../services/api'

function sortProducts(products, sortKey) {
    const sorted = [...products]
    if (sortKey === 'name-asc') {
        sorted.sort((a, b) => (a.product_name || '').localeCompare(b.product_name || ''))
    } else if (sortKey === 'name-desc') {
        sorted.sort((a, b) => (b.product_name || '').localeCompare(a.product_name || ''))
    } else if (sortKey === 'grade-asc') {
        sorted.sort((a, b) => (a.nutrition_grades || 'z').localeCompare(b.nutrition_grades || 'z'))
    } else if (sortKey === 'grade-desc') {
        sorted.sort((a, b) => (b.nutrition_grades || '').localeCompare(a.nutrition_grades || ''))
    }
    return sorted
}

function Home() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [error, setError] = useState(null)
    const [category, setCategory] = useState('snacks')
    const [sortKey, setSortKey] = useState('name-asc')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [mode, setMode] = useState('category')
    const [searchTerm, setSearchTerm] = useState('')

    const loadCategoryProducts = useCallback(async (cat, pg, append = false) => {
        try {
            if (append) setLoadingMore(true)
            else setLoading(true)
            setError(null)
            const data = await fetchProductsByCategory(cat, pg)
            const fetched = data.products || []
            setProducts((prev) => append ? [...prev, ...fetched] : fetched)
            setHasMore(fetched.length > 0)
        } catch {
            setError('Failed to load products. Please try again.')
        } finally {
            setLoading(false)
            setLoadingMore(false)
        }
    }, [])

    useEffect(() => {
        setMode('category')
        setPage(1)
        loadCategoryProducts(category, 1, false)
    }, [category, loadCategoryProducts])

    const handleSearch = async (term) => {
        try {
            setLoading(true)
            setError(null)
            setMode('search')
            setSearchTerm(term)
            setPage(1)
            const data = await searchProductsByName(term, 1)
            console.log('Search data:', data)
            setProducts(data.products || [])
            setHasMore((data.products || []).length > 0)
        } catch {
            setError('Search failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleBarcodeSearch = async (barcode) => {
        try {
            setLoading(true)
            setError(null)
            const data = await fetchProductByBarcode(barcode)
            if (data.status === 1 && data.product) {
                navigate(`/product/${barcode}`)
            } else {
                setError('Product not found for that barcode.')
            }
        } catch {
            setError('Barcode lookup failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleLoadMore = async () => {
        const nextPage = page + 1
        setPage(nextPage)
        try {
            setLoadingMore(true)
            let fetched = []
            if (mode === 'category') {
                const data = await fetchProductsByCategory(category, nextPage)
                fetched = data.products || []
            } else if (mode === 'search') {
                const data = await searchProductsByName(searchTerm, nextPage)
                fetched = data.products || []
            }
            setProducts((prev) => [...prev, ...fetched])
            setHasMore(fetched.length > 0)
        } catch {
            setError('Failed to load more products.')
        } finally {
            setLoadingMore(false)
        }
    }

    const handleCategoryChange = (cat) => {
        setCategory(cat)
        setMode('category')
    }

    const sorted = sortProducts(products, sortKey)

    return (
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-1">
                    Food Product Explorer
                </h1>
                <p className="text-gray-400 text-sm">
                    Discover nutritional info for thousands of products worldwide
                </p>
            </div>

            <div className="flex flex-col gap-4 mb-8">
                <SearchBar onSearch={handleSearch} onBarcodeSearch={handleBarcodeSearch} />

                <div className="flex flex-wrap gap-3 items-center">
                    <CategoryFilter selected={category} onChange={handleCategoryChange} />
                    <SortOptions selected={sortKey} onChange={setSortKey} />
                    {mode === 'search' && (
                        <button
                            onClick={() => { setMode('category'); loadCategoryProducts(category, 1, false); setPage(1) }}
                            className="text-xs text-gray-400 hover:text-white border border-gray-700 rounded-xl px-3 py-2 transition-colors"
                        >
                            ✕ Clear search
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <div className="bg-red-950 border border-red-800 text-red-300 rounded-xl px-4 py-3 mb-6 text-sm">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl h-64 animate-pulse" />
                    ))}
                </div>
            ) : sorted.length === 0 ? (
                <div className="text-center py-24 text-gray-500">
                    <span className="text-6xl block mb-4">🔍</span>
                    <p className="text-lg">No products found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {sorted.map((product, i) => (
                        <ProductCard key={product.code || product._id || i} product={product} />
                    ))}
                </div>
            )}

            {!loading && (
                <LoadMore onClick={handleLoadMore} loading={loadingMore} hasMore={hasMore} />
            )}
        </main>
    )
}

export default Home
