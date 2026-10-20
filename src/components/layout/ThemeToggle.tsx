import { MoonIcon, SunIcon } from '../shared/icons.tsx'
import styles from './ThemeToggle.module.less'

type ThemeToggleProps = { toLight: string; toDark: string }

/**
 * Flips between the light and the dark theme and remembers the choice. It keeps
 * no React state: which icon and label show is decided by CSS from data-theme
 * and prefers-color-scheme, so the prerendered button is right before any
 * script runs.
 */
export function ThemeToggle({ toLight, toDark }: ThemeToggleProps) {
  function toggle() {
    const root = document.documentElement
    const current =
      root.dataset.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    const next = current === 'dark' ? 'light' : 'dark'
    root.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Storage can be off; the choice then lasts until the page reloads.
    }
  }

  return (
    <button type="button" className={styles.toggle} onClick={toggle}>
      <span className={styles.whenLight}>
        <MoonIcon className={styles.icon} />
        <span className="visually-hidden">{toDark}</span>
      </span>
      <span className={styles.whenDark}>
        <SunIcon className={styles.icon} />
        <span className="visually-hidden">{toLight}</span>
      </span>
    </button>
  )
}
