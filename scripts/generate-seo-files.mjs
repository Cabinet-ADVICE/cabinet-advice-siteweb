import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.join(__dirname, '../.env')

if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const [key, ...rest] = trimmed.split('=')
    if (key && rest.length) process.env[key] = rest.join('=').trim()
  }
}

const siteUrl = (process.env.VITE_SITE_URL || 'https://cabinet-advice.com').replace(/\/$/, '')
const lastmod = new Date().toISOString().slice(0, 10)

const LOCALES = ['fr', 'en', 'ar']
const HREFLANG = { fr: 'fr', en: 'en', ar: 'ar' }

const routes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/a-propos', changefreq: 'monthly', priority: '0.8' },
  { path: '/services', changefreq: 'monthly', priority: '0.9' },
  { path: '/references', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
]

function localizePath(locale, pagePath) {
  if (pagePath === '/') return `/${locale}`
  return `/${locale}${pagePath}`
}

function buildUrl(locale, pagePath) {
  const localized = localizePath(locale, pagePath)
  return `${siteUrl}${localized}`
}

function hreflangLinks(pagePath) {
  const links = LOCALES.map(
    (locale) =>
      `    <xhtml:link rel="alternate" hreflang="${HREFLANG[locale]}" href="${buildUrl(locale, pagePath)}" />`,
  )
  links.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${buildUrl('fr', pagePath)}" />`,
  )
  return links.join('\n')
}

const urls = LOCALES.flatMap((locale) =>
  routes.map((route) => {
    const loc = buildUrl(locale, route.path)
    return `  <url>
    <loc>${loc}</loc>
${hreflangLinks(route.path)}
    <lastmod>${lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  }),
).join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap)
fs.writeFileSync(path.join(__dirname, '../public/robots.txt'), robots)

console.log(`SEO files generated for ${siteUrl} (${LOCALES.length} locales × ${routes.length} pages)`)
