import { type MouseEvent, useState } from 'react'
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import { ExternalIcon } from '../components/shared/icons.tsx'
import { WikiSidebar } from '../components/wiki/WikiSidebar.tsx'
import { normalizePath } from '../data/pages.ts'
import { books, entryFor, sourceUrl, type WikiDoc } from '../wiki/content.ts'
import styles from './WikiPage.module.less'

/**
 * One wiki page. The route's loader (routes.tsx) has fetched its rendered HTML
 * already, so the first render has it, in the prerender and on hydration alike.
 */
export function WikiPage() {
  const doc = useLoaderData() as WikiDoc
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const current = normalizePath(pathname)
  const entry = entryFor(current)
  const book = books.find((candidate) => candidate.id === doc.book) ?? books[0]

  // Links inside the rendered Markdown are plain anchors. Those that stay on
  // the site go through the router, so the page doesn't reload.
  function followInternalLink(event: MouseEvent<HTMLDivElement>) {
    const anchor = (event.target as HTMLElement).closest('a')
    const href = anchor?.getAttribute('href')
    if (
      !href?.startsWith('/') ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    setMenuOpen(false)
    navigate(href)
  }

  return (
    <div className={styles.page}>
      <aside className={styles.side}>
        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="wiki-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Hide the wiki’s pages' : 'All wiki pages'}
        </button>
        <div id="wiki-nav" className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <WikiSidebar books={books} current={current} />
        </div>
      </aside>

      <article className={styles.article}>
        <header className={styles.header}>
          <p className={styles.crumbs}>
            <Link to="/wiki/">Wiki</Link>
            <span aria-hidden="true"> / </span>
            <Link to={book.base}>{book.title}</Link>
          </p>
          <h1 className={styles.title}>{doc.title}</h1>
        </header>

        {/* biome-ignore lint/a11y/noStaticElementInteractions: only catches clicks that bubble up from real links */}
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Enter on a link fires this same click */}
        <div
          className={styles.prose}
          onClick={followInternalLink}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: tools/content.mjs renders it at build time and escapes raw HTML
          dangerouslySetInnerHTML={{ __html: doc.html }}
        />

        <footer className={styles.footer}>
          {entry && (
            <a className={styles.source} href={sourceUrl(book, entry.page)}>
              <ExternalIcon className={styles.sourceIcon} />
              Edit this page on GitHub
            </a>
          )}
          {/* biome-ignore lint/a11y/noStaticElementInteractions: only catches clicks that bubble up from real links */}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: Enter on a link fires this same click */}
          <div
            className={styles.wikiFooter}
            onClick={followInternalLink}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: rendered and escaped at build time, like the page
            dangerouslySetInnerHTML={{ __html: book.footerHtml }}
          />
        </footer>
      </article>

      {doc.toc.length > 1 && (
        <nav className={styles.toc} aria-label="On this page">
          <p className={styles.tocTitle}>On this page</p>
          <ul>
            {doc.toc.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.text}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
