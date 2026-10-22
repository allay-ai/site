import { MonitorIcon, MoonIcon, SunIcon } from '../shared/icons.tsx'
import styles from './ThemeToggle.module.less'

type ThemeToggleProps = { labels: { system: string; light: string; dark: string } }

/** The order the button steps through: no choice follows the system. */
const next = { system: 'light', light: 'dark', dark: 'system' } as const

/**
 * Steps through the system, light, and dark themes and remembers the choice. It
 * keeps no React state: which icon and label show is decided by CSS from
 * data-theme, so the prerendered button is right before any script runs. With
 * no data-theme the page follows prefers-color-scheme, live.
 */
export function ThemeToggle({ labels }: ThemeToggleProps) {
  function toggle() {
    const root = document.documentElement
    const current =
      root.dataset.theme === 'light' || root.dataset.theme === 'dark'
        ? root.dataset.theme
        : 'system'
    const chosen = next[current]
    if (chosen === 'system') delete root.dataset.theme
    else root.dataset.theme = chosen
    try {
      if (chosen === 'system') localStorage.removeItem('theme')
      else localStorage.setItem('theme', chosen)
    } catch {
      // Storage can be off; the choice then lasts until the page reloads.
    }
  }

  return (
    <button type="button" className={styles.toggle} onClick={toggle}>
      <span className={styles.whenSystem} title={labels.system}>
        <MonitorIcon className={styles.icon} />
        <span className="visually-hidden">{labels.system}</span>
      </span>
      <span className={styles.whenLight} title={labels.light}>
        <SunIcon className={styles.icon} />
        <span className="visually-hidden">{labels.light}</span>
      </span>
      <span className={styles.whenDark} title={labels.dark}>
        <MoonIcon className={styles.icon} />
        <span className="visually-hidden">{labels.dark}</span>
      </span>
    </button>
  )
}
