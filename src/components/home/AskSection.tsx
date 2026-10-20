import type { Copy } from '../../i18n/types.ts'
import styles from './AskSection.module.less'
import { Section } from './Section.tsx'

export function AskSection({ ask }: { ask: Copy['ask'] }) {
  return (
    <Section id="ask" kicker={ask.kicker} title={ask.title} lead={ask.lead} tone="tinted">
      <div className={styles.split}>
        <dl className={styles.commands}>
          {ask.commands.map((item) => (
            <div key={item.command} className={styles.command}>
              <dt>
                <code className={styles.code}>{item.command}</code>
              </dt>
              <dd>{item.what}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.chat}>
          <h3 className={styles.chatTitle}>{ask.chatTitle}</h3>
          <p>{ask.chatLead}</p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">{ask.youWrite}</th>
                <th scope="col">{ask.itGoes}</th>
              </tr>
            </thead>
            <tbody>
              {ask.prefixes.map((row) => (
                <tr key={row.input}>
                  <td>
                    <code>{row.input}</code>
                  </td>
                  <td>{row.goes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  )
}
