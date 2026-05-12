import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import api from '../utils/api'
import toast from 'react-hot-toast'

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Plot 14, Agric Export Hub, Victoria Island, Lagos, Nigeria' },
  { icon: Phone, label: 'Phone', value: '+234 801 234 5678', href: 'tel:+2348012345678' },
  { icon: Mail, label: 'Email', value: 'exports@klaxonfordagric.com', href: 'mailto:exports@klaxonfordagric.com' },
  { icon: Clock, label: 'Office Hours', value: 'Mon – Fri: 8am – 6pm WAT' },
]

const socials = [
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', country: '', quantity: '', message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.post('/inquiries', form)
      setSubmitted(true)
      toast.success('Inquiry received! We\'ll contact you within 24 hours.')
    } catch (err) {
      toast.error('Failed to submit. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const update = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }))

  return (
    <div className="min-h-screen bg-ivory-100">
      <Navbar />

      {/* Header */}
      <section className="bg-forest-950 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/15 border border-gold-500/30 rounded-full font-mono text-xs text-gold-400 tracking-widest uppercase mb-4">
              Get In Touch
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Start Your Export Inquiry
            </h1>
            <p className="font-body text-gray-300 text-lg">
              Our export specialists are ready to help you source premium agricultural commodities from West Africa.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left info */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-2xl font-bold text-forest-900 mb-6">Contact Information</h2>
            <div className="space-y-5 mb-8">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-forest-900 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gold-400" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="font-body text-forest-900 font-medium hover:text-gold-600 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-forest-900 font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="mb-8">
              <p className="font-display font-semibold text-forest-900 mb-4">Follow Us</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 bg-forest-900 rounded-xl flex items-center justify-center text-white hover:bg-gold-500 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-forest-900 rounded-2xl p-5">
              <p className="font-mono text-xs text-gold-400 tracking-widest uppercase mb-3">Our Certifications</p>
              <div className="grid grid-cols-2 gap-2">
                {['NAFDAC', 'NEPC', 'SON', 'ISO 9001', 'ORGANIC', 'HALAL'].map(cert => (
                  <div key={cert} className="bg-white/10 rounded-lg px-3 py-2 text-center">
                    <span className="font-mono text-xs text-white font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-gray-100 p-16 text-center"
              >
                <div className="w-16 h-16 bg-forest-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-gold-400" />
                </div>
                <h2 className="font-display text-2xl font-bold text-forest-900 mb-3">Inquiry Received!</h2>
                <p className="font-body text-gray-500 mb-6 max-w-md mx-auto">
                  Thank you for contacting Klaxon Ford Agric. Our export team will review your inquiry and respond within 24 business hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', company: '', country: '', quantity: '', message: '' }) }}
                  className="btn-primary"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <h2 className="font-display text-2xl font-bold text-forest-900 mb-2">Export Inquiry Form</h2>
                <p className="font-body text-gray-400 text-sm mb-8">
                  Fill in your details and we'll prepare a custom export proposal for you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Full Name *</label>
                      <input className="input" placeholder="John Smith" value={form.name} onChange={update('name')} required />
                    </div>
                    <div>
                      <label className="label">Email Address *</label>
                      <input type="email" className="input" placeholder="john@company.com" value={form.email} onChange={update('email')} required />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Phone Number</label>
                      <input className="input" placeholder="+1 234 567 8900" value={form.phone} onChange={update('phone')} />
                    </div>
                    <div>
                      <label className="label">Company Name</label>
                      <input className="input" placeholder="Acme Trading Ltd." value={form.company} onChange={update('company')} />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Country *</label>
                      <input className="input" placeholder="Germany" value={form.country} onChange={update('country')} required />
                    </div>
                    <div>
                      <label className="label">Required Quantity</label>
                      <input className="input" placeholder="e.g. 100 MT/month" value={form.quantity} onChange={update('quantity')} />
                    </div>
                  </div>
                  <div>
                    <label className="label">Message / Specific Requirements *</label>
                    <textarea
                      className="input resize-none"
                      rows={5}
                      placeholder="Describe the products you need, quality specifications, Incoterms preference, delivery port, target price, certifications required, etc."
                      value={form.message}
                      onChange={update('message')}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-forest-900 text-white py-4 rounded-xl font-body font-semibold text-base hover:bg-forest-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-forest-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send className="w-4 h-4" /> Submit Export Inquiry</>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}