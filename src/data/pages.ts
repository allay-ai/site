// The one source for every route's <head>: title, description, canonical URL,
// and language alternates. tools/prerender.mjs writes them into each built page,
// and components/layout/RouteHead.tsx swaps them on every client navigation.
//
// Every path ends in a slash and is built as <path>/index.html, which is how
// Cloudflare serves it. Keep a title under about 60 characters and a description
// near 150, or search results cut them off.

import wikiIndex from '../generated/wiki/index.json'
import { copies } from '../i18n/index.ts'
import { homePath, type Locale, locales } from '../i18n/locales.ts'
import { origin } from './site.ts'

export { origin }

export type PageMeta = {
  path: string
  title: string
  description: string
  /** The language of the page, for <html lang> and og:locale. */
  lang: string
  /** The same page in other languages, for hreflang. */
  alternates?: { lang: string; path: string }[]
  /** Only the 404 page: kept out of search results and the sitemap. */
  noindex?: boolean
}

const homeAlternates = locales.map((locale) => ({ lang: locale, path: homePath(locale) }))

const homePages: PageMeta[] = locales.map((locale: Locale) => ({
  path: homePath(locale),
  title: copies[locale].meta.title,
  description: copies[locale].meta.description,
  lang: copies[locale].htmlLang,
  alternates: homeAlternates,
}))

const legalPages: PageMeta[] = [
  {
    path: '/privacy/',
    title: 'Privacy policy – Allay',
    description:
      'What allay.chat stores about players and server owners, for how long, who processes it, and how to have it erased.',
    lang: 'en',
  },
  {
    path: '/terms/',
    title: 'Terms of service – Allay',
    description:
      'The terms for using the hosted Allay backend at allay.chat: your own key, subscriptions in Telegram Stars, and fair use.',
    lang: 'en',
  },
]

const wikiPages: PageMeta[] = wikiIndex.books.flatMap((book) =>
  book.pages.map((page) => ({
    path: page.path,
    title:
      page.name.toLowerCase() === 'home'
        ? `${book.title} wiki – Allay`
        : `${page.title} – ${book.title} wiki`,
    description: page.description || `${page.title}, from the ${book.title} manual.`,
    lang: 'en',
  })),
)

export const pages: PageMeta[] = [...homePages, ...legalPages, ...wikiPages]

export const notFoundPage: PageMeta = {
  path: '/404/',
  title: 'Page not found – Allay',
  description: 'This page doesn’t exist. Allay is an AI helper for Minecraft servers.',
  lang: 'en',
  noindex: true,
}

/** A path as the site spells it: with a trailing slash, without index.html. */
export function normalizePath(pathname: string): string {
  const path = pathname.replace(/\/index\.html$/, '/')
  return path.endsWith('/') ? path : `${path}/`
}

export function pageFor(pathname: string): PageMeta {
  const path = normalizePath(pathname)
  return pages.find((page) => page.path === path) ?? notFoundPage
}

/** Open Graph wants a language with a country. */
const ogLocales: Record<string, string> = { en: 'en_US', ru: 'ru_RU', es: 'es_ES' }

function escapeAttribute(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
}

function escapeText(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;')
}

function structuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Allay',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Spigot, Paper',
    url: `${origin}/`,
    downloadUrl: 'https://github.com/allay-ai/minecraft/releases/latest',
    license: 'https://opensource.org/license/mit',
    description: copies.en.meta.description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }
}

/**
 * The route-specific head tags as HTML. Every tag carries `data-route-head`,
 * which is how the client finds and replaces them on the next navigation.
 */
export function headTags(page: PageMeta): string {
  const url = `${origin}${page.path}`
  const title = escapeAttribute(page.title)
  const description = escapeAttribute(page.description)
  const tags = [
    `<title data-route-head>${escapeText(page.title)}</title>`,
    `<meta data-route-head name="description" content="${description}" />`,
    `<meta data-route-head property="og:title" content="${title}" />`,
    `<meta data-route-head property="og:description" content="${description}" />`,
    `<meta data-route-head property="og:locale" content="${ogLocales[page.lang] ?? 'en_US'}" />`,
  ]
  if (page.noindex) {
    tags.push('<meta data-route-head name="robots" content="noindex" />')
  } else {
    tags.push(
      `<link data-route-head rel="canonical" href="${url}" />`,
      `<meta data-route-head property="og:url" content="${url}" />`,
    )
  }
  for (const alternate of page.alternates ?? []) {
    tags.push(
      `<link data-route-head rel="alternate" hreflang="${alternate.lang}" href="${origin}${alternate.path}" />`,
    )
  }
  if (page.alternates) {
    tags.push(`<link data-route-head rel="alternate" hreflang="x-default" href="${origin}/" />`)
  }
  if (page.path === '/') {
    // `<` is escaped so no string in the data can close the script element.
    const json = JSON.stringify(structuredData()).replace(/</g, '\\u003c')
    tags.push(`<script data-route-head type="application/ld+json">${json}</script>`)
  }
  return tags.join('\n    ')
}
