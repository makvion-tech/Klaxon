import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Leaf, LayoutDashboard, Package, MessageSquare, Mail,
    LogOut, Menu, X, ChevronRight, Shield
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/products', label: 'Products', icon: Package },
    { to: '/admin/feedback', label: 'Feedback', icon: MessageSquare },
    { to: '/admin/inquiries', label: 'Inquiries', icon: Mail },
]

export default function AdminLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const { admin, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        toast.success('Logged out successfully')
        navigate('/admin/login')
    }

    const Sidebar = () => (
        <div className="flex flex-col h-full bg-forest-950">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <Link to="/" className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <div className="font-display font-bold text-white text-base leading-tight">Klaxon Ford</div>
                        <div className="font-mono text-[9px] text-gold-400 tracking-widest uppercase">Admin Portal</div>
                    </div>
                </Link>
            </div>

            {/* Admin info */}
            <div className="px-4 py-4 border-b border-white/10">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <div className="w-9 h-9 bg-forest-800 rounded-lg flex items-center justify-center">
                        <Shield className="w-4 h-4 text-gold-400" />
                    </div>
                    <div className="min-w-0">
                        <p className="font-body font-medium text-white text-sm truncate">{admin?.name}</p>
                        <p className="font-mono text-xs text-gray-500 truncate">{admin?.role}</p>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-4 py-4 space-y-1">
                {navItems.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-3 rounded-xl font-body font-medium text-sm transition-all duration-200 group ${isActive
                                ? 'bg-gold-500 text-white shadow-lg shadow-gold-500/20'
                                : 'text-gray-400 hover:bg-white/8 hover:text-white'
                            }`
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        {({ isActive }) => (
                            <>
                                <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`} />
                                <span className="flex-1">{label}</span>
                                {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/10">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-body font-medium text-sm text-gray-400 hover:bg-red-500/15 hover:text-red-400 transition-all duration-200"
                >
                    <LogOut className="w-4.5 h-4.5" />
                    Sign Out
                </button>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Desktop sidebar */}
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
                <Sidebar />
            </div>

            {/* Mobile sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <motion.div
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 25 }}
                            className="lg:hidden fixed inset-y-0 left-0 z-50 w-64"
                        >
                            <Sidebar />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main */}
            <div className="flex-1 lg:pl-64">
                {/* Top bar */}
                <div className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="font-display font-semibold text-forest-900 text-xl">{title}</h1>
                            </div>
                        </div>
                        <Link
                            to="/"
                            className="font-body text-sm text-gray-500 hover:text-forest-900 transition-colors"
                        >
                            View Site →
                        </Link>
                    </div>
                </div>

                {/* Content */}
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}