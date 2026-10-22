import { Link } from 'react-router-dom'
import { plans } from '../../data/plans.ts'
import { links } from '../../data/site.ts'
import { count, usd } from '../../i18n/format.ts'
import { fill } from '../../i18n/index.ts'
import type { Locale } from '../../i18n/locales.ts'
import type { Copy } from '../../i18n/types.ts'
import { StarIcon } from '../shared/icons.tsx'
import styles from './PricingSection.module.less'
import { Section } from './Section.tsx'

export function PricingSection({ copy, locale }: { copy: Copy; locale: Locale }) {
  const { pricing } = copy
  const home = locale === 'en' ? '/' : `/${locale}/`

  return (
    <Section id="pricing" kicker={pricing.kicker} title={pricing.title} lead={pricing.lead}>
      <div className={styles.cards}>
        <article className={styles.card} aria-labelledby="plan-byok">
          <h3 id="plan-byok" className={styles.name}>
            {pricing.byok.name}
          </h3>
          <p className={styles.price}>{pricing.byok.price}</p>
          <p className={styles.tagline}>{pricing.byok.tagline}</p>
          <ul className={styles.points}>
            {pricing.byok.points.map((point, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: a fixed list of texts
              <li key={index}>{point}</li>
            ))}
          </ul>
          <a className={styles.link} href={links.openRouter}>
            openrouter.ai
          </a>
        </article>

        <article className={`${styles.card} ${styles.featured}`} aria-labelledby="plan-hosted">
          <h3 id="plan-hosted" className={styles.name}>
            {pricing.hosted.name}
          </h3>
          <p className={styles.price}>
            <span className={styles.from}>{pricing.hosted.from}</span>
            {count(Math.min(...plans.map((plan) => plan.stars)), locale)}
            <StarIcon className={styles.priceStar} />
            <span className="visually-hidden">Telegram Stars</span>
          </p>
          <p className={styles.tagline}>{pricing.hosted.tagline}</p>
          <ul className={styles.plans}>
            {plans.map((plan) => (
              <li key={plan.id} className={styles.plan}>
                <div className={styles.planHead}>
                  <span className={styles.planName}>{pricing.hosted.plans[plan.id]}</span>
                  <span className={styles.stars}>
                    {count(plan.stars, locale)}
                    <StarIcon className={styles.star} />
                    <span className="visually-hidden">Telegram Stars</span>
                  </span>
                </div>
                <p className={styles.planDetail}>
                  {fill(pricing.hosted.period, { days: plan.days })}
                  {plan.renews && `, ${pricing.hosted.renews}`}
                  <br />
                  {fill(
                    plan.refillsMonthly ? pricing.hosted.budgetMonthly : pricing.hosted.budget,
                    {
                      budget: usd(plan.budget, locale),
                    },
                  )}
                </p>
              </li>
            ))}
          </ul>
          <p className={styles.more}>{pricing.hosted.more}</p>
          <ol className={styles.steps}>
            {pricing.hosted.steps.map((step, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: a fixed list of steps
              <li key={index}>{step}</li>
            ))}
          </ol>
          <a className={styles.cta} href={links.bot}>
            {pricing.hosted.cta}
          </a>
        </article>

        <article className={styles.card} aria-labelledby="plan-self">
          <h3 id="plan-self" className={styles.name}>
            {pricing.self.name}
          </h3>
          <p className={styles.price}>{pricing.self.price}</p>
          <p className={styles.tagline}>{pricing.self.tagline}</p>
          <ul className={styles.points}>
            {pricing.self.points.map((point, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: a fixed list of texts
              <li key={index}>{point}</li>
            ))}
          </ul>
          <Link className={styles.link} to={`${home}#self-hosting`}>
            {pricing.self.cta}
          </Link>
        </article>
      </div>

      <div className={styles.how}>
        <h3 className={styles.howTitle}>{pricing.howTitle}</h3>
        <ul className={styles.howList}>
          {pricing.how.map((item, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: a fixed list of texts
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
