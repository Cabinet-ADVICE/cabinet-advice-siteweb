import { motion } from 'framer-motion'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import { CONTACT, IMAGES } from '../data/content'
import { useI18n } from '../i18n'
import LocaleLink from './LocaleLink'

export function PageHero({ label, title, subtitle, image }) {
  return (
    <section className="relative flex min-h-[380px] items-end overflow-hidden bg-navy lg:min-h-[460px]">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-navy/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 to-navy/30 rtl:bg-gradient-to-l" />
        </>
      )}
      {!image && (
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '36px 36px',
          }}
        />
      )}
      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gold rtl:right-0 rtl:left-auto" />
      <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 pb-16 sm:px-8 lg:px-12 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {label && (
            <span className="mb-5 block font-sora text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              {label}
            </span>
          )}
          <h1 className="max-w-3xl font-sora text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/55 lg:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export function StatsSection({ stats }) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 lg:py-28">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-gold rtl:right-0 rtl:left-auto" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="px-6 py-8 first:pl-0 lg:px-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-2 font-sora text-4xl font-bold text-gold lg:text-5xl">
                {stat.value}
              </div>
              <div className="mb-1 font-sora text-sm font-semibold text-white">{stat.label}</div>
              {stat.description && (
                <div className="hidden text-xs text-white/35 lg:block">{stat.description}</div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CtaSection() {
  const { t } = useI18n()

  const contacts = [
    { icon: Phone, label: t('sections.cta.callUs'), value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s/g, '')}` },
    { icon: Mail, label: t('sections.cta.writeUs'), value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  ]

  return (
    <section className="overflow-hidden py-0">
      <div className="grid lg:grid-cols-2">
        <div className="relative flex min-h-[400px] items-end">
          <img
            src={IMAGES.cta}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            width={900}
            height={600}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
          <div className="relative p-10 lg:p-14 xl:p-16">
            <h2 className="mb-6 font-sora text-3xl leading-tight font-bold text-white lg:text-4xl">
              {t('sections.cta.title')}
            </h2>
            <p className="mb-8 max-w-md text-sm leading-relaxed text-white/65">
              {t('sections.cta.subtitle')}
            </p>
            <LocaleLink to="/contact">
              <button
                type="button"
                className="group flex items-center gap-3 bg-gold px-8 py-4 font-sora text-sm font-semibold tracking-wider text-white uppercase transition-all duration-300 hover:bg-white hover:text-navy"
              >
                {t('sections.cta.button')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </button>
            </LocaleLink>
          </div>
        </div>

        <div className="flex flex-col divide-y divide-white/10 bg-navy">
          <div className="px-10 py-10 lg:px-14 lg:py-14 xl:px-16">
            <span className="mb-4 block font-sora text-xs font-semibold tracking-[0.25em] text-gold uppercase">
              {t('sections.cta.contactLabel')}
            </span>
            <h3 className="font-sora text-2xl font-bold text-white">{t('sections.cta.contactTitle')}</h3>
          </div>

          {contacts.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-6 px-10 py-8 transition-colors hover:bg-white/5 lg:px-14 xl:px-16"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold/10 transition-colors group-hover:bg-gold/20">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <div>
                  <div className="mb-1 text-xs tracking-wider text-white/40 uppercase">
                    {item.label}
                  </div>
                  <div className="font-sora font-medium text-white">{item.value}</div>
                </div>
                <ArrowRight className="ms-auto h-4 w-4 text-gold/40 transition-colors group-hover:text-gold rtl:rotate-180" />
              </motion.a>
            )
          })}

          <div className="px-10 py-8 lg:px-14 xl:px-16">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-gold" />
              <span className="text-sm text-white/40">{t('sections.cta.available')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SectorsSection({ sectors }) {
  const { t } = useI18n()

  return (
    <section className="relative overflow-hidden bg-navy py-24 lg:py-32">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute top-0 bottom-0 left-0 w-1 bg-gold rtl:right-0 rtl:left-auto" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14">
          <span className="mb-5 block font-sora text-xs font-semibold tracking-[0.25em] text-gold uppercase">
            {t('sections.sectors.label')}
          </span>
          <h2 className="font-sora text-3xl leading-tight font-bold text-white lg:text-4xl">
            {t('sections.sectors.title')}
          </h2>
          <div className="mt-6 h-0.5 w-12 bg-gold" />
        </div>
        <div className="flex flex-wrap gap-3">
          {sectors.map((sector, index) => (
            <motion.div
              key={sector}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border border-white/20 px-6 py-3 font-sora text-sm font-medium text-white/60 transition-all duration-300 hover:border-gold hover:text-white"
            >
              {sector}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function WhatsAppButton() {
  const { t } = useI18n()

  return (
    <motion.a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-6 bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold shadow-lg shadow-gold/30 transition-shadow duration-300 hover:shadow-gold/50 rtl:right-auto rtl:left-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      aria-label={t('sections.whatsapp.ariaLabel')}
    >
      <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="pointer-events-none absolute right-full me-3 rounded-xl bg-white px-4 py-2 text-sm font-medium whitespace-nowrap text-navy opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 rtl:right-auto rtl:left-full">
        {t('sections.whatsapp.tooltip')}
      </span>
    </motion.a>
  )
}
