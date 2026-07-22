import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight
} from "lucide-react"
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
// frontend/src/components/SocialLinks.jsx
const socials = [
  {
    href: "https://facebook.com/klaxonford",
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com/klaxonford",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.256 1.216.6 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.363-.415 2.428-.465C8.944 2.01 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.976.045-1.505.207-1.858.344-.466.181-.8.399-1.15.748-.35.35-.566.684-.747 1.15-.137.353-.3.882-.344 1.857-.05 1.054-.06 1.37-.06 4.04s.01 2.987.06 4.04c.045.976.207 1.505.344 1.858.181.466.399.8.748 1.15.35.35.684.566 1.15.747.353.137.882.3 1.857.344 1.054.05 1.37.06 4.04.06s2.987-.01 4.04-.06c.976-.045 1.505-.207 1.858-.344.466-.181.8-.397 1.15-.747.35-.35.566-.684.747-1.15.137-.353.3-.882.344-1.857.05-1.054.06-1.37.06-4.04s-.01-2.987-.06-4.04c-.045-.976-.207-1.505-.344-1.858a3.09 3.09 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.747c-.352-.137-.881-.3-1.857-.344-1.053-.05-1.37-.06-4.04-.06zM12 6.865a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 1.802a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666zm6.538-1.987a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
      </svg>
    ),
  },
  {
    href: "https://linkedin.com/company/klaxonford",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
      </svg>
    ),
  },
]

export default function SocialLinks() {
  return (
    <div className="flex space-x-4 mt-4 text-green-700">
      {socials.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="hover:text-green-900 transition-colors"
        >
          {icon}
        </a>
      ))}
    </div>
  )
}

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
                            <img
                                src="/logo.jpeg"
                                alt="Klaxon Ford Resources"
                                className="w-9 h-9 rounded-lg object-cover"
                            />
                            <div>
                                <div className="font-display font-bold text-white text-lg leading-tight">Klaxon Ford</div>
                                <div className="font-mono text-[10px] text-gold-400 tracking-widest uppercase">Resources</div>
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
                        © {new Date().getFullYear()} Klaxon Ford Resources Ltd. All rights reserved.
                    </p>
                    <p className="font-mono text-xs text-gray-600">
                        Made with precision · For global markets
                    </p>
                </div>
            </div>
        </footer>
    )
}