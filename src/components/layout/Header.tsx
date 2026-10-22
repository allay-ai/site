import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { links } from '../../data/site.ts'
import { copies } from '../../i18n/index.ts'
import { homePath, type Locale, localeNames, locales } from '../../i18n/locales.ts'
import { CloseIcon, GitHubIcon, MenuIcon } from '../shared/icons.tsx'
import { Logo } from '../shared/Logo.tsx'
import styles from './Header.module.less'
import { ThemeToggle } from './ThemeToggle.tsx'

export function Header({ locale }: { locale: Locale }) {
  const { ui } = copies[locale]
  const { pathname, hash } = useLocation()
  const [open, setOpen] = useState(false)
  const home = homePath(locale)

  // A link in the open menu navigates; the menu then closes with it.
  // biome-ignore lint/correctness/useExhaustiveDependencies: closes on every navigation, by design
  useEffect(() => setOpen(false), [pathname, hash])

  const items = [
    { href: `${home}#features`, label: ui.nav.features },
    { href: `${home}#pricing`, label: ui.nav.pricing },
    { href: `${home}#install`, label: ui.nav.install },
    { href: `${home}#faq`, label: ui.nav.faq },
  ]
  const inWiki = pathname.startsWith('/wiki')

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link to={home} className={styles.brand}>
          <Logo className={styles.mark} />
          <span className={styles.name}>Allay AI</span>
        </Link>

        <nav
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label={ui.primaryNav}
          id="primary-nav"
        >
          {items.map((item) => (
            <Link key={item.href} to={item.href} className={styles.link}>
              {item.label}
            </Link>
          ))}
          <Link
            to="/wiki/"
            className={`${styles.link} ${inWiki ? styles.linkActive : ''}`}
            aria-current={inWiki ? 'page' : undefined}
          >
            {ui.nav.wiki}
          </Link>
          <div className={styles.languages}>
            {locales.map((code) => (
              <Link
                key={code}
                to={homePath(code)}
                lang={code}
                hrefLang={code}
                className={`${styles.language} ${code === locale ? styles.languageActive : ''}`}
                aria-current={code === locale && pathname === home ? 'page' : undefined}
                title={localeNames[code]}
                aria-label={localeNames[code]}
              >
                {code.toUpperCase()}
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle toLight={ui.themeToLight} toDark={ui.themeToDark} />
          <a className={styles.github} href={links.organization} aria-label={ui.github}>
            <GitHubIcon className={styles.githubIcon} />
          </a>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <CloseIcon className={styles.menuIcon} />
            ) : (
              <MenuIcon className={styles.menuIcon} />
            )}
            <span className="visually-hidden">{open ? ui.closeMenu : ui.menu}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
