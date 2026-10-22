import { Link } from 'react-router-dom'
import { LegalPage, type LegalSection } from '../components/legal/LegalPage.tsx'
import { byokLimits, infinity, plans } from '../data/plans.ts'
import { links } from '../data/site.ts'
import { count, usd, usdWhole } from '../i18n/format.ts'

// Prices, budgets, and limits come from src/data/plans.ts, which mirrors the
// backend's defaults. The [[…]] fields are the owner's to fill in, and the whole
// text wants a lawyer's look before it binds anyone.

const planRows = plans.map((plan) => ({
  name: { week: 'Week', month: 'Month', year: 'Year' }[plan.id],
  stars: count(plan.stars, 'en'),
  period: `${plan.days} days${plan.renews ? ', renews every 30 days until you cancel' : ''}`,
  budget: `${usd(plan.budget, 'en')} of model costs${plan.refillsMonthly ? ' every 30 days' : ''}`,
}))

const sections: LegalSection[] = [
  {
    id: 'scope',
    title: 'Who we are and what these terms cover',
    body: (
      <>
        <p>
          allay.chat is run by Pavel Erokhin Viktorovich, in Spain, reachable at{' '}
          <a href="mailto:personal@mairwunnx.com">personal@mairwunnx.com</a> (“we”). These terms
          cover the hosted Allay backend at allay.chat and the payment bot @AllayChatBot (“the
          service”), used through the Allay plugin on a Minecraft server.
        </p>
        <p>
          The plugin and Allay Server are open-source software under the MIT license. Running them
          yourself, with your own backend, needs no agreement with us, and these terms don’t apply
          to it.
        </p>
      </>
    ),
  },
  {
    id: 'who-may-use',
    title: 'Who may use the service',
    body: (
      <>
        <p>
          The service is for the operators of Minecraft servers (“you”). By connecting a server to
          allay.chat you confirm that you may decide for that server, and that you’re an adult or
          have a parent’s permission where your law asks for it.
        </p>
        <p>
          Your players use Allay through your server. You tell them that their questions go to
          allay.chat and where to read our <Link to="/privacy/">privacy policy</Link>.
        </p>
      </>
    ),
  },
  {
    id: 'ways-to-pay',
    title: 'Two ways to use allay.chat',
    body: (
      <>
        <h3>Your own key</h3>
        <p>
          You put a key for OpenRouter or another OpenAI-compatible API into the plugin. Your
          provider bills you; we charge nothing. Each server may ask up to {byokLimits.perMinute}{' '}
          questions a minute, {count(byokLimits.perDay, 'en')} a day, and {byokLimits.concurrent} at
          once. The provider’s address must be public and use https. We use your key only for the
          answer it was sent with and never store it.
        </p>
        <h3>A subscription</h3>
        <p>
          The service answers on our own key and models, which we choose and may change. You pay in
          Telegram Stars through @AllayChatBot after running <code>/allay link</code>. The prices
          and limits today:
        </p>
        {/* biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling box needs focus so a keyboard can scroll it */}
        <div className="table-scroll" tabIndex={0}>
          <table>
            <thead>
              <tr>
                <th scope="col">Plan</th>
                <th scope="col">Stars</th>
                <th scope="col">Period</th>
                <th scope="col">Limit</th>
              </tr>
            </thead>
            <tbody>
              {planRows.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.stars}</td>
                  <td>{row.period}</td>
                  <td>{row.budget}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          <strong>Infinity</strong>, on request: {usdWhole(infinity.priceUsd, 'en')} for{' '}
          {infinity.days} days with {usdWhole(infinity.budget, 'en')} of model costs for the whole
          period. One Telegram invoice can’t hold that much, so we agree the payment with you by
          email or in @AllayChatBot and switch the plan on for your license once it arrives.
        </p>
        <p>
          The price the bot shows when you pay is the one that applies. A change of prices never
          touches a period you already paid for.
        </p>
      </>
    ),
  },
  {
    id: 'limit',
    title: 'How a subscription’s limit works',
    body: (
      <ul>
        <li>
          The limit is an amount in US dollars of what your server’s questions really cost us at the
          model provider: the model’s steps, web searches, and summaries of long conversations. It
          is not a number of questions.
        </li>
        <li>
          When it’s used up, hosted answers pause until the next period or the next payment.
          Operators see how much is used as a percentage in <code>/allay status</code>.
        </li>
        <li>
          A payment during a period adds its limit at once and moves the end date. A year’s limit
          refills every 30 days; what’s left of one window doesn’t carry over to the next.
        </li>
        <li>There’s no free trial: a server pays before its first hosted question.</li>
        <li>
          The license in <code>plugins/Allay/license.key</code> is what identifies your
          subscription. Keep it secret: whoever has it can use your subscription.
        </li>
      </ul>
    ),
  },
  {
    id: 'cancel',
    title: 'Renewal, cancellation, and refunds',
    body: (
      <>
        <p>
          A monthly plan renews every 30 days through Telegram until you stop it in @AllayChatBot or
          in Telegram. The week, year, and Infinity plans don’t renew. A subscription you cancel
          runs until the end of the period you paid for.
        </p>
        <p>
          <strong>Right of withdrawal.</strong> If you’re a consumer in the European Union, you may
          withdraw from a purchase within 14 days without giving a reason. Write to{' '}
          <a href="mailto:personal@mairwunnx.com">personal@mairwunnx.com</a> or to @AllayChatBot
          with the date of the payment. Because the service starts at once at your request, a
          withdrawal returns the Stars minus the share of the period’s limit already used. Refunds
          go back to the Telegram account that paid, as Stars.
        </p>
        <p>
          Outside the withdrawal period, we refund a period we couldn’t serve because of our own
          fault.
        </p>
      </>
    ),
  },
  {
    id: 'fair-use',
    title: 'Fair use',
    body: (
      <>
        <p>You agree not to:</p>
        <ul>
          <li>use the service to break the law or to harm, harass, or deceive people;</li>
          <li>attack, overload, or probe the service, or get around its limits;</li>
          <li>use another server’s license, or share your own outside your server;</li>
          <li>
            resell access to the service or use it for anything other than a Minecraft server.
          </li>
        </ul>
        <p>
          We may block a license or a key that breaks these rules, and tell you why through the bot
          or the plugin. If we block a paid license without your fault, we refund the unused part.
        </p>
      </>
    ),
  },
  {
    id: 'answers',
    title: 'AI answers',
    body: (
      <p>
        AI models write Allay’s answers, and they can be wrong, out of date, or incomplete. Check
        anything that matters before you rely on it. Allay acts in the game only through the tools
        your server allows, and the plugin’s settings decide which tools that is.
      </p>
    ),
  },
  {
    id: 'availability',
    title: 'Availability and changes',
    body: (
      <p>
        We run the service with care but promise no uptime: maintenance, provider outages, and
        updates can pause it. We may change models, features, or these terms. A change that affects
        paying servers is announced on this page and through @AllayChatBot at least 30 days ahead,
        and you may cancel before it applies.
      </p>
    ),
  },
  {
    id: 'liability',
    title: 'Liability',
    body: (
      <p>
        We are liable without limit for intent and gross negligence, for harm to life, body, or
        health, and wherever the law doesn’t allow a limit. Otherwise our liability for slight
        negligence covers only breaches of essential duties, up to the damage typical for this kind
        of service and at most what you paid us in the 12 months before the damage.
      </p>
    ),
  },
  {
    id: 'processing',
    title: 'Processing your players’ data',
    body: (
      <>
        <p>
          When your server uses allay.chat, we process your players’ data on your behalf to answer
          their questions. This section is our data processing agreement under Art. 28 GDPR:
        </p>
        <ul>
          <li>
            We process players’ data only to answer them, as the plugin and your settings ask, and
            as the <Link to="/privacy/">privacy policy</Link> describes, including how long each
            kind stays.
          </li>
          <li>Everyone at allay.chat who can reach the data is bound to confidentiality.</li>
          <li>
            We protect the data with the measures listed under “Security” in the privacy policy.
          </li>
          <li>
            The sub-processors are the ones listed there. We announce a new one through this page at
            least 30 days ahead, and you may object or stop using the service.
          </li>
          <li>
            We help you answer your players’ requests to see or erase their data, and tell you
            without delay about a breach that touches them.
          </li>
          <li>
            When you stop using the service, the data goes within the periods in the privacy policy.
            On request we give you the information you need to check all this.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'law',
    title: 'Law and disputes',
    body: (
      <>
        <p>
          The law of Spain applies. If you’re a consumer, the protections of the law where you live
          stay with you.
        </p>
        <p>
          We neither must nor will take part in dispute resolution before a consumer arbitration
          board.
        </p>
      </>
    ),
  },
  {
    id: 'other',
    title: 'Everything else',
    body: (
      <p>
        Minecraft is a trademark of Mojang Synergies AB. Allay is not an official Minecraft product
        and is not approved by or associated with Mojang or Microsoft. The source of the plugin and
        the backend is at <a href={links.organization}>github.com/allay-ai</a>.
      </p>
    ),
  },
]

export function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      updated="Last updated: 20 October 2026"
      intro={
        <p>
          These terms are for server operators who connect a Minecraft server to allay.chat, with
          their own key or a subscription. They’re written to be read; if anything is unclear, ask
          us.
        </p>
      }
      sections={sections}
    />
  )
}
