import { Link } from 'react-router-dom'
import type { Copy } from '../../i18n/types.ts'
import { ArrowIcon } from '../shared/icons.tsx'
import { ChatDemo } from './ChatDemo.tsx'
import styles from './Hero.module.less'

export function Hero({ copy, home }: { copy: Copy; home: string }) {
  const { hero } = copy
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.sparkles} aria-hidden="true">
        {['a', 'b', 'c', 'd', 'e', 'f'].map((name) => (
          <span key={name} className={styles[`sparkle-${name}`]} />
        ))}
      </div>
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 id="hero-title" className={styles.title}>
            {hero.title}
          </h1>
          <p className={styles.lead}>{hero.lead}</p>
          <div className={styles.actions}>
            <Link to={`${home}#install`} className={styles.primary}>
              {hero.primary}
              <ArrowIcon className={styles.arrow} />
            </Link>
            <Link to="/wiki/plugin/" className={styles.secondary}>
              {hero.secondary}
            </Link>
          </div>
          <ul className={styles.facts}>
            {hero.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
        <ChatDemo demo={copy.demo} />
      </div>
    </section>
  )
}
