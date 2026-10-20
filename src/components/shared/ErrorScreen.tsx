import type { ReactNode } from 'react'
import { useState } from 'react'
import styles from './ErrorScreen.module.less'
import { CopyIcon } from './icons.tsx'

type ErrorScreenProps = {
  kicker: string
  title: string
  description: ReactNode
  detail?: string
  onRetry?: () => void
}

const issueUrl = 'https://github.com/allay-ai/site/issues/new'

export function ErrorScreen({ kicker, title, description, detail, onRetry }: ErrorScreenProps) {
  const [copied, setCopied] = useState(false)

  async function copyDetail() {
    if (!detail) {
      return
    }

    try {
      await navigator.clipboard.writeText(detail)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard access can be denied by the browser. The report text stays
      // selectable in the block above.
    }
  }

  return (
    <section className={styles.wrap} role="alert">
      <p className={styles.kicker}>{kicker}</p>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>

      <div className={styles.actions}>
        {onRetry && (
          <button type="button" className={`${styles.action} ${styles.primary}`} onClick={onRetry}>
            Try again
          </button>
        )}
        {/* A plain anchor, not a Link: whatever broke is still mounted, so a
            full document load is the one navigation guaranteed to clear it. */}
        <a className={styles.action} href="/">
          Back to the front page
        </a>
        <a className={styles.action} href={issueUrl} target="_blank" rel="noreferrer">
          Report it
        </a>
      </div>

      {detail && (
        <details className={styles.details}>
          <summary className={styles.summary}>Technical details</summary>
          <pre className={styles.detailText}>{detail}</pre>
          <button type="button" className={styles.copy} onClick={copyDetail}>
            <CopyIcon />
            <span>{copied ? 'Copied' : 'Copy for a bug report'}</span>
          </button>
        </details>
      )}
    </section>
  )
}
