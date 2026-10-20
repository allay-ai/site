import type { ReactNode } from 'react'
import styles from './LegalPage.module.less'

export type LegalSection = { id: string; title: string; body: ReactNode }

type LegalPageProps = {
  title: string
  updated: string
  intro: ReactNode
  sections: LegalSection[]
}

/** A long legal text with its contents on the side, readable at 360 px. */
export function LegalPage({ title, updated, intro, sections }: LegalPageProps) {
  return (
    <article className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.updated}>{updated}</p>
        <div className={styles.intro}>{intro}</div>
      </header>
      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="Contents">
          <p className={styles.tocTitle}>Contents</p>
          <ol>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.body}>
          {sections.map((section, index) => (
            <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`}>
              <h2 id={`${section.id}-title`}>
                {index + 1}. {section.title}
              </h2>
              {section.body}
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}

/**
 * Where the owner has to write in their legal identity before the page may go
 * live. It shows as a highlighted [[NAME]], so it can't slip through unseen.
 */
export function Fill({ children }: { children: string }) {
  return <mark className={styles.fill}>[[{children}]]</mark>
}
