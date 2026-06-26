import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'
import { DEFAULT_LOCALE, LANGUAGES, SUPPORTED_LOCALES } from '../i18n/config'
import { buildLocalizedUrl, stripLocalePrefix } from '../i18n/routes'
import { OG_IMAGE, ORGANIZATION, SITE_NAME, SITE_URL } from '../seo/site'

function buildBreadcrumbJsonLd(pagePath, locale, t, navLinks) {
  const homeUrl = buildLocalizedUrl(SITE_URL, locale, '/')
  const items = [{ name: t('nav.home'), url: homeUrl }]

  if (pagePath !== '/') {
    const link = navLinks.find((l) => l.path === pagePath)
    items.push({
      name: link?.label || t('seo.breadcrumbPage'),
      url: buildLocalizedUrl(SITE_URL, locale, pagePath),
    })
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

function buildOrganizationJsonLd(t) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: ORGANIZATION.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: OG_IMAGE,
    description: t('seo.defaultDescription'),
    email: ORGANIZATION.email,
    areaServed: { '@type': 'Country', name: 'Morocco' },
    address: { '@type': 'PostalAddress', addressCountry: 'MA', addressLocality: t('seo.geoPlacename') },
    knowsAbout: t('seo.knowsAbout'),
    sameAs: [],
  }
}

function buildWebsiteJsonLd(t, lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    description: t('seo.defaultDescription'),
    inLanguage: `${lang.htmlLang}-MA`,
    publisher: { '@id': `${SITE_URL}/#organization` },
  }
}

function buildServicesJsonLd(t, data) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('seo.servicesListName'),
    itemListElement: data.footerServices.map((name, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: 'MA',
      },
    })),
  }
}

function buildContactJsonLd(t, locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `${t('nav.contact')} — ${SITE_NAME}`,
    url: buildLocalizedUrl(SITE_URL, locale, '/contact'),
    description: t('seo.contactPageDescription'),
    mainEntity: { '@id': `${SITE_URL}/#organization` },
  }
}

export default function Seo() {
  const { pathname } = useLocation()
  const { locale, t, lang, data, navLinks, content } = useI18n()

  const pagePath = stripLocalePrefix(pathname)

  const pageSeo = content.seo.pages[pagePath] || {
    title: SITE_NAME,
    description: t('seo.defaultDescription'),
    keywords: t('seo.defaultKeywords'),
  }

  const canonical = buildLocalizedUrl(SITE_URL, locale, pagePath)
  const title = typeof pageSeo === 'object' ? pageSeo.title : SITE_NAME
  const description = typeof pageSeo === 'object' ? pageSeo.description : t('seo.defaultDescription')
  const keywords = typeof pageSeo === 'object' ? (pageSeo.keywords || t('seo.defaultKeywords')) : t('seo.defaultKeywords')

  const alternateLocales = SUPPORTED_LOCALES.filter((code) => code !== locale)

  const schemas = [
    buildOrganizationJsonLd(t),
    buildWebsiteJsonLd(t, lang),
    buildBreadcrumbJsonLd(pagePath, locale, t, navLinks),
  ]

  if (pagePath === '/services') schemas.push(buildServicesJsonLd(t, data))
  if (pagePath === '/contact') schemas.push(buildContactJsonLd(t, locale))

  return (
    <Helmet>
      <html lang={lang.htmlLang} dir={lang.dir} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={SITE_NAME} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={canonical} />

      {SUPPORTED_LOCALES.map((code) => (
        <link
          key={code}
          rel="alternate"
          hrefLang={LANGUAGES[code].htmlLang}
          href={buildLocalizedUrl(SITE_URL, code, pagePath)}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={buildLocalizedUrl(SITE_URL, DEFAULT_LOCALE, pagePath)}
      />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={lang.ogLocale} />
      {alternateLocales.map((code) => (
        <meta key={code} property="og:locale:alternate" content={LANGUAGES[code].ogLocale} />
      ))}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:alt" content={`${SITE_NAME} — ${t('seo.siteTagline')}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:url" content={canonical} />

      <meta name="geo.region" content="MA" />
      <meta name="geo.placename" content={t('seo.geoPlacename')} />
      <meta name="language" content={t('seo.languageName')} />

      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="apple-touch-icon" href="/logo.png" />
      <link rel="manifest" href="/manifest.webmanifest" />

      {schemas.map((schema) => (
        <script key={schema['@type']} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
