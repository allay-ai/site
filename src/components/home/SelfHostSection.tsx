import { Link } from 'react-router-dom'
import snippets from '../../generated/snippets.json'
import type { Copy } from '../../i18n/types.ts'
import { CodeBlock } from '../shared/CodeBlock.tsx'
import { ArrowIcon } from '../shared/icons.tsx'
import { Section } from './Section.tsx'
import styles from './SelfHostSection.module.less'

export function SelfHostSection({ copy }: { copy: Copy }) {
  const { selfHost, ui } = copy
  return (
    <Section
      id="self-hosting"
      kicker={selfHost.kicker}
      title={selfHost.title}
      lead={selfHost.lead}
      tone="tinted"
    >
      <div className={styles.split}>
        <div className={styles.text}>
          <ol className={styles.steps}>
            {selfHost.steps.map((step, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: a fixed list of steps
              <li key={index}>{step}</li>
            ))}
          </ol>
          <Link to="/wiki/self-hosting-with-docker/" className={styles.more}>
            {selfHost.more}
            <ArrowIcon className={styles.arrow} />
          </Link>
        </div>
        <CodeBlock
          code={snippets.selfHostCompose}
          language="yaml"
          title="compose.yaml"
          copyLabel={ui.copy}
          copiedLabel={ui.copied}
        />
      </div>
    </Section>
  )
}
