import type { ReactNode } from 'react'
import styles from './Section.module.less'

type SectionProps = {
  id: string
  title: string
  lead?: ReactNode
  /** A band changes the paper edge to edge; the page's seams alternate between the two. */
  tone?: 'plain' | 'band'
  /** A split puts the heading on the left and holds it there while the content scrolls past. */
  layout?: 'stack' | 'split'
  children: ReactNode
}

/** A front-page section: a heading the nav can jump to, one line under it, and its content. */
export function Section({
  id,
  title,
  lead,
  tone = 'plain',
  layout = 'stack',
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${tone === 'band' ? styles.band : ''}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={`${styles.inner} ${layout === 'split' ? styles.split : ''}`}>
        <header className={styles.header}>
          <h2 id={`${id}-title`} className={styles.title}>
            {title}
          </h2>
          {lead && <p className={styles.lead}>{lead}</p>}
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  )
}
