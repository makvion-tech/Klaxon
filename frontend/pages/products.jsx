import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, X, ChevronDown } from 'lucide-react'

import ProductCard from '../components/ui/ProductCard'
import { ProductSkeleton } from '../components/ui/Skeleton'
import api from '../src/utils/api'
import Navbar from '../components/layouts/Navbar'
import Footer from '../components/layouts/Footer'

export default function Products() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({})

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const params = new URLSearchParams({ page, limit: 12 })
            if (search) params.set('search', search)
            if (selectedCategory) params.set('category', selectedCategory)
            const res = await api.get(`/products?${params}`)
            setProducts(res.data.data)
            setPagination(res.data.pagination)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        api.get('/categories').then(res => setCategories(res.data.data))
    }, [])

    useEffect(() => {
        fetchProducts()
    }, [page, selectedCategory])

    const handleSearch = (e) => {
        e.preventDefault()
        setPage(1)
        fetchProducts()
    }

    return (
        <div className="min-h-screen bg-ivory-100">
            <Navbar />

            {/* Header */}
            <section className="bg-forest-950 pt-28 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl"
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/15 border border-gold-500/30 rounded-full font-mono text-xs text-gold-400 tracking-widest uppercase mb-4">
                            Our Catalogue
                        </span>
                        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
                            Premium Agricultural Products
                        </h1>
                        <p className="font-body text-gray-300 text-lg">
                            Explore our full range of export-ready agricultural commodities sourced from certified Nigerian farmlands.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter bar */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 font-body text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 focus:border-transparent"
                                />
                                {search && (
                                    <button type="button" onClick={() => { setSearch(''); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                            <button type="submit" className="bg-forest-900 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-forest-800 transition-colors">
                                Search
                            </button>
                        </form>

                        {/* Category filter */}
                        <div className="relative">
                            <select
                                value={selectedCategory}
                                onChange={e => { setSelectedCategory(e.target.value); setPage(1) }}
                                className="appearance-none pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 font-body text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-forest-600 bg-white cursor-pointer"
                            >
                                <option value="">All Categories</option>
                                {categories.map(c => (
                                    <option key={c.id} value={c.slug}>{c.name}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Active filters */}
                    {(search || selectedCategory) && (
                        <div className="flex items-center gap-2 mt-3">
                            <span className="font-body text-xs text-gray-400">Filters:</span>
                            {selectedCategory && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-forest-900/10 text-forest-900 rounded-full text-xs font-medium">
                                    {categories.find(c => c.slug === selectedCategory)?.name}
                                    <button onClick={() => { setSelectedCategory(''); setPage(1) }}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}
                            {search && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-forest-900/10 text-forest-900 rounded-full text-xs font-medium">
                                    "{search}"
                                    <button onClick={() => { setSearch(''); fetchProducts() }}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Products grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {loading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-24">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="font-display text-xl font-semibold text-gray-600 mb-2">No products found</h3>
                        <p className="font-body text-gray-400">Try adjusting your search or filters.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <p className="font-body text-sm text-gray-500">
                                Showing <span className="font-semibold text-gray-700">{products.length}</span> of{' '}
                                <span className="font-semibold text-gray-700">{pagination.total}</span> products
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                        </div>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-4 py-2 rounded-lg border border-gray-200 font-body text-sm text-gray-600 hover:bg-white hover:border-forest-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                {[...Array(pagination.pages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setPage(i + 1)}
                                        className={`w-10 h-10 rounded-lg font-body text-sm font-medium transition-colors ${page === i + 1
                                                ? 'bg-forest-900 text-white'
                                                : 'border border-gray-200 text-gray-600 hover:bg-white hover:border-forest-900'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                                    disabled={page === pagination.pages}
                                    className="px-4 py-2 rounded-lg border border-gray-200 font-body text-sm text-gray-600 hover:bg-white hover:border-forest-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            <Footer />
        </div>
    )
}