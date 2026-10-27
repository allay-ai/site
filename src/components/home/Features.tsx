import type { Copy } from '../../i18n/types.ts'
import styles from './Features.module.less'
import { Section } from './Section.tsx'

/**
 * The item in each moment's slot, in the order of Copy's moments: Minecraft's own
 * icons from public/mc/item/ (the 26.3 client jar, textures/item/).
 */
const items = [
  'diamond_sword',
  'knowledge_book',
  'spyglass',
  'recovery_compass',
  'raw_gold',
  'redstone',
  'writable_book',
]

/** What players get: each moment as the question they'd type in chat, then what Allay does. */
export function Features({ features }: { features: Copy['features'] }) {
  return (
    <Section id="features" title={features.title} lead={features.lead}>
      <ol className={styles.moments}>
        {features.moments.map((moment, index) => (
          <li key={moment.ask} className={styles.moment}>
            <div className={styles.line}>
              <span className={styles.slot} aria-hidden="true">
                <img
                  className={styles.item}
                  src={`/mc/item/${items[index]}.png`}
                  alt=""
                  width={16}
                  height={16}
                />
              </span>
              <p className={styles.ask}>
                <span className={styles.command}>/ask</span> {moment.ask}
              </p>
            </div>
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
