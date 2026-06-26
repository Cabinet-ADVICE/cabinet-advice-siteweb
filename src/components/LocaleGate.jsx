import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { DEFAULT_LOCALE } from '../i18n/config'
import { I18nProvider } from '../i18n/I18nProvider'
import { isValidLocale, localizePath, detectPreferredLocale } from '../i18n/routes'

export function RootRedirect() {
  const locale = detectPreferredLocale()
  return <Navigate to={`/${locale}`} replace />
}

export default function LocaleGate() {
  const { locale } = useParams()
  const location = useLocation()

  if (!isValidLocale(locale)) {
    const preferred = detectPreferredLocale()
    return <Navigate to={localizePath(preferred, location.pathname)} replace />
  }

  return (
    <I18nProvider locale={locale}>
      <Outlet />
    </I18nProvider>
  )
}

export function LegacyRedirect() {
  const location = useLocation()
  const locale = detectPreferredLocale()
  return <Navigate to={localizePath(locale, location.pathname)} replace />
}

export function LocaleNotFound() {
  return <Navigate to={`/${DEFAULT_LOCALE}`} replace />
}
