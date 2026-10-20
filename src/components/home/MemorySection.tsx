import type { Copy } from '../../i18n/types.ts'
import styles from './MemorySection.module.less'
import { Section } from './Section.tsx'

export function MemorySection({
  memory,
  languages,
}: {
  memory: Copy['memory']
  languages: Copy['languages']
}) {
  return (
    <Section id="memory" kicker={memory.kicker} title={memory.title}>
      <ol className={styles.cards}>
        {memory.items.map((item) => (
          <li key={item.title} className={styles.card}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.body}>{item.body}</p>
          </li>
        ))}
      </ol>
      <div className={styles.languages} id="languages">
        <div className={styles.languagesText}>
          <p className={styles.kicker}>{languages.kicker}</p>
          <h3 className={styles.languagesTitle}>{languages.title}</h3>
          <p>{languages.lead}</p>
          <p className={styles.note}>{languages.note}</p>
        </div>
        <ul className={styles.chips}>
          {languages.names.map((name) => (
            <li key={name} className={styles.chip}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
