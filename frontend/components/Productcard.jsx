import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Package, ArrowUpRight, MapPin } from 'lucide-react'

const StarRating = ({ rating, size = 'sm' }) => {
    const s = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
                <Star
                    key={i}
                    className={`${s} ${i <= rating ? 'text-gold-500 fill-gold-500' : 'text-gray-200 fill-gray-200'}`}
                />
            ))}
        </div>
    )
}

export default function ProductCard({ product, index = 0 }) {
    const { name, slug, description, origin, imageUrl, category, avgRating, _count, isFeatured, isAvailable, minOrder, grade } = product

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="group"
        >
            <Link to={`/products/${slug}`} className="block">
                <div className="card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                    {/* Image */}
                    <div className="relative overflow-hidden h-52">
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt={name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-forest-900 to-forest-700 flex items-center justify-center">
                                <Package className="w-16 h-16 text-forest-600" />
                            </div>
                        )}
                        {/* Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        <div className="absolute top-3 left-3 flex gap-2">
                            {isFeatured && (
                                <span className="px-2 py-1 bg-gold-500 text-white text-xs font-mono font-medium rounded-md">
                                    Featured
                                </span>
                            )}
                            {!isAvailable && (
                                <span className="px-2 py-1 bg-red-500 text-white text-xs font-mono font-medium rounded-md">
                                    Unavailable
                                </span>
                            )}
                        </div>
                        <div className="absolute top-3 right-3">
                            <span className="px-2 py-1 bg-white/90 text-forest-900 text-xs font-mono font-medium rounded-md">
                                {category?.name}
                            </span>
                        </div>
                        {/* Hover arrow */}
                        <div className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                            <ArrowUpRight className="w-4 h-4 text-forest-900" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                        <h3 className="font-display font-semibold text-forest-900 text-lg mb-2 line-clamp-1 group-hover:text-forest-700 transition-colors">
                            {name}
                        </h3>
                        <p className="font-body text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                            {description}
                        </p>

                        {/* Meta */}
                        <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <MapPin className="w-3.5 h-3.5 text-forest-700" />
                                <span className="font-body">{origin}</span>
                            </div>
                            {grade && (
                                <div className="flex items-center gap-1.5">
                                    <span className="font-mono text-xs text-forest-800 bg-forest-900/8 px-2 py-0.5 rounded">
                                        {grade}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                                <StarRating rating={Math.round(avgRating || 0)} />
                                <span className="font-mono text-xs text-gray-400">
                                    ({_count?.feedbacks || 0})
                                </span>
                            </div>
                            {minOrder && (
                                <div className="text-right">
                                    <div className="font-mono text-xs text-gray-400">Min. Order</div>
                                    <div className="font-body font-semibold text-forest-900 text-sm">{minOrder}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export { StarRating }