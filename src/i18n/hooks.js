import { useContext } from 'react'
import { I18nContext } from './context'
import { localizePath } from './routes'

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

export function useTranslation() {
  const { t, locale, content, data, navLinks } = useI18n()
  return { t, locale, content, data, navLinks }
}

export function useLocalizedPath(path = '/') {
  const { locale } = useI18n()
  return localizePath(locale, path)
}
