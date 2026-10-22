// The languages of the front page. English lives at /, every other language at
// /<code>/. The wiki and the legal pages are English only.
//
// To add a language: add its code here, write src/i18n/<code>.tsx after en.tsx
// (the Copy type keeps it complete), and register it in src/i18n/index.ts.
// src/data/pages.ts then gives it a route, a head, and hreflang links.

export const locales = ['en', 'ru', 'es'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/** Each language's own name, for the switcher. */
export const localeNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  es: 'Español',
}

export function homePath(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`
}

/** The language a path belongs to: its first segment when that is a known code. */
export function localeOf(pathname: string): Locale {
  const first = pathname.split('/')[1]
  return (locales as readonly string[]).includes(first) ? (first as Locale) : defaultLocale
}
