import type { Copy } from '../../i18n/types.ts'
import { FeatureIcon } from './FeatureIcon.tsx'
import styles from './Features.module.less'
import { Section } from './Section.tsx'

/** What players get: the killer features as big cards with a question to try, then the rest. */
export function Features({ features }: { features: Copy['features'] }) {
  return (
    <Section id="features" kicker={features.kicker} title={features.title} lead={features.lead}>
      <h3 className={styles.groupTitle}>{features.killerTitle}</h3>
      <ul className={styles.killer}>
        {features.killer.map((item) => (
          <li key={item.title} className={styles.card}>
            <span className={styles.icon}>
              <FeatureIcon name={item.icon} className={styles.svg} />
            </span>
            <h4 className={styles.title}>{item.title}</h4>
            <p className={styles.body}>{item.body}</p>
            {item.ask && (
              <p className={styles.ask}>
                <span className={styles.command}>/ask</span> {item.ask}
              </p>
            )}
          </li>
        ))}
      </ul>

      <h3 className={styles.groupTitle}>{features.otherTitle}</h3>
      <ul className={styles.other}>
        {features.other.map((item) => (
          <li key={item.title} className={styles.item}>
            <FeatureIcon name={item.icon} className={styles.itemIcon} />
            <div>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <p className={styles.itemBody}>{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
