import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './config'

export const PAGE_PATHS = {
  home: '/',
  about: '/a-propos',
  services: '/services',
  references: '/references',
  contact: '/contact',
}

export const ROUTE_SEGMENTS = [
  { segment: '', path: PAGE_PATHS.home },
  { segment: 'a-propos', path: PAGE_PATHS.about },
  { segment: 'services', path: PAGE_PATHS.services },
  { segment: 'references', path: PAGE_PATHS.references },
  { segment: 'contact', path: PAGE_PATHS.contact },
]

export function isValidLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale)
}

export function stripLocalePrefix(pathname) {
  const segments = pathname.split('/').filter(Boolean)

  if (segments.length > 0 && isValidLocale(segments[0])) {
    const rest = segments.slice(1).join('/')
    return rest ? `/${rest}` : '/'
  }

  return pathname || '/'
}

export function localizePath(locale, path = '/') {
  const normalized = stripLocalePrefix(path.startsWith('/') ? path : `/${path}`)
  if (normalized === '/') return `/${locale}`
  return `/${locale}${normalized}`
}

export function getLocaleFromPath(pathname) {
  const segment = pathname.split('/').filter(Boolean)[0]
  return isValidLocale(segment) ? segment : null
}

export function detectPreferredLocale() {
  if (typeof window === 'undefined') return DEFAULT_LOCALE

  const stored = localStorage.getItem('cabinet-advice-locale')
  if (stored && isValidLocale(stored)) return stored

  const browser = navigator.language?.slice(0, 2)
  if (browser && isValidLocale(browser)) return browser

  return DEFAULT_LOCALE
}

export function buildLocalizedUrl(siteUrl, locale, path = '/') {
  const base = siteUrl.replace(/\/$/, '')
  const localized = localizePath(locale, path)
  return `${base}${localized === '/' ? '' : localized}`
}
