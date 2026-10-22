import type { Copy } from '../../i18n/types.ts'
import { FeatureIcon } from './FeatureIcon.tsx'
import styles from './PrivacySection.module.less'
import { Section } from './Section.tsx'

/** What allay.chat does with players' data, under which laws; the privacy policy has the rest. */
export function PrivacySection({ privacy }: { privacy: Copy['privacy'] }) {
  return (
    <Section id="privacy" kicker={privacy.kicker} title={privacy.title} lead={privacy.lead}>
      <ul className={styles.laws}>
        {privacy.laws.map((law) => (
          <li key={law} className={styles.law}>
            <FeatureIcon name="lock" className={styles.lawIcon} />
            {law}
          </li>
        ))}
      </ul>
      <ul className={styles.list}>
        {privacy.items.map((item) => (
          <li key={item.title} className={styles.item}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.body}>{item.body}</p>
          </li>
        ))}
      </ul>
      <p className={styles.more}>{privacy.more}</p>
    </Section>
  )
}
