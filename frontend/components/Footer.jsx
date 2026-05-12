import { Link } from 'react-router-dom'
import { Leaf, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowUpRight } from 'lucide-react'

const socials = [
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter/X' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
]

const products = ['Sesame Seed', 'Shea Butter', 'Cashew Nuts', 'Cocoa Beans', 'Hibiscus', 'Cassava Flour', 'Turmeric']

export default function Footer() {
    return (
        <footer className="bg-forest-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2.5 mb-6">
                            <div className="w-9 h-9 bg-gold-500 rounded-lg flex items-center justify-center">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div className="font-display font-bold text-white text-lg leading-tight">Klaxon Ford</div>
                                <div className="font-mono text-[10px] text-gold-400 tracking-widest uppercase">Agric Exports</div>
                            </div>
                        </div>
                        <p className="font-body text-gray-400 text-sm leading-relaxed mb-6">
                            West Africa's trusted agricultural export partner. Delivering premium quality commodities to global markets with integrity and precision.
                        </p>
                        <div className="flex items-center gap-3">
                            {socials.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-white transition-all duration-200"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h4 className="font-display font-semibold text-white mb-5">Our Products</h4>
                        <ul className="space-y-3">
                            {products.map(p => (
                                <li key={p}>
                                    <Link
                                        to="/products"
                                        className="font-body text-sm text-gray-400 hover:text-gold-400 transition-colors flex items-center gap-1 group"
                                    >
                                        <span>{p}</span>
                                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-display font-semibold text-white mb-5">Company</h4>
                        <ul className="space-y-3">
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/products', label: 'Products' },
                                { to: '/contact', label: 'Contact Us' },
                                { to: '/contact', label: 'Export Inquiry' },
                                { to: '/admin/login', label: 'Admin Portal' },
                            ].map(({ to, label }) => (
                                <li key={label}>
                                    <Link to={to} className="font-body text-sm text-gray-400 hover:text-gold-400 transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-display font-semibold text-white mb-5">Get In Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 shrink-0" />
                                <span className="font-body text-sm text-gray-400">
                                    Plot 14, Agric Export Hub,<br />Victoria Island, Lagos, Nigeria
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                                <a href="tel:+2348012345678" className="font-body text-sm text-gray-400 hover:text-gold-400 transition-colors">
                                    +234 801 234 5678
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                                <a href="mailto:exports@klaxonfordagric.com" className="font-body text-sm text-gray-400 hover:text-gold-400 transition-colors">
                                    exports@klaxonfordagric.com
                                </a>
                            </li>
                        </ul>
                        <div className="mt-6 p-3 bg-forest-900 rounded-lg border border-white/10">
                            <p className="font-mono text-xs text-gold-400 mb-1">Export Certifications</p>
                            <p className="font-body text-xs text-gray-400">NAFDAC • NEPC • SON • ISO 9001:2015</p>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
                    <p className="font-body text-xs text-gray-500">
                        © {new Date().getFullYear()} Klaxon Ford Agric Ltd. All rights reserved.
                    </p>
                    <p className="font-mono text-xs text-gray-600">
                        Made with precision · For global markets
                    </p>
                </div>
            </div>
        </footer>
    )
}