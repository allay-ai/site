import type { ReactNode } from 'react'
import styles from './CodeBlock.module.less'
import { CopyButton } from './CopyButton.tsx'

type CodeBlockProps = {
  code: string
  language?: 'yaml' | 'bash'
  title?: string
  copyLabel: string
  copiedLabel: string
}

// Just enough YAML colouring for the snippets on the front page: comments,
// keys, and quoted strings. The wiki's code blocks are highlighted at build time
// by Prism instead (tools/content.mjs), so the page ships no highlighter.
export function highlightYaml(code: string): ReactNode[] {
  return code.split('\n').map((line, index) => {
    const parts: ReactNode[] = []
    const comment = line.match(/^(.*?)(\s#.*|^#.*)$/)
    const body = comment ? comment[1] : line
    const key = body.match(/^(\s*(?:-\s+)?)([\w.-]+)(:)(.*)$/)
    if (key) {
      parts.push(
        key[1],
        <span key="k" className={styles.key}>
          {key[2]}
        </span>,
        key[3],
      )
      parts.push(...strings(key[4]))
    } else {
      parts.push(...strings(body))
    }
    if (comment)
      parts.push(
        <span key="c" className={styles.comment}>
          {comment[2]}
        </span>,
      )
    return (
      // biome-ignore lint/suspicious/noArrayIndexKey: lines of a fixed snippet never reorder
      <span key={index} className={styles.line}>
        {parts}
        {'\n'}
      </span>
    )
  })
}

function strings(text: string): ReactNode[] {
  return text.split(/("[^"]*")/).map((part, index) =>
    part.startsWith('"') ? (
      // biome-ignore lint/suspicious/noArrayIndexKey: pieces of one line never reorder
      <span key={index} className={styles.string}>
        {part}
      </span>
    ) : (
      part
    ),
  )
}

export function CodeBlock({ code, language, title, copyLabel, copiedLabel }: CodeBlockProps) {
  return (
    <div className={styles.block}>
      <div className={styles.head}>
        <span className={styles.title}>{title ?? language}</span>
        <CopyButton text={code} label={copyLabel} copiedLabel={copiedLabel} />
      </div>
      {/* biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling box needs focus so a keyboard can scroll it */}
      <pre className={styles.pre} tabIndex={0}>
        <code>{language === 'yaml' ? highlightYaml(code) : code}</code>
      </pre>
    </div>
  )
}
