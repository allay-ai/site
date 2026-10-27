import type { Locale } from '../../i18n/locales.ts'
import type { Copy } from '../../i18n/types.ts'
import styles from './PrivacySection.module.less'
import { Section } from './Section.tsx'
import { ShotGrid } from './ShotsSection.tsx'

/** Fair play and players' data: what keeps Allay from cheating, what allay.chat keeps, and the windows players see. */
export function PrivacySection({
  privacy,
  shots,
  locale,
}: {
  privacy: Copy['privacy']
  shots: Copy['shots']
  locale: Locale
}) {
  return (
    <Section id="privacy" title={privacy.title} lead={privacy.lead}>
      <div className={styles.layout}>
        <dl id="safety" className={styles.items}>
          {privacy.items.map((item) => (
            <div key={item.title} className={styles.item}>
              <dt className={styles.title}>{item.title}</dt>
              <dd className={styles.body}>{item.body}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.shots}>
          <ShotGrid shots={shots} files={['consent']} locale={locale} />
        </div>
      </div>
      <p className={styles.more}>{privacy.more}</p>
    </Section>
  )
}
