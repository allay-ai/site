import { Link } from 'react-router-dom'
import { links } from '../../data/site.ts'
import { copies } from '../../i18n/index.ts'
import { homePath, type Locale } from '../../i18n/locales.ts'
import { Logo } from '../shared/Logo.tsx'
import styles from './Footer.module.less'

/** A colophon: who made Allay, every page and repository in one run of links, and the notice. */
export function Footer({ locale }: { locale: Locale }) {
  const { ui } = copies[locale]
  const home = homePath(locale)

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link to={home} className={styles.brandLink}>
          <Logo className={styles.mark} />
          <span className={styles.wordmark}>Allay</span>
        </Link>
        <p className={styles.credit}>{ui.footer.madeBy}</p>
        <nav aria-label={ui.footer.docs}>
          <ul className={styles.links}>
            <li>
              <Link to={`${home}#features`}>{ui.nav.features}</Link>
            </li>
            <li>
              <Link to={`${home}#pricing`}>{ui.nav.pricing}</Link>
            </li>
            <li>
              <Link to={`${home}#install`}>{ui.nav.install}</Link>
            </li>
            <li>
              <Link to={`${home}#faq`}>{ui.nav.faq}</Link>
            </li>
            <li>
              <Link to="/wiki/plugin/">{ui.footer.pluginWiki}</Link>
            </li>
            <li>
              <Link to="/wiki/">{ui.footer.serverWiki}</Link>
            </li>
            <li>
              <a href={links.plugin}>allay-ai/minecraft</a>
            </li>
            <li>
              <a href={links.server}>allay-ai/server</a>
            </li>
            <li>
              <a href={links.pluginReleases}>{ui.footer.releases}</a>
            </li>
            <li>
              <Link to="/privacy/">{ui.footer.privacy}</Link>
            </li>
            <li>
              <Link to="/terms/">{ui.footer.terms}</Link>
            </li>
          </ul>
        </nav>
        <p className={styles.disclaimer}>{ui.footer.notMojang}</p>
      </div>
    </footer>
  )
}
