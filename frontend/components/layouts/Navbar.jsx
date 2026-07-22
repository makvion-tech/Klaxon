import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Leaf } from 'lucide-react'

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => setOpen(false), [location])

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-18 py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 bg-forest-900 rounded-lg flex items-center justify-center group-hover:bg-forest-800 transition-colors">
                            <Leaf className="w-5 h-5 text-gold-400" />
                        </div>
                        <div>
                            <div className={`font-display font-bold text-lg leading-tight transition-colors ${scrolled ? 'text-forest-900' : 'text-white'}`}>
                                Klaxon Ford
                            </div>
                            <div className="font-mono text-[10px] text-gold-400 tracking-widest uppercase">Agric Exports</div>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                end={link.to === '/'}
                                className={({ isActive }) =>
                                    `font-body font-medium text-sm transition-colors relative group ${
                                        isActive
                                            ? scrolled ? 'text-forest-900' : 'text-white'
                                            : scrolled ? 'text-gray-600 hover:text-forest-900' : 'text-gray-200 hover:text-white'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.label}
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-gold-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                                    </>
                                )}
                            </NavLink>
                        ))}
                        <Link
                            to="/contact"
                            className={`text-sm font-medium px-5 py-2.5 rounded-lg transition-colors ${
                                scrolled
                                    ? 'bg-forest-900 text-white hover:bg-forest-800'
                                    : 'bg-white text-forest-900 hover:bg-gold-400'
                            }`}
                        >
                            Export Inquiry
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setOpen(!open)}
                        className={`md:hidden p-2 rounded-lg transition-colors ${
                            scrolled
                                ? 'text-forest-900 hover:bg-forest-900/10'
                                : 'text-white hover:bg-white/10'
                        }`}
                    >
                        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="md:hidden bg-white border-t border-gray-100"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map(link => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    end={link.to === '/'}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-lg font-body font-medium text-sm transition-colors ${isActive ? 'bg-forest-900 text-white' : 'text-gray-700 hover:bg-forest-900/10'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                            <Link
                                to="/contact"
                                className="block bg-gold-500 text-white px-4 py-3 rounded-lg font-medium text-sm text-center mt-2"
                            >
                                Export Inquiry
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}