import type { Copy } from '../../i18n/types.ts'
import styles from './FaqSection.module.less'
import { Section } from './Section.tsx'

export function FaqSection({ faq }: { faq: Copy['faq'] }) {
  return (
    <Section id="faq" title={faq.title} layout="split">
      <div className={styles.list}>
        {faq.items.map((item) => (
          <details key={item.question} className={styles.item}>
            <summary className={styles.question}>{item.question}</summary>
            <p className={styles.answer}>{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
