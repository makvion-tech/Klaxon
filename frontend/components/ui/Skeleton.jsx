export const ProductSkeleton = () => (
    <div className="card animate-pulse">
        <div className="h-52 shimmer" />
        <div className="p-5 space-y-3">
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-100 rounded w-full" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
            <div className="pt-4 border-t border-gray-100 flex justify-between">
                <div className="h-4 bg-gray-100 rounded w-24" />
                <div className="h-4 bg-gray-100 rounded w-16" />
            </div>
        </div>
    </div>
)

export const StatSkeleton = () => (
    <div className="card p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
            <div className="h-10 w-10 bg-gray-200 rounded-xl" />
            <div className="h-4 bg-gray-100 rounded w-16" />
        </div>
        <div className="h-8 bg-gray-200 rounded w-20 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-32" />
    </div>
)

export const PageLoader = () => (
    <div className="min-h-screen bg-ivory-100 flex items-center justify-center">
        <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 border-4 border-forest-200 rounded-full" />
                <div className="absolute inset-0 border-4 border-forest-900 border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="font-body text-gray-500 text-sm">Loading...</p>
        </div>
    </div>
)

export default ProductSkeleton