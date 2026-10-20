// The wiki as tools/content.mjs rendered it. The index (books, sidebars, page
// list) is small and ships with every wiki page; each page's HTML is its own
// chunk, loaded by the route's loader only when someone opens that page.

import { normalizePath } from '../data/pages.ts'
import wikiIndex from '../generated/wiki/index.json'

export type WikiBook = (typeof wikiIndex.books)[number]
export type WikiPageEntry = WikiBook['pages'][number]

export type WikiDoc = {
  book: string
  path: string
  title: string
  description: string
  /** Rendered and sanitized at build time: raw HTML in the Markdown arrives as text. */
  html: string
  toc: { id: string; text: string }[]
}

export const books: WikiBook[] = wikiIndex.books

const chunks = import.meta.glob<WikiDoc>('../generated/wiki/pages/*.json', { import: 'default' })

export function entryFor(pathname: string): { book: WikiBook; page: WikiPageEntry } | undefined {
  const path = normalizePath(pathname)
  for (const book of books) {
    const page = book.pages.find((candidate) => candidate.path === path)
    if (page) return { book, page }
  }
  return undefined
}

export async function loadWikiDoc(pathname: string): Promise<WikiDoc | undefined> {
  const entry = entryFor(pathname)
  const chunk = entry && chunks[`../generated/wiki/pages/${entry.page.file}`]
  return chunk ? chunk() : undefined
}

/** The page's address on GitHub, for “Edit on GitHub”. */
export function sourceUrl(book: WikiBook, page: WikiPageEntry): string {
  return `${book.editUrl}/${page.name}`
}
