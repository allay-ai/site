import type { Copy } from '../../i18n/types.ts'
import styles from './AskSection.module.less'

/** How a player asks: the three commands, and where each line goes in chat mode. */
export function AskBlock({ ask }: { ask: Copy['ask'] }) {
  return (
    <div id="ask" className={styles.block}>
      <h3 className={styles.title}>{ask.title}</h3>
      <p className={styles.lead}>{ask.lead}</p>
      <div className={styles.split}>
        <dl className={styles.commands}>
          {ask.commands.map((item) => (
            <div key={item.command} className={styles.command}>
              <dt className={styles.code}>{item.command}</dt>
              <dd>{item.what}</dd>
            </div>
          ))}
        </dl>
        <div className={styles.chat}>
          <h4 className={styles.chatTitle}>{ask.chatTitle}</h4>
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
                  <td className={styles.input}>{row.input}</td>
                  <td>{row.goes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
