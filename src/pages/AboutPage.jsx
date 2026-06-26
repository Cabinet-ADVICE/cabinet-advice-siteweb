import { motion } from 'framer-motion'
import { CheckCircle2, Target, Eye } from 'lucide-react'
import { IMAGES } from '../data/content'
import { useI18n } from '../i18n'
import { ArrowLink, GoldLine, SectionLabel } from '../components/Navbar'
import { CtaSection, PageHero, StatsSection } from '../components/Sections'

const MISSION_ICONS = [Target, Eye, CheckCircle2]

export default function AboutPage() {
  const { t, data } = useI18n()

  return (
    <>
      <PageHero
        label={t('about.hero.label')}
        title={t('about.hero.title')}
        subtitle={t('about.hero.subtitle')}
        image={IMAGES.aboutPage}
      />

      <section className="py-0">
        <div className="grid min-h-[480px] lg:grid-cols-2">
          <div className="flex items-center bg-white">
            <div className="px-10 py-16 lg:px-16 xl:px-20 lg:py-20">
              <SectionLabel>{t('about.history.label')}</SectionLabel>
              <h2 className="mb-6 font-sora text-3xl leading-tight font-bold text-navy lg:text-4xl">
                {t('about.history.title')}
              </h2>
              <GoldLine className="mb-8" />
              <p className="text-slate mb-5 leading-relaxed">{t('about.history.p1')}</p>
              <p className="text-slate mb-10 leading-relaxed">{t('about.history.p2')}</p>
              <ArrowLink to="/contact">{t('common.contactUs')}</ArrowLink>
            </div>
          </div>
          <div className="relative min-h-[360px]">
            <img
              src={IMAGES.team}
              alt={t('about.history.imageAlt')}
              loading="lazy"
              decoding="async"
              width={900}
              height={600}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-background py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <SectionLabel>{t('about.fundamentals.label')}</SectionLabel>
            <h2 className="font-sora text-3xl leading-tight font-bold text-navy lg:text-4xl">
              {t('about.fundamentals.title')}
            </h2>
            <GoldLine className="mt-6" />
          </div>

          <div className="grid gap-px bg-border md:grid-cols-3">
            {data.missionValues.map((item, index) => {
              const Icon = MISSION_ICONS[index]
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white p-10 transition-all duration-500 hover:bg-navy"
                >
                  <div className="mb-8 flex h-14 w-14 items-center justify-center bg-navy transition-colors group-hover:bg-gold/20">
                    <Icon className="h-7 w-7 text-gold" />
                  </div>
                  <h3 className="mb-4 font-sora text-xl font-bold text-navy transition-colors group-hover:text-white">
                    {item.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed transition-colors group-hover:text-white/60">
                    {item.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-3">
            <div>
              <SectionLabel>{t('about.strengths.label')}</SectionLabel>
              <h2 className="mb-6 font-sora text-3xl leading-tight font-bold text-navy lg:text-4xl">
                {t('about.strengths.title')}
              </h2>
              <GoldLine className="mb-8" />
              <p className="text-slate text-sm leading-relaxed">{t('about.strengths.subtitle')}</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-2">
              {data.strengths.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <h4 className="mb-2 font-sora text-sm font-semibold text-navy">{item.title}</h4>
                    <p className="text-slate text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatsSection stats={data.stats} />
      <CtaSection />
    </>
  )
}
