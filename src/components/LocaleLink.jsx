import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/hooks'
import { localizePath } from '../i18n/routes'

export default function LocaleLink({ to, ...props }) {
  const { locale } = useI18n()
  return <Link to={localizePath(locale, to)} {...props} />
}
