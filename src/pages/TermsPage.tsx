import { Link } from 'react-router-dom'
import { LegalPage, type LegalSection } from '../components/legal/LegalPage.tsx'
import { byokLimits, plans } from '../data/plans.ts'
import { links } from '../data/site.ts'
import { count, usd } from '../i18n/format.ts'

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
          in Telegram. The week and year plans don’t renew. A subscription you cancel runs until the
          end of the period you paid for.
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
    title: 'Data processing agreement',
    body: (
      <>
        <p>
          This section is our data processing agreement with you under Art. 28(3) GDPR. For your
          players’ data it comes before the rest of these terms.
        </p>
        <h3>Roles</h3>
        <p>
          For answering your players you are the controller and we are your processor. For our own
          statistics, limits, traces, and audit log we are a controller ourselves, as the{' '}
          <Link to="/privacy/">privacy policy</Link> says.
        </p>
        <h3>Subject matter, duration, nature, and purpose</h3>
        <ul>
          <li>
            Subject matter: the hosted Allay backend answering your players’ questions in the game.
          </li>
          <li>
            Duration: while your server uses allay.chat, and after that only for the periods in the
            privacy policy.
          </li>
          <li>
            Nature: we receive what the plugin sends, store it encrypted, have an AI model write the
            answer through OpenRouter, send the answer back, and keep what lets Allay remember,
            export, and erase.
          </li>
          <li>
            Purpose: answering questions, remembering what a player asked Allay to remember, and
            giving players their data or erasing it.
          </li>
        </ul>
        <h3>Data and data subjects</h3>
        <ul>
          <li>
            Data subjects: the players of your server who use Allay. Other players appear only as
            “Player 1”, “Player 2”, and so on, unless they agreed to Allay’s notice themselves.
          </li>
          <li>
            Data: Minecraft UUID and name, operator status, language, time zone, position in the
            game, questions and answers, what the game tools read for the player, memories and
            places, deaths, goals, settings, the age group and the agreement to Allay’s notice, and
            pseudonymised statistics. No special categories are asked for; a player who writes such
            data into a question does so on their own.
          </li>
        </ul>
        <h3>Your instructions</h3>
        <p>
          We process players’ data only on your documented instructions: these terms, the plugin’s
          configuration, and your settings. That includes transferring it to the USA through
          OpenRouter, as the privacy policy describes. If a law requires us to process it otherwise,
          we tell you first unless that law forbids it. If we think an instruction breaks data
          protection law, we tell you.
        </p>
        <h3>Confidentiality and security</h3>
        <p>
          Everyone at allay.chat who can reach the data is bound to confidentiality. We take the
          measures listed under “Security” in the privacy policy (Art. 32 GDPR): encryption on the
          way and at rest, a database closed to the internet, separate accounts with the least
          access they need, logged decryption by an owner account only, and encrypted backups.
        </p>
        <h3>Sub-processors</h3>
        <p>
          You allow us to use the sub-processors listed under “Who else processes data” in the
          privacy policy: Hetzner, Cloudflare (with R2), OpenRouter and the model providers it
          routes to, Perplexity, and mc-heads.net. Each is bound by a contract or terms with data
          protection duties at least as strict as these, and we remain responsible to you for them
          (Art. 28(4) GDPR). We announce a new or replaced sub-processor on that page at least 30
          days ahead, and to paying servers through @AllayChatBot. You may object within that time;
          if we can’t meet your objection, you may stop using the service.
        </p>
        <h3>Help we give you</h3>
        <ul>
          <li>
            Players’ requests: players can see, export, and erase their data themselves with{' '}
            <code>/allay privacy</code>; for anything else we answer within 30 days of your request.
          </li>
          <li>
            Security, breaches, and assessments (Art. 32–36 GDPR): we give you the information you
            need for your own assessments and for consulting an authority.
          </li>
          <li>
            Breaches: we tell you without undue delay after we learn of a breach that touches your
            players’ data, at the latest within 48 hours, with what we know then and the rest as we
            learn it.
          </li>
        </ul>
        <h3>When you stop</h3>
        <p>
          At your choice, we delete your players’ data or give it back first: each player’s data
          with <code>/allay privacy export</code>, or all of your server’s data on request by email.
          We then delete it within 30 days. Copies in our encrypted backups go as the backups age
          out, within 12 months. We keep only what a law requires us to keep.
        </p>
        <h3>Information and audits</h3>
        <p>
          On request we give you the information that shows we keep this agreement. You, or an
          auditor bound to confidentiality whom you choose, may audit us once a year, or after a
          breach, with 30 days’ notice and at your own cost; we take part in good faith.
        </p>
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
      updated="Last updated: 23 October 2026"
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
