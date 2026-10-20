import { useState } from 'react'
import styles from './CopyButton.module.less'
import { CheckIcon, CopyIcon } from './icons.tsx'

type CopyButtonProps = { text: string; label: string; copiedLabel: string }

export function CopyButton({ text, label, copiedLabel }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // The browser may deny the clipboard; the text stays selectable.
    }
  }

  return (
    <button type="button" className={styles.button} onClick={copy}>
      {copied ? <CheckIcon className={styles.icon} /> : <CopyIcon className={styles.icon} />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  )
}
