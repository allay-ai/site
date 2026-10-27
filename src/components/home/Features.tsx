import { useId, useState } from 'react'
import type { Copy } from '../../i18n/types.ts'
import styles from './Features.module.less'
import { Section } from './Section.tsx'

/**
 * What players get: the moments as the game's buttons, and the chosen one in the
 * game's window, the way the chat shows it: Allay's answer with its buttons over
 * the input line where the player typed the question. The first moment shows
 * without a script; the others need a click.
 */
export function Features({ features }: { features: Copy['features'] }) {
  const [current, setCurrent] = useState(0)
  const base = useId()
  const moment = features.moments[current]

  return (
    <Section id="features" title={features.title} lead={features.lead}>
      <div className={styles.switcher}>
        <div className={styles.list} role="tablist" aria-label={features.title}>
          {features.moments.map((item, index) => (
            <button
              key={item.ask}
              type="button"
              role="tab"
              id={`${base}-tab-${index}`}
              aria-selected={index === current}
              aria-controls={`${base}-panel`}
              className={styles.choice}
              onClick={() => setCurrent(index)}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div
          className={styles.panel}
          role="tabpanel"
          id={`${base}-panel`}
          aria-labelledby={`${base}-tab-${current}`}
        >
          <div className={styles.window}>
            <p className={styles.chat}>
              <span className={styles.mark}>✦ </span>
              <span className={styles.speaker}>{features.speaker}</span>
              <span className={styles.arrow}> » </span>
              {moment.answer}
              {moment.buttons?.map((label) => (
                <span key={label} className={styles.button}>
                  {' '}
                  [{label}]
                </span>
              ))}
            </p>
            <p className={styles.input}>
              <span className={styles.command}>/ask</span> {moment.ask}
            </p>
          </div>
          <p className={styles.body}>{moment.body}</p>
          <p className={styles.example}>{features.example}</p>
        </div>
      </div>
      <p id="languages" className={styles.more}>
        {features.more}
      </p>
    </Section>
  )
}
