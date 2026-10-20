import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { WikiBook } from '../../wiki/content.ts'
import styles from './WikiSidebar.module.less'

type WikiSidebarProps = { books: WikiBook[]; current: string }

/**
 * Both books' sidebars as the wikis draw them on GitHub, plus a filter over the
 * page titles. The filter starts empty, so the prerendered list is complete.
 */
export function WikiSidebar({ books, current }: WikiSidebarProps) {
  const [query, setQuery] = useState('')
  const needle = query.trim().toLowerCase()
  const matches = (title: string, path: string) => {
    if (!needle) return true
    const page = books.flatMap((book) => book.pages).find((candidate) => candidate.path === path)
    return `${title} ${page?.description ?? ''}`.toLowerCase().includes(needle)
  }

  return (
    <nav className={styles.sidebar} aria-label="Wiki">
      <label className={styles.filter}>
        <span className="visually-hidden">Filter pages</span>
        <input
          type="search"
          placeholder="Filter pages"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className={styles.input}
        />
      </label>
      {books.map((book) => (
        <div key={book.id} className={styles.book}>
          <Link
            to={book.base}
            className={`${styles.bookTitle} ${current === book.base ? styles.active : ''}`}
            aria-current={current === book.base ? 'page' : undefined}
          >
            {book.title}
          </Link>
          {book.sidebar.map((group, index) => {
            const items = group.items.filter(
              (item) =>
                item.path?.startsWith('/') &&
                item.path !== book.base &&
                matches(item.title, item.path),
            )
            if (!items.length) return null
            return (
              <div key={group.title ?? `group-${index}`} className={styles.group}>
                {group.title && <p className={styles.groupTitle}>{group.title}</p>}
                <ul className={styles.list}>
                  {items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path as string}
                        className={`${styles.link} ${current === item.path ? styles.active : ''}`}
                        aria-current={current === item.path ? 'page' : undefined}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
