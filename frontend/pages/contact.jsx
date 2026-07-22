import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Leaf
} from 'lucide-react'

import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa"

import toast from 'react-hot-toast'
import Navbar from '../components/layouts/Navbar'
import Footer from '../components/layouts/Footer'
import api from '../src/utils/api'

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'Plot 14, Agric Export Hub, Victoria Island, Lagos, Nigeria' },
  { icon: Phone, label: 'Phone', value: '+234 801 234 5678', href: 'tel:+2348012345678' },
  { icon: Mail, label: 'Email', value: 'exports@klaxonfordagric.com', href: 'mailto:exports@klaxonfordagric.com' },
  { icon: Clock, label: 'Office Hours', value: 'Mon – Fri: 8am – 6pm WAT' },
]

const socials = [
  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
]

const inputClasses =
  "w-full px-4 py-3 rounded-xl border border-gray-200 bg-ivory-50 text-forest-900 " +
  "placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gold-500/40 " +
  "focus:border-gold-500 transition-colors"

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block font-mono text-xs text-gray-500 uppercase tracking-wider mb-1.5">
        {label} {required && <span className="text-gold-600">*</span>}
      </label>
      {children}
    </div>
  )
}

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
      toast.success("Inquiry received! We'll contact you within 24 hours.")
    } catch (err) {
      toast.error('Failed to submit. Please try again or email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const update = (key) => (e) =>
    setForm(prev => ({ ...prev, [key]: e.target.value }))

  return (
    <div className="min-h-screen bg-ivory-100">
      <Navbar />

      {/* Header */}
      <section className="bg-forest-950 pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-xl"
          >
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

      {/* MAIN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* LEFT SIDE */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-2xl font-bold text-forest-900 mb-6">
              Contact Information
            </h2>

            <div className="space-y-5 mb-8">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-forest-900 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold-400" />
                  </div>

                  <div>
                    <p className="font-mono text-xs text-gray-400 uppercase tracking-wider mb-1">
                      {label}
                    </p>

                    {href ? (
                      <a href={href} className="font-body text-forest-900 font-medium hover:text-gold-600">
                        {value}
                      </a>
                    ) : (
                      <p className="font-body text-forest-900 font-medium">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* SOCIALS */}
            <div className="mb-8">
              <p className="font-display font-semibold text-forest-900 mb-4">
                Follow Us
              </p>

              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-forest-900 rounded-xl flex items-center justify-center text-white hover:bg-gold-500"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* FORM SIDE */}
          <div className="lg:col-span-2">

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-gray-100 p-16 text-center"
              >
                <CheckCircle className="w-8 h-8 text-gold-500 mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold text-forest-900 mb-3">
                  Inquiry Received!
                </h2>
                <p className="text-gray-500">
                  We'll contact you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name" required>
                    <input
                      className={inputClasses}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={update('name')}
                      required
                    />
                  </Field>

                  <Field label="Email" required>
                    <input
                      type="email"
                      className={inputClasses}
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={update('email')}
                      required
                    />
                  </Field>

                  <Field label="Phone">
                    <input
                      type="tel"
                      className={inputClasses}
                      placeholder="+234 800 000 0000"
                      value={form.phone}
                      onChange={update('phone')}
                    />
                  </Field>

                  <Field label="Company">
                    <input
                      className={inputClasses}
                      placeholder="Company name"
                      value={form.company}
                      onChange={update('company')}
                    />
                  </Field>

                  <Field label="Country">
                    <input
                      className={inputClasses}
                      placeholder="Destination country"
                      value={form.country}
                      onChange={update('country')}
                    />
                  </Field>

                  <Field label="Quantity">
                    <input
                      className={inputClasses}
                      placeholder="e.g. 500 MT"
                      value={form.quantity}
                      onChange={update('quantity')}
                    />
                  </Field>
                </div>

                <Field label="Message" required>
                  <textarea
                    className={`${inputClasses} resize-none`}
                    rows={5}
                    placeholder="Tell us what you're looking to source..."
                    value={form.message}
                    onChange={update('message')}
                    required
                  />
                </Field>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-forest-900 text-white py-4 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-forest-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : (
                    <>
                      <Send className="w-4 h-4" /> Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}