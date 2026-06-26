import { ArrowRight, ChevronDown, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { CONTACT, LOGO_URL } from '../data/content'
import { useI18n } from '../i18n'
import LanguageSwitcher from './LanguageSwitcher'
import LocaleLink from './LocaleLink'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { t, navLinks } = useI18n()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <div className="hidden bg-navy text-xs text-white/60 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-6 px-6 py-2 lg:px-8">
          <span className="flex items-center gap-1.5">
            <Phone className="h-3 w-3 text-gold" />
            {CONTACT.phone}
          </span>
          <span>{CONTACT.email}</span>
        </div>
      </div>

      <header
        className={`sticky top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-white shadow-lg shadow-navy/5' : 'border-b border-border/40 bg-white'
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <LocaleLink to="/" className="flex shrink-0 items-center">
              <img
                src={LOGO_URL}
                alt={t('nav.logoAlt')}
                width={160}
                height={56}
                decoding="async"
                className="h-14 w-auto object-contain"
              />
            </LocaleLink>

            <div className="hidden items-center gap-0 lg:flex">
              {navLinks.map((link) => (
                <LocaleLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMenu}
                  className={`group relative px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                    pathname === link.href ? 'text-navy' : 'text-slate hover:text-navy'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute right-5 bottom-0 left-5 h-0.5 origin-left bg-gold transition-transform duration-300 ${
                      pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </LocaleLink>
              ))}
            </div>

            <div className="hidden items-center gap-4 lg:flex">
              <LanguageSwitcher />
              <LocaleLink to="/contact">
                <button
                  type="button"
                  className="bg-gold px-7 py-3 font-sora text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 hover:bg-navy"
                >
                  {t('nav.requestQuote')}
                </button>
              </LocaleLink>
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <LanguageSwitcher />
              <button
                type="button"
                className="p-2 text-navy"
                onClick={() => setOpen(!open)}
                aria-label={t('nav.menu')}
              >
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-border bg-white lg:hidden"
            >
              <div className="space-y-1 px-4 py-6">
                {navLinks.map((link) => (
                  <LocaleLink
                    key={link.path}
                    to={link.path}
                    onClick={closeMenu}
                    className={`block border-l-2 px-4 py-3 text-base font-medium transition-all ${
                      pathname === link.href
                        ? 'border-gold bg-gold/5 text-navy'
                        : 'border-transparent text-slate hover:border-gold/50 hover:text-navy'
                    }`}
                  >
                    {link.label}
                  </LocaleLink>
                ))}
                <div className="pt-4">
                  <LocaleLink to="/contact" onClick={closeMenu}>
                    <button
                      type="button"
                      className="w-full bg-gold py-3 font-sora text-sm font-medium tracking-wider text-white uppercase transition-colors duration-300 hover:bg-navy"
                    >
                      {t('nav.requestQuote')}
                    </button>
                  </LocaleLink>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

export function ArrowLink({ to, children, className = '' }) {
  return (
    <LocaleLink
      to={to}
      className={`group inline-flex items-center gap-3 border-b-2 border-gold pb-1 font-sora text-sm font-semibold tracking-wider text-navy uppercase transition-colors hover:text-gold ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
    </LocaleLink>
  )
}

export function SectionLabel({ children }) {
  return (
    <span className="mb-5 block font-sora text-xs font-semibold tracking-[0.25em] text-gold uppercase">
      {children}
    </span>
  )
}

export function GoldLine({ className = 'mb-6' }) {
  return <div className={`h-0.5 w-12 bg-gold ${className}`} />
}

export function ContactIcons() {
  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
        <span className="text-sm text-white/50">{CONTACT.address}</span>
      </div>
      <div className="flex items-start gap-3">
        <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
        <span className="text-sm text-white/50">{CONTACT.email}</span>
      </div>
      <div className="flex items-start gap-3">
        <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
        <span className="text-sm text-white/50">{CONTACT.phone}</span>
      </div>
    </div>
  )
}

export function ScrollHint() {
  return (
    <motion.div
      className="absolute right-8 bottom-28 hidden flex-col items-center gap-2 lg:flex rtl:right-auto rtl:left-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1 }}
    >
      <ChevronDown className="h-5 w-5 animate-bounce text-white/30" />
    </motion.div>
  )
}
