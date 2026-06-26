export const LANGUAGES = {
  fr: { label: 'FR', name: 'Français', dir: 'ltr', htmlLang: 'fr', ogLocale: 'fr_MA' },
  en: { label: 'EN', name: 'English', dir: 'ltr', htmlLang: 'en', ogLocale: 'en_US' },
  ar: { label: 'AR', name: 'العربية', dir: 'rtl', htmlLang: 'ar', ogLocale: 'ar_MA' },
}

export const DEFAULT_LOCALE = 'fr'
export const STORAGE_KEY = 'cabinet-advice-locale'
export const SUPPORTED_LOCALES = Object.keys(LANGUAGES)
