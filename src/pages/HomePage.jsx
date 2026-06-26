import LocaleLink from '../components/LocaleLink'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Quote,
  Shield,
} from 'lucide-react'
import { IMAGES } from '../data/content'
import { useI18n } from '../i18n'
import { ArrowLink, GoldLine, ScrollHint, SectionLabel } from '../components/Navbar'
import { CtaSection, StatsSection } from '../components/Sections'

const SERVICE_ICONS = [GraduationCap, BookOpen, BarChart3, ClipboardCheck, Shield, GraduationCap]

export default function HomePage() {
  const { t, data } = useI18n()

  return (
    <>
      <section className="relative flex min-h-screen flex-col overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
          <img
            src={IMAGES.hero}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            width={1400}
            height={933}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-navy/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/60 to-transparent rtl:bg-gradient-to-l" />
        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gold rtl:right-0 rtl:left-auto" />

        <div className="relative flex flex-1 items-center">
          <div className="mx-auto w-full max-w-7xl px-6 py-32 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-6 inline-block border-b border-gold/40 pb-1 font-sora text-xs font-semibold tracking-[0.3em] text-gold uppercase"
              >
                {t('common.tagline')}
              </motion.span>

              <motion.h1
                className="mb-8 font-sora text-5xl leading-[1.05] font-bold text-white sm:text-6xl lg:text-7xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {t('home.hero.titleLine1')}
                <br />
                <span className="text-gold">{t('home.hero.titleHighlight')}</span>
                <br />
                {t('home.hero.titleLine2')}
              </motion.h1>

              <motion.p
                className="mb-12 max-w-xl text-lg leading-relaxed text-white/65 lg:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                {t('home.hero.subtitle')}
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <LocaleLink to="/contact">
                  <button
                    type="button"
                    className="group flex items-center gap-3 bg-gold px-8 py-4 font-sora text-sm font-semibold tracking-wider text-white uppercase transition-all duration-300 hover:bg-white hover:text-navy"
                  >
                    {t('home.hero.ctaQuote')}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </button>
                </LocaleLink>
                <LocaleLink to="/services">
                  <button
                    type="button"
                    className="border border-white/40 px-8 py-4 font-sora text-sm font-medium tracking-wider text-white uppercase transition-all duration-300 hover:border-white"
                  >
                    {t('home.hero.ctaServices')}
                  </button>
                </LocaleLink>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-12">
            <div className="grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
              {data.heroStats.map((stat) => (
                <div key={stat.label} className="px-6 py-6 text-center lg:px-10">
                  <div className="font-sora text-2xl font-bold text-gold">{stat.value}</div>
                  <div className="mt-1 text-xs tracking-wider text-white/45 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <ScrollHint />
      </section>

      <section className="overflow-hidden py-0">
        <div className="grid min-h-[560px] lg:grid-cols-2">
          <div className="relative min-h-[360px] lg:min-h-0">
            <img
              src={IMAGES.aboutHome}
              alt={t('home.about.imageAlt')}
              loading="lazy"
              decoding="async"
              width={900}
              height={600}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/30" />
            <div className="absolute top-0 bottom-0 left-0 w-1 bg-gold rtl:right-0 rtl:left-auto" />
          </div>
          <div className="flex items-center bg-white">
            <div className="max-w-2xl px-10 py-16 lg:px-16 xl:px-20 lg:py-20">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <SectionLabel>{t('home.about.label')}</SectionLabel>
                <h2 className="mb-6 font-sora text-3xl leading-tight font-bold text-navy lg:text-4xl">
                  {t('home.about.title')}
                </h2>
                <GoldLine className="mb-8" />
                <p className="text-slate mb-6 leading-relaxed">{t('home.about.p1')}</p>
                <p className="text-slate mb-10 leading-relaxed">{t('home.about.p2')}</p>
                <ArrowLink to="/a-propos">{t('common.learnMore')}</ArrowLink>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <SectionLabel>{t('home.services.label')}</SectionLabel>
              <h2 className="max-w-xl font-sora text-3xl leading-tight font-bold text-navy lg:text-4xl xl:text-5xl">
                {t('home.services.title')}
              </h2>
              <GoldLine className="mt-6" />
            </div>
            <ArrowLink to="/services" className="shrink-0">
              {t('common.allServices')}
            </ArrowLink>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {data.homeServices.map((service, index) => {
              const Icon = SERVICE_ICONS[index]
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="group cursor-pointer bg-white p-10 transition-all duration-500 hover:bg-navy"
                >
                  <div className="mb-8 flex h-12 w-12 items-center justify-center bg-gold/10 transition-colors group-hover:bg-gold/20">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mb-4 font-sora text-lg font-bold text-navy transition-colors group-hover:text-white">
                    {service.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed transition-colors group-hover:text-white/60">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden py-0">
        <div className="grid min-h-[600px] lg:grid-cols-2">
          <div className="relative flex items-center bg-navy">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '36px 36px',
              }}
            />
            <div className="relative px-10 py-20 lg:px-16 xl:px-20">
              <SectionLabel>{t('home.whyUs.label')}</SectionLabel>
              <h2 className="mb-6 font-sora text-3xl leading-tight font-bold text-white lg:text-4xl">
                {t('home.whyUs.title')}
              </h2>
              <GoldLine className="mb-8" />
              <p className="max-w-sm text-base leading-relaxed text-white/55">
                {t('home.whyUs.subtitle')}
              </p>
            </div>
          </div>
          <div className="bg-white">
            <div className="grid grid-cols-1 divide-border sm:grid-cols-2 sm:divide-x sm:divide-y">
              {data.whyUs.map((item, index) => (
                <motion.div
                  key={item.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group p-8 transition-colors hover:bg-background"
                >
                  <span className="font-sora text-3xl font-bold text-gold/20 transition-colors group-hover:text-gold/30">
                    {item.number}
                  </span>
                  <h4 className="mt-4 mb-2 font-sora text-sm font-bold text-navy">{item.title}</h4>
                  <p className="text-slate text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsSection stats={data.stats} />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <SectionLabel>{t('home.testimonials.label')}</SectionLabel>
            <h2 className="font-sora text-3xl leading-tight font-bold text-navy lg:text-4xl">
              {t('home.testimonials.title')}
            </h2>
            <GoldLine className="mt-6" />
          </div>

          <div className="grid gap-px bg-border md:grid-cols-3">
            {data.testimonials.map((item, index) => (
              <motion.div
                key={item.name}
                className="group relative bg-white p-10 transition-colors hover:bg-background"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Quote className="mb-6 h-8 w-8 text-gold/20" />
                <p className="text-slate mb-8 flex-1 text-sm leading-relaxed">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-sora text-sm font-bold text-navy">{item.name}</div>
                    <div className="text-slate mt-0.5 text-xs">{item.company}</div>
                  </div>
                  <span className="border border-gold/30 px-3 py-1 font-sora text-xs font-semibold tracking-wider text-gold uppercase">
                    {item.sector}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
