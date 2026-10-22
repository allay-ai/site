import { Link } from 'react-router-dom'
import { links } from '../../data/site.ts'
import { copies } from '../../i18n/index.ts'
import { homePath, type Locale } from '../../i18n/locales.ts'
import { Logo } from '../shared/Logo.tsx'
import styles from './Footer.module.less'

export function Footer({ locale }: { locale: Locale }) {
  const { ui } = copies[locale]
  const home = homePath(locale)

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link to={home} className={styles.brandLink}>
            <Logo className={styles.mark} />
            <span>Allay</span>
          </Link>
          <p className={styles.small}>{ui.footer.madeBy}</p>
        </div>

        <nav className={styles.columns} aria-label={ui.footer.docs}>
          <div className={styles.column}>
            <h2 className={styles.heading}>{ui.footer.product}</h2>
            <Link to={`${home}#features`}>{ui.nav.features}</Link>
            <Link to={`${home}#pricing`}>{ui.nav.pricing}</Link>
            <Link to={`${home}#install`}>{ui.nav.install}</Link>
            <Link to={`${home}#faq`}>{ui.nav.faq}</Link>
          </div>
          <div className={styles.column}>
            <h2 className={styles.heading}>{ui.footer.docs}</h2>
            <Link to="/wiki/plugin/">{ui.footer.pluginWiki}</Link>
            <Link to="/wiki/">{ui.footer.serverWiki}</Link>
          </div>
          <div className={styles.column}>
            <h2 className={styles.heading}>{ui.footer.code}</h2>
            <a href={links.plugin}>allay-ai/minecraft</a>
            <a href={links.server}>allay-ai/server</a>
            <a href={links.pluginReleases}>{ui.footer.releases}</a>
          </div>
          <div className={styles.column}>
            <h2 className={styles.heading}>{ui.footer.legal}</h2>
            <Link to="/privacy/">{ui.footer.privacy}</Link>
            <Link to="/terms/">{ui.footer.terms}</Link>
          </div>
        </nav>
      </div>
      <p className={styles.disclaimer}>{ui.footer.notMojang}</p>
    </footer>
  )
}
