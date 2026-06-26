import { ArrowRight } from 'lucide-react'
import { LOGO_URL } from '../data/content'
import { useI18n } from '../i18n'
import { ContactIcons } from './Navbar'
import LocaleLink from './LocaleLink'

export default function Footer() {
  const { t, navLinks, data } = useI18n()

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="lg:col-span-1">
            <LocaleLink to="/" className="mb-8 inline-block rounded-sm bg-white px-4 py-3">
              <img
                src={LOGO_URL}
                alt={t('nav.logoAlt')}
                width={160}
                height={56}
                loading="lazy"
                decoding="async"
                className="h-14 w-auto object-contain"
              />
            </LocaleLink>
            <p className="mb-8 text-sm leading-relaxed text-white/50">{t('footer.tagline')}</p>
            <div className="h-0.5 w-10 bg-gold" />
          </div>

          <div>
            <h4 className="mb-7 font-sora text-xs font-semibold tracking-[0.18em] text-gold uppercase">
              {t('footer.navigation')}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <LocaleLink
                    to={link.path}
                    className="group flex items-center gap-2 text-sm text-white/50 transition-colors duration-200 hover:text-white"
                  >
                    <ArrowRight className="h-3 w-3 text-gold opacity-0 transition-opacity group-hover:opacity-100 rtl:rotate-180" />
                    {link.label}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-7 font-sora text-xs font-semibold tracking-[0.18em] text-gold uppercase">
              {t('footer.ourServices')}
            </h4>
            <ul className="space-y-3">
              {data.footerServices.map((service) => (
                <li key={service} className="flex items-start gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold/50" />
                  <span className="text-sm leading-relaxed text-white/50">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-7 font-sora text-xs font-semibold tracking-[0.18em] text-gold uppercase">
              {t('footer.contactUs')}
            </h4>
            <ContactIcons />
            <div className="mt-8">
              <LocaleLink to="/contact">
                <button
                  type="button"
                  className="bg-gold px-6 py-3 font-sora text-xs font-medium tracking-wider text-white uppercase transition-colors duration-300 hover:bg-white hover:text-navy"
                >
                  {t('footer.writeUs')}
                </button>
              </LocaleLink>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Cabinet ADVICE. {t('footer.rights')}
          </p>
          <p className="text-xs text-white/30">{t('footer.taglineShort')}</p>
        </div>
      </div>
    </footer>
  )
}
