import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { CONTACT, IMAGES } from '../data/content'
import { useI18n } from '../i18n'
import { GoldLine, SectionLabel } from '../components/Navbar'
import { PageHero } from '../components/Sections'
import CabinetSelect from '../components/CabinetSelect'

const inputClass =
  'h-11 w-full border-0 border-b border-border bg-transparent px-0 transition-colors focus:border-gold focus:ring-0 outline-none'

export default function ContactPage() {
  const { t, data } = useI18n()
  const hours = t('contact.hours')

  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    activityType: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setError(t('contact.form.notConfigured'))
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: t('contact.form.subject', { name: form.name }),
          from_name: 'Cabinet ADVICE',
          name: form.name,
          email: form.email,
          replyto: form.email,
          phone: form.phone,
          company: form.company || t('common.notProvided'),
          activity_type: form.activityType || t('common.notProvided'),
          message: form.message,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || t('contact.form.sendFailed'))
      }

      setSent(true)
      setForm({ name: '', company: '', phone: '', email: '', activityType: '', message: '' })
      setTimeout(() => setSent(false), 5000)
    } catch {
      setError(t('contact.form.genericError'))
    } finally {
      setSubmitting(false)
    }
  }

  const sectorOptions = data.sectors.map((sector) => ({ value: sector, label: sector }))

  const contactItems = [
    { icon: MapPin, label: t('common.address'), value: CONTACT.address },
    { icon: Mail, label: t('common.email'), value: CONTACT.email },
    { icon: Phone, label: t('common.phone'), value: CONTACT.phone },
  ]

  return (
    <>
      <PageHero
        label={t('contact.hero.label')}
        title={t('contact.hero.title')}
        subtitle={t('contact.hero.subtitle')}
        image={IMAGES.aboutPage}
      />

      <section className="py-0">
        <div className="grid lg:grid-cols-5">
          <div className="bg-white px-8 py-20 sm:px-12 lg:col-span-3 lg:px-16 xl:px-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel>{t('contact.form.label')}</SectionLabel>
              <h2 className="mb-2 font-sora text-2xl font-bold text-navy lg:text-3xl">
                {t('contact.form.title')}
              </h2>
              <GoldLine className="mb-10" />

              {error && (
                <div className="mb-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  {error}
                </div>
              )}

              {sent && (
                <div className="mb-6 border border-gold/30 bg-gold/5 px-4 py-3 text-sm text-navy">
                  {t('contact.form.success')}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-sora text-xs font-medium tracking-wider text-navy uppercase">
                      {t('contact.form.name')}
                    </label>
                    <input
                      id="name"
                      required
                      placeholder={t('contact.form.namePlaceholder')}
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="font-sora text-xs font-medium tracking-wider text-navy uppercase">
                      {t('contact.form.company')}
                    </label>
                    <input
                      id="company"
                      placeholder={t('contact.form.companyPlaceholder')}
                      value={form.company}
                      onChange={(e) => update('company', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="font-sora text-xs font-medium tracking-wider text-navy uppercase">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      placeholder={CONTACT.phone}
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-sora text-xs font-medium tracking-wider text-navy uppercase">
                      {t('contact.form.email')}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder={t('contact.form.emailPlaceholder')}
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="activityType" className="font-sora text-xs font-medium tracking-wider text-navy uppercase">
                    {t('contact.form.activityType')}
                  </label>
                  <CabinetSelect
                    id="activityType"
                    name="activity_type"
                    value={form.activityType}
                    onChange={(value) => update('activityType', value)}
                    placeholder={t('contact.form.activityTypePlaceholder')}
                    options={sectorOptions}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-sora text-xs font-medium tracking-wider text-navy uppercase">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder={t('contact.form.messagePlaceholder')}
                    value={form.message}
                    onChange={(e) => update('message', e.target.value)}
                    className="min-h-[120px] w-full resize-none border-0 border-b border-border bg-transparent px-0 outline-none transition-colors focus:border-gold focus:ring-0"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group flex items-center gap-3 bg-gold px-10 py-4 font-sora text-sm font-semibold tracking-wider text-white uppercase transition-all duration-300 hover:bg-navy disabled:opacity-70"
                  >
                    {submitting ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        {t('contact.form.submitting')}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col bg-navy lg:col-span-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex-1 px-10 py-16 lg:px-12 lg:py-20">
              <SectionLabel>{t('nav.logoAlt')}</SectionLabel>
              <h3 className="mb-2 font-sora text-2xl font-bold text-white">
                {t('contact.sidebar.title')}
              </h3>
              <div className="mb-10 h-0.5 w-10 bg-gold" />

              <div className="space-y-8">
                {contactItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-start gap-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-white/5">
                        <Icon className="h-4 w-4 text-gold" />
                      </div>
                      <div>
                        <div className="mb-1 text-xs tracking-wider text-white/35 uppercase">
                          {item.label}
                        </div>
                        <div className="text-sm text-white">{item.value}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-10 border-t border-white/10 pt-10">
                <div className="mb-5 flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gold" />
                  <span className="font-sora text-xs font-semibold tracking-wider text-white/50 uppercase">
                    {t('common.hours')}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  {Array.isArray(hours) &&
                    hours.map((row) => (
                      <div key={row.day} className="flex justify-between gap-4">
                        <span className="text-white/40">{row.day}</span>
                        <span className="font-medium text-white/70">{row.time}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 border-t border-white/10 bg-gold/10 px-10 py-7 transition-colors hover:bg-gold/20 lg:px-12"
            >
              <svg className="h-6 w-6 shrink-0 text-gold" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <div>
                <div className="font-sora text-sm font-semibold text-white">WhatsApp</div>
                <div className="text-xs text-white/40">{t('contact.sidebar.whatsappSubtitle')}</div>
              </div>
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
