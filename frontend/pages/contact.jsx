import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Eye, EyeOff, Shield, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-forest-900 " +
    "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 " +
    "focus:border-gold-500 transition-colors"

const labelClasses =
    "block font-mono text-xs text-gray-500 uppercase tracking-wider mb-1.5"

export default function AdminLogin() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)
    const { admin, login } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (admin) navigate('/admin', { replace: true })
    }, [admin])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await login(form.email, form.password)
            toast.success('Welcome back!')
            navigate('/admin')
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid credentials')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-forest-950 flex">
            {/* Left panel */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern opacity-50" />
                <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />

                <div className="relative">
                    <Link to="/" className="flex items-center gap-2.5">
                        <div className="w-10 h-10 bg-gold-500 rounded-xl flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="font-display font-bold text-white text-lg">Klaxon Ford Agric</div>
                            <div className="font-mono text-[10px] text-gold-400 tracking-widest uppercase">Admin Portal</div>
                        </div>
                    </Link>
                </div>

                <div className="relative">
                    <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
                        Manage Your<br />
                        <span className="text-gold-400">Export Platform</span>
                    </h2>
                    <p className="font-body text-gray-400 leading-relaxed mb-8">
                        Access your admin dashboard to manage products, review feedback, and handle export inquiries.
                    </p>

                    <div className="space-y-3">
                        {['Product Management', 'Inquiry Handling', 'Feedback Moderation', 'Analytics Dashboard'].map(item => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
                                <span className="font-body text-sm text-gray-300">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative">
                    <p className="font-mono text-xs text-gray-600">
                        © {new Date().getFullYear()} Klaxon Ford Agric Ltd.
                    </p>
                </div>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2.5 mb-8">
                        <div className="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <div className="font-display font-bold text-white text-base">Klaxon Ford Agric</div>
                            <div className="font-mono text-[9px] text-gold-400 tracking-widest uppercase">Admin Portal</div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-2xl shadow-black/40">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-forest-900 rounded-xl flex items-center justify-center">
                                <Shield className="w-5 h-5 text-gold-400" />
                            </div>
                            <div>
                                <h1 className="font-display font-bold text-forest-900 text-xl">Admin Sign In</h1>
                                <p className="font-body text-gray-400 text-sm">Restricted access</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className={labelClasses}>Email Address</label>
                                <input
                                    type="email"
                                    className={inputClasses}
                                    placeholder="admin@klaxonfordagric.com"
                                    value={form.email}
                                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            <div>
                                <label className={labelClasses}>Password</label>
                                <div className="relative">
                                    <input
                                        type={showPw ? 'text' : 'password'}
                                        className={`${inputClasses} pr-12`}
                                        placeholder="••••••••"
                                        value={form.password}
                                        onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                                        required
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPw(!showPw)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-forest-900 text-white py-3.5 rounded-xl font-body font-semibold hover:bg-forest-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing In...</>
                                ) : (
                                    <><Lock className="w-4 h-4" /> Sign In</>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                            <Link to="/" className="font-body text-sm text-gray-400 hover:text-forest-900 transition-colors">
                                ← Return to Website
                            </Link>
                        </div>
                    </div>

                    <p className="text-center font-mono text-xs text-gray-600 mt-6">
                        Secure connection · Admin access only
                    </p>
                </motion.div>
            </div>
        </div>
    )
}