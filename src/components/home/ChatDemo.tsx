import type { Copy } from '../../i18n/types.ts'
import styles from './ChatDemo.module.less'

const hotbarSlots = [1, 2, 3, 4, 5, 6, 7, 8, 9]

/**
 * A still of Allay at work, drawn the way the plugin draws it: tool lines with
 * ⏺ and ⎿, the answer behind “✦ Allay »”, buttons in brackets, and the status
 * line over the hotbar. The lines appear one after another in CSS; with reduced
 * motion they are all there at once. The text is real text, not a picture.
 */
export function ChatDemo({ demo }: { demo: Copy['demo'] }) {
  return (
    <figure className={styles.figure}>
      <div className={styles.screen}>
        <p className="visually-hidden">{demo.label}</p>
        <div className={styles.scenery} aria-hidden="true">
          <span className={styles.sun} />
          <span className={styles.hills} />
          <span className={styles.ground} />
        </div>
        <ol className={styles.chat}>
          {demo.lines.map((line, index) => {
            const step = styles[`step${index + 1}`]
            if (line.kind === 'tool') {
              return (
                <li key={line.label} className={`${styles.line} ${step}`}>
                  <span className={styles.gray}>⏺ {line.label}</span>
                  <br />
                  <span className={styles.dark}>{'  ⎿ '}</span>
                  <span className={styles.dark}>{line.result}</span>
                </li>
              )
            }
            if (line.kind === 'answer') {
              return (
                <li key="answer" className={`${styles.line} ${step}`}>
                  <span className={styles.aquaDark}>✦ </span>
                  <span className={styles.aqua}>Allay </span>
                  <span className={styles.dark}>» </span>
                  <span className={styles.white}>{line.text}</span>
                </li>
              )
            }
            return (
              <li key="buttons" className={`${styles.line} ${step}`}>
                {line.labels.map((label) => (
                  <span key={label} className={styles.button}>
                    [{label}]
                  </span>
                ))}
              </li>
            )
          })}
        </ol>
        <p className={styles.status}>{demo.status}</p>
        <div className={styles.hotbar} aria-hidden="true">
          {hotbarSlots.map((slot) => (
            <span key={slot} className={slot === 1 ? styles.slotActive : styles.slot} />
          ))}
        </div>
        <p className={styles.input}>
          <span className={styles.typed}>{demo.command}</span>
          <span className={styles.caret} aria-hidden="true" />
        </p>
      </div>
      <figcaption className={styles.caption}>{demo.caption}</figcaption>
    </figure>
  )
}
