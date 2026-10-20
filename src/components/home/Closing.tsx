import { links } from '../../data/site.ts'
import type { Copy } from '../../i18n/types.ts'
import { Logo } from '../shared/Logo.tsx'
import styles from './Closing.module.less'

export function Closing({ closing }: { closing: Copy['closing'] }) {
  return (
    <section className={styles.wrap} aria-labelledby="closing-title">
      <div className={styles.band}>
        <Logo className={styles.mark} />
        <div className={styles.text}>
          <h2 id="closing-title" className={styles.title}>
            {closing.title}
          </h2>
          <p className={styles.body}>{closing.body}</p>
          <p className={styles.address}>
            <code>{closing.address}</code>
          </p>
        </div>
        <a className={styles.cta} href={links.moonlands}>
          {closing.cta}
        </a>
      </div>
    </section>
  )
}
