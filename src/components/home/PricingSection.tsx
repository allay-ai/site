import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { type Plan, type PlanId, plans, soloOnSale, soloPlans } from '../../data/plans.ts'
import { links } from '../../data/site.ts'
import { count, usd } from '../../i18n/format.ts'
import { fill } from '../../i18n/index.ts'
import type { Locale } from '../../i18n/locales.ts'
import type { Copy } from '../../i18n/types.ts'
import styles from './PricingSection.module.less'
import { Section } from './Section.tsx'

/** A price in Telegram Stars, in the game's letters, with Telegram's own star. */
function Stars({ stars, locale }: { stars: number; locale: Locale }) {
  return (
    <span className={styles.stars}>
      {count(stars, locale)}
      <span className={styles.star} aria-hidden="true">
        ⭐
      </span>
      <span className="visually-hidden">Telegram Stars</span>
    </span>
  )
}

/** One way to pay: its name, its price, and what it means. */
function Route({
  id,
  name,
  price,
  line,
  action,
}: {
  id?: string
  name: string
  price: ReactNode
  line: ReactNode
  action?: ReactNode
}) {
  return (
    <li id={id} className={styles.route}>
      <h3 className={styles.routeName}>{name}</h3>
      <p className={styles.routePrice}>{price}</p>
      <p className={styles.routeLine}>
        {line} {action}
      </p>
    </li>
  )
}

/** A set of plans as a price list: name, what it gives, the price. */
function PlanList({
  title,
  list,
  copy,
  locale,
  children,
}: {
  title: string
  list: Plan<string>[]
  copy: Copy['pricing']
  locale: Locale
  children?: ReactNode
}) {
  return (
    <div className={styles.well}>
      <h3 className={styles.wellTitle}>{title}</h3>
      <ul className={styles.plans}>
        {list.map((plan) => (
          <li key={plan.id} className={styles.plan}>
            <span className={styles.planName}>
              {copy.plans[plan.id.replace('solo_', '') as PlanId]}
            </span>
            <span className={styles.planDetail}>
              {fill(copy.period, { days: plan.days })}
              {plan.renews && `, ${copy.renews}`}
              <br />
              {fill(plan.refillsMonthly ? copy.budgetMonthly : copy.budget, {
                budget: usd(plan.budget, locale),
              })}
            </span>
            <Stars stars={plan.stars} locale={locale} />
          </li>
        ))}
      </ul>
      {children}
    </div>
  )
}

const cheapest = (list: { stars: number }[]) => Math.min(...list.map((plan) => plan.stars))

export function PricingSection({ copy, locale }: { copy: Copy; locale: Locale }) {
  const { pricing } = copy
  const { routes } = pricing
  const from = (stars: number) => (
    <>
      <span className={styles.from}>{pricing.from}</span>
      <Stars stars={stars} locale={locale} />
    </>
  )

  return (
    <Section id="pricing" title={pricing.title} lead={pricing.lead}>
      <ul className={styles.routes}>
        <Route name={routes.byok.name} price={routes.byok.price} line={routes.byok.line} />
        <Route name={routes.hosted.name} price={from(cheapest(plans))} line={routes.hosted.line} />
        {soloOnSale && (
          <Route
            name={routes.solo.name}
            price={from(cheapest(soloPlans))}
            line={routes.solo.line}
          />
        )}
        <Route
          id="self-hosting"
          name={routes.self.name}
          price={routes.self.price}
          line={routes.self.line}
          action={<Link to="/wiki/self-hosting-with-docker/">{routes.self.cta}</Link>}
        />
      </ul>

      <div className={`${styles.wells} ${soloOnSale ? '' : styles.single}`}>
        <PlanList title={pricing.serverTitle} list={plans} copy={pricing} locale={locale} />
        {soloOnSale && (
          <PlanList title={pricing.soloTitle} list={soloPlans} copy={pricing} locale={locale}>
            <p className={styles.note}>{pricing.soloNote}</p>
          </PlanList>
        )}
      </div>

      <div className={styles.pay}>
        <ol className={styles.steps}>
          {pricing.steps.map((step, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: a fixed list of steps
            <li key={index}>{step}</li>
          ))}
        </ol>
        <div className={styles.payAction}>
          <a className={styles.cta} href={links.bot}>
            {pricing.cta}
          </a>
          <p className={styles.more}>{pricing.more}</p>
        </div>
      </div>

      <ul className={styles.how}>
        {pricing.how.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: a fixed list of texts
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Section>
  )
}
