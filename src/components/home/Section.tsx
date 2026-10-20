import type { ReactNode } from 'react'
import styles from './Section.module.less'

type SectionProps = {
  id: string
  kicker: string
  title: string
  lead?: ReactNode
  tone?: 'plain' | 'tinted'
  children: ReactNode
}

/** A front-page section: a small kicker, a heading the nav can jump to, and its content. */
export function Section({ id, kicker, title, lead, tone = 'plain', children }: SectionProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${tone === 'tinted' ? styles.tinted : ''}`}
      aria-labelledby={`${id}-title`}
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.kicker}>{kicker}</p>
          <h2 id={`${id}-title`} className={styles.title}>
            {title}
          </h2>
          {lead && <p className={styles.lead}>{lead}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
