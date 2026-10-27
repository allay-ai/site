import type { Copy } from '../../i18n/types.ts'
import styles from './Features.module.less'
import { Section } from './Section.tsx'

/** What players get: each moment as the question they'd type in chat, then what Allay does. */
export function Features({ features }: { features: Copy['features'] }) {
  return (
    <Section id="features" title={features.title} lead={features.lead}>
      <ol className={styles.moments}>
        {features.moments.map((moment) => (
          <li key={moment.ask} className={styles.moment}>
            <p className={styles.ask}>
              <span className={styles.command}>/ask</span> {moment.ask}
            </p>
            <div className={styles.text}>
              <h3 className={styles.title}>{moment.title}</h3>
              <p className={styles.body}>{moment.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p id="languages" className={styles.more}>
        {features.more}
      </p>
    </Section>
  )
}
