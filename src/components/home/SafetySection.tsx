import type { Copy } from '../../i18n/types.ts'
import { FeatureIcon } from './FeatureIcon.tsx'
import styles from './SafetySection.module.less'
import { Section } from './Section.tsx'

export function SafetySection({ safety }: { safety: Copy['safety'] }) {
  return (
    <Section
      id="safety"
      kicker={safety.kicker}
      title={safety.title}
      lead={safety.lead}
      tone="tinted"
    >
      <ul className={styles.list}>
        {safety.items.map((item) => (
          <li key={item.title} className={styles.item}>
            <FeatureIcon name="shield" className={styles.icon} />
            <div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
