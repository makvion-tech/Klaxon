import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    ArrowRight, Globe, Shield, Truck, Award, ChevronDown,
    Star, TrendingUp, Users, Package
} from 'lucide-react'

import ProductCard from '../components/ui/ProductCard'
import { ProductSkeleton } from '../components/ui/Skeleton'
import api from '../src/utils/api'
import Navbar from '../components/layouts/Navbar'
import Footer from '../components/layouts/Footer'

const fadeUp = {
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' },
}

const stats = [
    { value: '15+', label: 'Years Experience', icon: Award },
    { value: '40+', label: 'Countries Served', icon: Globe },
    { value: '500+', label: 'Export Partners', icon: Users },
    { value: '50K+', label: 'Metric Tons Exported', icon: TrendingUp },
]

const features = [
    {
        icon: Shield,
        title: 'Quality Certified',
        desc: 'All products meet international standards with NAFDAC, NEPC, and ISO certifications.',
    },
    {
        icon: Globe,
        title: 'Global Reach',
        desc: 'Serving buyers in Europe, Asia, North America, and the Middle East.',
    },
    {
        icon: Truck,
        title: 'Reliable Logistics',
        desc: 'End-to-end export logistics with full documentation and shipment tracking.',
    },
    {
        icon: Package,
        title: 'Custom Packaging',
        desc: 'Flexible packaging solutions tailored to your market requirements.',
    },
]

export default function Home() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.get('/products?featured=true&limit=6')
            .then(res => {
                const data = res?.data?.data ?? res?.data ?? []
                setProducts(Array.isArray(data) ? data : [])
            })
            .catch(err => {
                console.error(err)
                setProducts([])
            })
            .finally(() => setLoading(false))
    }, [])
    return (
        <div className="min-h-screen">
            <Navbar />

            {/* HERO */}
            <section className="relative min-h-screen flex items-center overflow-hidden bg-forest-950">
                {/* Background pattern */}
                <div className="absolute inset-0 bg-hero-pattern opacity-100" />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800" />
                {/* Gold accent blob */}
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/8 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-forest-700/20 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-36">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gold-500/15 border border-gold-500/30 rounded-full mb-6"
                            >
                                <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
                                <span className="font-mono text-xs text-gold-400 tracking-widest uppercase">
                                    Premium Agric Exports · Est. 2008
                                </span>
                            </motion.div>

                            <motion.h1
                                {...fadeUp}
                                transition={{ duration: 0.7, delay: 0.1 }}
                                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
                            >
                                Africa's Finest{' '}
                                <span className="text-gold-400">Agricultural</span>{' '}
                                Exports
                            </motion.h1>

                            <motion.p
                                {...fadeUp}
                                transition={{ duration: 0.6, delay: 0.25 }}
                                className="font-body text-gray-300 text-lg leading-relaxed mb-10 max-w-lg"
                            >
                                Connecting West African premium commodities to global markets. From sun-drenched farmlands to your facility — quality guaranteed at every step.
                            </motion.p>

                            <motion.div
                                {...fadeUp}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex flex-wrap gap-4"
                            >
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-2 bg-gold-500 text-white px-7 py-4 rounded-xl font-body font-semibold hover:bg-gold-600 transition-all duration-200 hover:shadow-xl hover:shadow-gold-500/25 hover:-translate-y-0.5"
                                >
                                    Explore Products
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-4 rounded-xl font-body font-semibold hover:bg-white/10 transition-all duration-200"
                                >
                                    Export Inquiry
                                </Link>
                            </motion.div>

                            {/* Trust badges */}
                            <motion.div
                                {...fadeUp}
                                transition={{ duration: 0.6, delay: 0.55 }}
                                className="mt-12 flex items-center gap-6 flex-wrap"
                            >
                                {['NAFDAC Certified', 'NEPC Registered', 'ISO 9001:2015'].map(badge => (
                                    <div key={badge} className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-gold-400" />
                                        <span className="font-mono text-xs text-gray-400">{badge}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Right - Stats grid */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="hidden lg:grid grid-cols-2 gap-4"
                        >
                            {stats.map(({ value, label, icon: Icon }, i) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                    className="bg-white/8 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/12 transition-colors"
                                >
                                    <div className="w-10 h-10 bg-gold-500/20 rounded-xl flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5 text-gold-400" />
                                    </div>
                                    <div className="font-display font-bold text-3xl text-white mb-1">{value}</div>
                                    <div className="font-body text-sm text-gray-400">{label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
                >
                    <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                </motion.div>
            </section>

            {/* STATS - mobile */}
            <section className="lg:hidden bg-forest-900 py-12">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 gap-4">
                    {stats.map(({ value, label, icon: Icon }) => (
                        <div key={label} className="text-center p-4">
                            <div className="font-display font-bold text-3xl text-white mb-1">{value}</div>
                            <div className="font-body text-sm text-gray-400">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURES */}
            <section className="py-24 bg-ivory-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="section-tag mb-4">Why Choose Us</span>
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-forest-900 mt-4 mb-4">
                            Built for Global Trade
                        </h2>
                        <p className="font-body text-gray-500 text-lg max-w-2xl mx-auto">
                            We combine deep agricultural expertise with modern export infrastructure to deliver consistent quality at scale.
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map(({ icon: Icon, title, desc }, i) => (
                            <motion.div
                                key={title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-forest-900/20 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-forest-900 rounded-xl flex items-center justify-center mb-5 group-hover:bg-gold-500 transition-colors duration-300">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="font-display font-semibold text-forest-900 text-lg mb-2">{title}</h3>
                                <p className="font-body text-gray-500 text-sm leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED PRODUCTS */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                        <div>
                            <span className="section-tag mb-4">Our Catalogue</span>
                            <h2 className="font-display text-4xl font-bold text-forest-900 mt-4">
                                Featured Products
                            </h2>
                        </div>
                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 font-body font-medium text-forest-900 hover:text-gold-600 transition-colors group"
                        >
                            View All Products
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-forest-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />
                <div className="relative max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
                            Ready to Source Premium{' '}
                            <span className="text-gold-400">African Commodities?</span>
                        </h2>
                        <p className="font-body text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                            Connect with our export specialists today. We handle everything from farm sourcing to port delivery.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Link
                                to="/contact"
                                className="inline-flex items-center gap-2 bg-gold-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gold-600 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-500/25"
                            >
                                Start Your Inquiry
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all"
                            >
                                Browse Catalogue
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    )
}