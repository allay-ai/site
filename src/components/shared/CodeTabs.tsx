import { type ReactNode, useId, useState } from 'react'
import styles from './CodeBlock.module.less'
import { highlightYaml } from './CodeBlock.tsx'
import { CopyButton } from './CopyButton.tsx'

type Tab = { id: string; label: string; icon?: ReactNode; code: string }

type CodeTabsProps = { tabs: Tab[]; file: string; copyLabel: string; copiedLabel: string }

/** Several YAML files in one block, one tab each, like an editor's open files. */
export function CodeTabs({ tabs, file, copyLabel, copiedLabel }: CodeTabsProps) {
  const [current, setCurrent] = useState(tabs[0].id)
  const base = useId()
  const tab = tabs.find(({ id }) => id === current) ?? tabs[0]

  return (
    <div className={`${styles.block} ${styles.tabbed}`}>
      <div className={`${styles.head} ${styles.tabsHead}`}>
        <div className={styles.tabs} role="tablist">
          {tabs.map(({ id, label, icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              id={`${base}-${id}`}
              aria-selected={id === tab.id}
              aria-controls={`${base}-panel`}
              className={styles.tab}
              onClick={() => setCurrent(id)}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
        <span className={`${styles.title} ${styles.tabsFile}`}>{file}</span>
      </div>
      <div className={styles.tabsCopy}>
        <CopyButton text={tab.code} label={copyLabel} copiedLabel={copiedLabel} />
      </div>
      <pre
        className={styles.pre}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling box needs focus so a keyboard can scroll it
        tabIndex={0}
        role="tabpanel"
        id={`${base}-panel`}
        aria-labelledby={`${base}-${tab.id}`}
      >
        <code>{highlightYaml(tab.code)}</code>
      </pre>
    </div>
  )
}
