import { DEFAULT_DESCRIPTION, DEFAULT_KEYWORDS, SITE_NAME } from './site'

export const PAGE_SEO = {
  '/': {
    title: `${SITE_NAME} | Expert en études, conseil & formation au Maroc`,
    description:
      'Cabinet ADVICE accompagne les entreprises marocaines : ingénierie de formation, CSF, business plans, études de faisabilité, ONSSA & HACCP. Demandez votre devis.',
    keywords: DEFAULT_KEYWORDS,
  },
  '/a-propos': {
    title: `À propos | ${SITE_NAME} — Cabinet de conseil au Maroc`,
    description:
      'Découvrez Cabinet ADVICE : mission, vision et valeurs d\'un cabinet marocain spécialisé en études stratégiques, conseil et ingénierie de formation pour entreprises.',
    keywords:
      'cabinet conseil Maroc, à propos Cabinet ADVICE, expert conseil entreprises, mission vision valeurs',
  },
  '/services': {
    title: `Services | ${SITE_NAME} — Formation, études & conformité`,
    description:
      'Ingénierie de formation, CSF GIAC/OFPPT, diagnostics stratégiques, business plans, études de faisabilité, accompagnement ONSSA & HACCP au Maroc.',
    keywords:
      'services conseil Maroc, ingénierie formation CSF, business plan, étude faisabilité, ONSSA HACCP, formation continue entreprises',
  },
  '/references': {
    title: `Références | ${SITE_NAME} — Missions & secteurs d'intervention`,
    description:
      'Références et types de missions réalisées par Cabinet ADVICE : agroalimentaire, industrie, services, BTP, tourisme, santé et plus au Maroc.',
    keywords:
      'références cabinet conseil Maroc, missions formation CSF, études entreprises Maroc, secteurs accompagnement',
  },
  '/contact': {
    title: `Contact | ${SITE_NAME} — Devis & consultation gratuite`,
    description:
      'Contactez Cabinet ADVICE pour un devis ou une consultation : formulaire en ligne, téléphone, email et WhatsApp. Réponse rapide garantie.',
    keywords:
      'contact Cabinet ADVICE, devis conseil Maroc, consultation gratuite, cabinet formation Maroc contact',
  },
}

export function getPageSeo(pathname) {
  return PAGE_SEO[pathname] || {
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
  }
}

export const SITEMAP_ROUTES = Object.keys(PAGE_SEO)
