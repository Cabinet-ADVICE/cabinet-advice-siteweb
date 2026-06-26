export const SITE_NAME = import.meta.env.VITE_SITE_NAME || 'Cabinet ADVICE'
export const SITE_TAGLINE = 'Études · Conseil · Formation'
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://cabinet-advice.ma').replace(/\/$/, '')

export const DEFAULT_DESCRIPTION =
  'Cabinet ADVICE — expert marocain en études stratégiques, ingénierie de formation, business plans, études de faisabilité, accompagnement ONSSA & HACCP et conseil aux entreprises au Maroc.'

export const DEFAULT_KEYWORDS = [
  'cabinet conseil Maroc',
  'études stratégiques Maroc',
  'ingénierie de formation',
  'contrat spécial de formation CSF',
  'business plan Maroc',
  'étude de faisabilité Maroc',
  'accompagnement ONSSA',
  'HACCP Maroc',
  'formation professionnelle continue',
  'conseil aux entreprises Maroc',
  'Cabinet ADVICE',
  'GIAC OFPPT formation',
  'diagnostic stratégique entreprise',
].join(', ')

export const LOCALE = 'fr_MA'
export const OG_IMAGE = `${SITE_URL}/logo.png`

export const ORGANIZATION = {
  name: SITE_NAME,
  email: import.meta.env.VITE_CONTACT_EMAIL || 'contact@cabinet-advice.ma',
  areaServed: 'MA',
  description: DEFAULT_DESCRIPTION,
}
