import type { Copy } from '../../i18n/types.ts'
import { FeatureIcon } from './FeatureIcon.tsx'
import styles from './Features.module.less'
import { Section } from './Section.tsx'

export function Features({ features }: { features: Copy['features'] }) {
  return (
    <Section id="features" kicker={features.kicker} title={features.title} lead={features.lead}>
      <ul className={styles.grid}>
        {features.items.map((item) => (
          <li key={item.title} className={styles.card}>
            <span className={styles.icon}>
              <FeatureIcon name={item.icon} className={styles.svg} />
            </span>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.body}>{item.body}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
