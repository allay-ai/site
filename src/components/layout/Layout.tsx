import { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { copies } from '../../i18n/index.ts'
import { localeOf } from '../../i18n/locales.ts'
import { Footer } from './Footer.tsx'
import { Header } from './Header.tsx'
import styles from './Layout.module.less'
import { RouteHead } from './RouteHead.tsx'

/**
 * Client navigation keeps the scroll position of the page it left, and a Link
 * to /#pricing changes only the hash. This puts the reader at the top of a new
 * page, or at the section a link names.
 */
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)
  // biome-ignore lint/correctness/useExhaustiveDependencies: a new pathname is a new page, even with no hash
  useEffect(() => {
    // The browser already placed a freshly loaded page, hash or not.
    if (first.current) {
      first.current = false
      return
    }
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])
}

export function Layout() {
  const { pathname } = useLocation()
  const locale = localeOf(pathname)
  useScrollOnNavigate()

  return (
    <div className={styles.shell}>
      <RouteHead />
      <a className={styles.skip} href="#content">
        {copies[locale].ui.skipToContent}
      </a>
      <Header locale={locale} />
      <main className={styles.main} id="content" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer locale={locale} />
    </div>
  )
}
