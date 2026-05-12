import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, MapPin, Package, Shield, ChevronLeft, Send, CheckCircle } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { StarRating } from '../components/ui/ProductCard'
import { PageLoader } from '../components/ui/Skeleton'
import api from '../utils/api'
import toast from 'react-hot-toast'

const specs = [
    { key: 'origin', label: 'Origin' },
    { key: 'grade', label: 'Grade' },
    { key: 'purity', label: 'Purity' },
    { key: 'moisture', label: 'Moisture' },
    { key: 'minOrder', label: 'Min. Order' },
    { key: 'packaging', label: 'Packaging' },
    { key: 'unit', label: 'Unit' },
]

export default function ProductDetail() {
    const { slug } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [feedbackForm, setFeedbackForm] = useState({ name: '', email: '', rating: 5, comment: '' })
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', company: '', country: '', quantity: '', message: '' })
    const [sendingInquiry, setSendingInquiry] = useState(false)

    useEffect(() => {
        api.get(`/products/${slug}`)
            .then(res => setProduct(res.data.data))
            .catch(() => toast.error('Product not found'))
            .finally(() => setLoading(false))
    }, [slug])

    const submitFeedback = async (e) => {
        e.preventDefault()
        if (!feedbackForm.comment.trim()) return toast.error('Please add a comment')
        setSubmitting(true)
        try {
            await api.post('/feedback', { ...feedbackForm, productId: product.id })
            setSubmitted(true)
            toast.success('Feedback submitted! It will be reviewed shortly.')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit feedback')
        } finally {
            setSubmitting(false)
        }
    }

    const submitInquiry = async (e) => {
        e.preventDefault()
        setSendingInquiry(true)
        try {
            await api.post('/inquiries', { ...inquiryForm, productId: product.id })
            toast.success('Inquiry sent! Our team will contact you within 24 hours.')
            setInquiryForm({ name: '', email: '', company: '', country: '', quantity: '', message: '' })
        } catch (err) {
            toast.error('Failed to send inquiry. Please try again.')
        } finally {
            setSendingInquiry(false)
        }
    }

    if (loading) return <PageLoader />
    if (!product) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h2 className="font-display text-2xl text-gray-600 mb-4">Product not found</h2>
                <Link to="/products" className="btn-primary">Back to Products</Link>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-ivory-100">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 font-body text-sm text-gray-500">
                    <Link to="/" className="hover:text-forest-900 transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/products" className="hover:text-forest-900 transition-colors">Products</Link>
                    <span>/</span>
                    <span className="text-forest-900 font-medium">{product.name}</span>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="rounded-2xl overflow-hidden bg-white shadow-sm aspect-[4/3]">
                            {product.imageUrl ? (
                                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-forest-900 to-forest-700 flex items-center justify-center">
                                    <Package className="w-20 h-20 text-forest-600" />
                                </div>
                            )}
                        </div>
                        <div className="absolute top-4 left-4 flex gap-2">
                            {product.isFeatured && (
                                <span className="px-3 py-1 bg-gold-500 text-white text-xs font-mono font-medium rounded-lg">Featured</span>
                            )}
                            <span className="px-3 py-1 bg-forest-900 text-white text-xs font-mono font-medium rounded-lg">
                                {product.category?.name}
                            </span>
                        </div>
                    </motion.div>

                    {/* Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <StarRating rating={Math.round(product.avgRating || 0)} size="md" />
                            <span className="font-body text-sm text-gray-500">
                                {product.avgRating?.toFixed(1)} ({product.feedbacks?.length} reviews)
                            </span>
                        </div>

                        <h1 className="font-display text-3xl sm:text-4xl font-bold text-forest-900 mb-4">{product.name}</h1>

                        <div className="flex items-center gap-2 mb-6">
                            <MapPin className="w-4 h-4 text-gold-600" />
                            <span className="font-body text-gray-600">{product.origin}</span>
                        </div>

                        <p className="font-body text-gray-600 leading-relaxed mb-8">{product.description}</p>

                        {/* Specs table */}
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-8">
                            <div className="px-5 py-3 bg-forest-900">
                                <h3 className="font-display font-semibold text-white text-sm">Product Specifications</h3>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {specs.filter(s => product[s.key]).map(({ key, label }) => (
                                    <div key={key} className="flex items-center px-5 py-3">
                                        <span className="font-body text-xs text-gray-400 w-28 shrink-0">{label}</span>
                                        <span className="font-body font-medium text-forest-900 text-sm">{product[key]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                to="/contact"
                                className="flex-1 text-center btn-primary inline-block py-4"
                            >
                                Request Quote
                            </Link>
                            <a
                                href="mailto:exports@klaxonfordagric.com"
                                className="flex-1 text-center btn-outline inline-block py-4"
                            >
                                Email Directly
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Feedback */}
                    <div>
                        <h2 className="font-display text-2xl font-bold text-forest-900 mb-6">
                            Customer Reviews
                            {product.feedbacks?.length > 0 && (
                                <span className="ml-2 font-body text-base font-normal text-gray-400">({product.feedbacks.length})</span>
                            )}
                        </h2>

                        {product.feedbacks?.length > 0 ? (
                            <div className="space-y-4 mb-8">
                                {product.feedbacks.map(fb => (
                                    <div key={fb.id} className="bg-white rounded-xl p-5 border border-gray-100">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <p className="font-body font-semibold text-forest-900">{fb.name}</p>
                                                <p className="font-mono text-xs text-gray-400">{new Date(fb.createdAt).toLocaleDateString()}</p>
                                            </div>
                                            <StarRating rating={fb.rating} />
                                        </div>
                                        <p className="font-body text-gray-600 text-sm leading-relaxed">{fb.comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl p-8 border border-gray-100 text-center mb-8">
                                <Star className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                                <p className="font-body text-gray-400">No reviews yet. Be the first!</p>
                            </div>
                        )}

                        {/* Feedback form */}
                        {!submitted ? (
                            <div className="bg-white rounded-2xl border border-gray-100 p-6">
                                <h3 className="font-display font-semibold text-forest-900 text-lg mb-4">Leave a Review</h3>
                                <form onSubmit={submitFeedback} className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="label">Your Name</label>
                                            <input
                                                className="input"
                                                placeholder="John Smith"
                                                value={feedbackForm.name}
                                                onChange={e => setFeedbackForm(p => ({ ...p, name: e.target.value }))}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="label">Email</label>
                                            <input
                                                type="email"
                                                className="input"
                                                placeholder="john@company.com"
                                                value={feedbackForm.email}
                                                onChange={e => setFeedbackForm(p => ({ ...p, email: e.target.value }))}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map(r => (
                                                <button
                                                    key={r}
                                                    type="button"
                                                    onClick={() => setFeedbackForm(p => ({ ...p, rating: r }))}
                                                >
                                                    <Star
                                                        className={`w-7 h-7 transition-colors ${r <= feedbackForm.rating ? 'text-gold-500 fill-gold-500' : 'text-gray-300'}`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="label">Comment</label>
                                        <textarea
                                            className="input resize-none"
                                            rows={3}
                                            placeholder="Share your experience with this product..."
                                            value={feedbackForm.comment}
                                            onChange={e => setFeedbackForm(p => ({ ...p, comment: e.target.value }))}
                                            required
                                        />
                                    </div>
                                    <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2">
                                        {submitting ? 'Submitting...' : <><Send className="w-4 h-4" /> Submit Review</>}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="bg-forest-900/5 border border-forest-900/20 rounded-2xl p-8 text-center">
                                <CheckCircle className="w-10 h-10 text-forest-900 mx-auto mb-3" />
                                <h3 className="font-display font-semibold text-forest-900 text-lg mb-2">Thank you!</h3>
                                <p className="font-body text-gray-500 text-sm">Your review has been submitted and will be published after approval.</p>
                            </div>
                        )}
                    </div>

                    {/* Inquiry form */}
                    <div>
                        <h2 className="font-display text-2xl font-bold text-forest-900 mb-6">Request a Quote</h2>
                        <div className="bg-white rounded-2xl border border-gray-100 p-6">
                            <form onSubmit={submitInquiry} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">Full Name *</label>
                                        <input className="input" placeholder="John Smith" value={inquiryForm.name}
                                            onChange={e => setInquiryForm(p => ({ ...p, name: e.target.value }))} required />
                                    </div>
                                    <div>
                                        <label className="label">Email *</label>
                                        <input type="email" className="input" placeholder="john@company.com" value={inquiryForm.email}
                                            onChange={e => setInquiryForm(p => ({ ...p, email: e.target.value }))} required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="label">Company</label>
                                        <input className="input" placeholder="Acme Corp" value={inquiryForm.company}
                                            onChange={e => setInquiryForm(p => ({ ...p, company: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label className="label">Country *</label>
                                        <input className="input" placeholder="Germany" value={inquiryForm.country}
                                            onChange={e => setInquiryForm(p => ({ ...p, country: e.target.value }))} required />
                                    </div>
                                </div>
                                <div>
                                    <label className="label">Required Quantity</label>
                                    <input className="input" placeholder="e.g. 50 MT per month" value={inquiryForm.quantity}
                                        onChange={e => setInquiryForm(p => ({ ...p, quantity: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="label">Message *</label>
                                    <textarea className="input resize-none" rows={4} placeholder="Describe your requirements, delivery terms, certifications needed..."
                                        value={inquiryForm.message}
                                        onChange={e => setInquiryForm(p => ({ ...p, message: e.target.value }))} required />
                                </div>
                                <button type="submit" disabled={sendingInquiry} className="btn-gold w-full flex items-center justify-center gap-2 py-4">
                                    {sendingInquiry ? 'Sending...' : <><Send className="w-4 h-4" /> Send Inquiry</>}
                                </button>
                                <p className="font-body text-xs text-gray-400 text-center">
                                    <Shield className="w-3 h-3 inline mr-1" />
                                    Your information is secure and will not be shared with third parties.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}