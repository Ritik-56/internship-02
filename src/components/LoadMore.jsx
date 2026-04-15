function LoadMore({ onClick, loading, hasMore }) {
    if (!hasMore) return null

    return (
        <div className="flex justify-center mt-10">
            <button
                onClick={onClick}
                disabled={loading}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-semibold text-sm transition-all duration-200 flex items-center gap-2"
            >
                {loading ? (
                    <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Loading…
                    </>
                ) : (
                    'Load More Products'
                )}
            </button>
        </div>
    )
}

export default LoadMore
