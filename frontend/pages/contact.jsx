import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import api from '../src/utils/api'

const inputClasses =
    "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-forest-900 " +
    "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 " +
    "focus:border-gold-500 transition-colors"

const labelClasses =
    "block font-mono text-xs text-gray-500 uppercase tracking-wider mb-1.5"

const contactDetails = [
    { icon: MapPin, label: 'Address', value: 'Lagos, Nigeria' },
    { icon: Phone, label: 'Phone', value: '+234 000 000 0000' },
    { icon: Mail, label: 'Email', value: 'info@klaxonfordagric.com' },
]

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(p => ({ ...p, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/inquiries', form)
            toast.success('Your inquiry has been sent!')
            setForm({ name: '', email: '', company: '', message: '' })
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative bg-forest-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern opacity-50" />
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl" />

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative max-w-4xl mx-auto text-center"
                >
                    <div className="font-mono text-xs text-gold-400 tracking-widest uppercase mb-4">
                        Get In Touch
                    </div>
                    <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                        Let's Talk <span className="text-gold-400">Export</span>
                    </h1>
                    <p className="font-body text-gray-400 max-w-xl mx-auto leading-relaxed">
                        Have a question about our products or want to place an export inquiry?
                        Reach out and our team will get back to you shortly.
                    </p>
                </motion.div>
            </section>

            {/* Body */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-5 gap-10">
                    {/* Contact info */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="lg:col-span-2 space-y-4"
                    >
                        {contactDetails.map(({ icon: Icon, label, value }) => (
                            <div
                                key={label}
                                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-gold-500/40 transition-colors"
                            >
                                <div className="w-10 h-10 shrink-0 bg-forest-900 rounded-xl flex items-center justify-center">
                                    <Icon className="w-5 h-5 text-gold-400" />
                                </div>
                                <div>
                                    <div className={labelClasses}>{label}</div>
                                    <div className="font-body text-forest-900 font-medium">{value}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="lg:col-span-3 bg-white rounded-2xl p-8 shadow-xl shadow-black/5 border border-gray-100"
                    >
                        <h2 className="font-display font-bold text-forest-900 text-xl mb-6">
                            Export Inquiry Form
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div>
                                    <label className={labelClasses}>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={inputClasses}
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={inputClasses}
                                        placeholder="john@company.com"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClasses}>Company (optional)</label>
                                <input
                                    type="text"
                                    name="company"
                                    className={inputClasses}
                                    placeholder="Your company name"
                                    value={form.company}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className={labelClasses}>Message</label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    className={`${inputClasses} resize-none`}
                                    placeholder="Tell us about your export needs..."
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto bg-forest-900 text-white px-8 py-3.5 rounded-xl font-body font-semibold hover:bg-forest-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                                ) : (
                                    <><Send className="w-4 h-4" /> Send Inquiry</>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}