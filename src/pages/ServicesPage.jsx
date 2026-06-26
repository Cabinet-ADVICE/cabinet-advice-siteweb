import LocaleLink from '../components/LocaleLink'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, BookOpen, ClipboardCheck, GraduationCap, Shield } from 'lucide-react'
import { IMAGES } from '../data/content'
import { useI18n } from '../i18n'
import { CtaSection, PageHero } from '../components/Sections'

const SERVICE_ICONS = [GraduationCap, BookOpen, BarChart3, ClipboardCheck, Shield, GraduationCap]

export default function ServicesPage() {
  const { t, data } = useI18n()

  return (
    <>
      <PageHero
        label={t('services.hero.label')}
        title={t('services.hero.title')}
        subtitle={t('services.hero.subtitle')}
        image={IMAGES.services}
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-px bg-border">
            {data.detailedServices.map((service, index) => {
              const Icon = SERVICE_ICONS[index]
              return (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.04 }}
                  className="group bg-white transition-colors hover:bg-background"
                >
                  <div className="grid gap-8 px-10 py-12 lg:grid-cols-12 lg:gap-12">
                    <div className="flex items-center gap-4 lg:col-span-1 lg:flex-col lg:items-start">
                      <span className="font-sora text-2xl font-bold text-gold/30 transition-colors group-hover:text-gold/50">
                        {service.number}
                      </span>
                    </div>
                    <div className="lg:col-span-7">
                      <div className="mb-5 flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-gold/10 transition-colors group-hover:bg-gold/20">
                          <Icon className="h-6 w-6 text-gold" />
                        </div>
                        <h3 className="font-sora text-xl font-bold text-navy">{service.title}</h3>
                      </div>
                      <p className="text-slate leading-relaxed">{service.description}</p>
                    </div>
                    <div className="border-border border-s lg:col-span-4 lg:ps-8">
                      <h4 className="mb-5 font-sora text-xs font-semibold tracking-wider text-navy uppercase">
                        {t('common.includedServices')}
                      </h4>
                      <ul className="space-y-2.5">
                        {service.details.map((detail) => (
                          <li key={detail} className="text-slate flex items-start gap-2.5 text-sm">
                            <div className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-16 flex justify-center">
            <LocaleLink to="/contact">
              <button
                type="button"
                className="group flex items-center gap-3 bg-gold px-10 py-4 font-sora text-sm font-semibold tracking-wider text-white uppercase transition-all duration-300 hover:bg-navy"
              >
                {t('services.cta')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </button>
            </LocaleLink>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
