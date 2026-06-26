import { motion } from 'framer-motion'
import { BarChart3, BookOpen, ClipboardCheck, GraduationCap, Shield } from 'lucide-react'
import { IMAGES } from '../data/content'
import { useI18n } from '../i18n'
import { GoldLine, SectionLabel } from '../components/Navbar'
import { CtaSection, PageHero, SectorsSection, StatsSection } from '../components/Sections'

const REF_ICONS = [GraduationCap, BookOpen, BarChart3, ClipboardCheck, Shield, GraduationCap]

export default function ReferencesPage() {
  const { t, data } = useI18n()

  return (
    <>
      <PageHero
        label={t('references.hero.label')}
        title={t('references.hero.title')}
        subtitle={t('references.hero.subtitle')}
        image={IMAGES.references}
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <SectionLabel>{t('references.achievements.label')}</SectionLabel>
            <h2 className="font-sora text-3xl leading-tight font-bold text-navy lg:text-4xl">
              {t('references.achievements.title')}
            </h2>
            <GoldLine className="mt-6" />
          </div>

          <div className="grid gap-px bg-border md:grid-cols-2">
            {data.references.map((ref, index) => {
              const Icon = REF_ICONS[index]
              return (
                <motion.div
                  key={ref.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="group bg-white p-10 transition-colors hover:bg-background"
                >
                  <div className="mb-7 flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold/10 transition-colors group-hover:bg-gold/20">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                    <h3 className="font-sora text-lg font-bold text-navy">{ref.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {ref.items.map((item) => (
                      <li key={item} className="text-slate flex items-start gap-3 text-sm leading-relaxed">
                        <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <SectorsSection sectors={data.sectors} />
      <StatsSection stats={data.stats} />
      <CtaSection />
    </>
  )
}
