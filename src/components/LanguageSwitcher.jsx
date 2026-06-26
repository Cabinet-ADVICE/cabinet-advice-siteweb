import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Globe } from 'lucide-react'
import { LANGUAGES, SUPPORTED_LOCALES } from '../i18n/config'
import { useI18n } from '../i18n'

function FlagFr({ className = 'h-4 w-4' }) {
  const clipId = useId()
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <clipPath id={clipId}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="8" height="24" fill="#002395" />
        <rect x="8" width="8" height="24" fill="#fff" />
        <rect x="16" width="8" height="24" fill="#ed2939" />
      </g>
    </svg>
  )
}

function FlagEn({ className = 'h-4 w-4' }) {
  const clipId = useId()
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <clipPath id={clipId}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="24" fill="#012169" />
        <path d="M0 0l24 24M24 0L0 24" stroke="#fff" strokeWidth="4" />
        <path d="M0 0l24 24M24 0L0 24" stroke="#c8102e" strokeWidth="2" />
        <path d="M12 0v24M0 12h24" stroke="#fff" strokeWidth="6" />
        <path d="M12 0v24M0 12h24" stroke="#c8102e" strokeWidth="3" />
      </g>
    </svg>
  )
}

function FlagAr({ className = 'h-4 w-4' }) {
  const clipId = useId()
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <clipPath id={clipId}>
        <circle cx="12" cy="12" r="12" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect width="24" height="24" fill="#006C35" />
        <path
          fill="#fff"
          d="M5.5 7.8c1.5.45 3.3.7 6 .7h1c2.7 0 4.5-.25 6-.7-.2 1-1.8 1.9-6 1.9h-1c-4.2 0-5.8-.9-6-1.9zm-.15 2.1c1.2.35 2.7.55 4.5.55h2.3c1.8 0 3.3-.2 4.5-.55-.15.85-1.35 1.45-4.5 1.45h-2.3c-3.15 0-4.35-.6-4.5-1.45z"
        />
        <path
          fill="#fff"
          d="M4.8 14.6h10.4c.5 0 .9.4.9.9s-.4.9-.9.9H6.4l-1.3 2-1.2-.75 1.3-2H4.8zm10.4 0h2.6c.5 0 .9.4.9.9s-.4.9-.9.9h-2.2l1-2z"
        />
      </g>
    </svg>
  )
}

const FLAG_ICONS = {
  fr: FlagFr,
  en: FlagEn,
  ar: FlagAr,
}

export default function LanguageSwitcher({ className = '' }) {
  const { locale, setLocale, lang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const listId = useId()
  const CurrentFlag = FLAG_ICONS[locale] ?? Globe

  useEffect(() => {
    const close = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const pick = (code) => {
    setLocale(code)
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-label={t('nav.language')}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 border border-[#e2e8f0] bg-white px-3 py-2 text-sm transition-colors duration-200 hover:border-[#b87a28] focus:border-[#b87a28] focus:outline-none"
      >
        <CurrentFlag className="h-4 w-4 shrink-0" />
        <span className="hidden font-sora text-xs font-semibold tracking-wide text-[#1b2e6f] uppercase sm:inline">
          {lang.label}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#b87a28] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(100%+0.5rem)] right-0 z-50 min-w-[11.5rem] overflow-hidden border border-[#e2e8f0] bg-white shadow-[0_16px_40px_rgba(27,46,111,0.14)] rtl:right-auto rtl:left-0"
          >
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#b87a28] rtl:right-0 rtl:left-auto" />

            <div className="flex items-center gap-2 border-b border-[#e2e8f0]/80 bg-[#f5f8fb] px-4 py-2.5">
              <Globe className="h-3.5 w-3.5 text-[#b87a28]" aria-hidden="true" />
              <span className="font-sora text-[10px] font-semibold tracking-[0.2em] text-[#b87a28] uppercase">
                {t('nav.language')}
              </span>
            </div>

            <ul id={listId} role="listbox" aria-label={t('nav.language')} className="py-1">
              {SUPPORTED_LOCALES.map((code) => {
                const meta = LANGUAGES[code]
                const Flag = FLAG_ICONS[code]
                const active = locale === code

                return (
                  <li key={code} role="presentation">
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => pick(code)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-200 ${
                        active
                          ? 'bg-[#b87a28]/10 text-[#1b2e6f]'
                          : 'text-[#1b2e6f] hover:bg-[#1b2e6f] hover:text-white'
                      }`}
                    >
                      <Flag className="h-4 w-4 shrink-0" />
                      <span className="flex-1 font-medium">{meta.name}</span>
                      <span className="font-sora text-[10px] font-semibold tracking-wider uppercase opacity-60">
                        {meta.label}
                      </span>
                      {active && <Check className="h-4 w-4 shrink-0 text-[#b87a28]" aria-hidden="true" />}
                    </button>
                  </li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
