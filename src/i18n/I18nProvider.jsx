import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { I18nContext } from './context'
import { DEFAULT_LOCALE, LANGUAGES, STORAGE_KEY, SUPPORTED_LOCALES } from './config'
import { localizePath, stripLocalePrefix } from './routes'

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj)
}

function interpolate(str, vars = {}) {
  if (typeof str !== 'string') return str
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '')
}

const localeLoaders = {
  fr: () => import('./locales/fr'),
  en: () => import('./locales/en'),
  ar: () => import('./locales/ar'),
}

export function I18nProvider({ locale, children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const activeLocale = SUPPORTED_LOCALES.includes(locale) ? locale : DEFAULT_LOCALE

  const [content, setContent] = useState(null)
  const [isSwitching, setIsSwitching] = useState(false)

  const lang = LANGUAGES[activeLocale] ?? LANGUAGES[DEFAULT_LOCALE]

  useEffect(() => {
    let cancelled = false
    localeLoaders[activeLocale]()
      .then((mod) => {
        if (!cancelled) setContent(mod.default)
      })
      .catch(() => {
        if (!cancelled) setContent(null)
      })
    return () => {
      cancelled = true
    }
  }, [activeLocale])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, activeLocale)
    document.documentElement.lang = lang.htmlLang
    document.documentElement.dir = lang.dir
  }, [activeLocale, lang.htmlLang, lang.dir])

  useEffect(() => {
    if (!isSwitching) return
    const timer = setTimeout(() => setIsSwitching(false), 400)
    return () => clearTimeout(timer)
  }, [isSwitching, activeLocale])

  const setLocale = useCallback(
    (next) => {
      if (!SUPPORTED_LOCALES.includes(next) || next === activeLocale) return
      setIsSwitching(true)
      const pagePath = stripLocalePrefix(location.pathname)
      navigate(localizePath(next, pagePath))
    },
    [activeLocale, location.pathname, navigate],
  )

  const t = useCallback(
    (key, vars) => {
      if (!content) return key
      const value = getNested(content, key)
      if (value === undefined) return key
      if (typeof value === 'string') return interpolate(value, vars)
      return value
    },
    [content],
  )

  const navLinks = useMemo(() => {
    if (!content) return []
    return content.data.navLinks.map((link) => ({
      ...link,
      label: content.nav[link.key],
      href: localizePath(activeLocale, link.path),
    }))
  }, [content, activeLocale])

  const value = useMemo(
    () => ({
      locale: activeLocale,
      setLocale,
      isSwitching,
      isRtl: lang.dir === 'rtl',
      dir: lang.dir,
      lang,
      content,
      t,
      navLinks,
      data: content?.data ?? {},
      ready: Boolean(content),
    }),
    [activeLocale, setLocale, isSwitching, lang, content, t, navLinks],
  )

  if (!content) {
    return <div className="min-h-screen bg-white" aria-hidden="true" />
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
