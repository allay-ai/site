import { Link } from 'react-router-dom'
import { Fill, LegalPage, type LegalSection } from '../components/legal/LegalPage.tsx'
import { retention } from '../data/plans.ts'

// What the hosted backend stores comes from allay-ai/server: the wiki's
// “Memory and traces” and “Admin panel and settings”, and the billing models.
// When the backend starts keeping something new, or keeps it longer, this page
// changes in the same piece of work. The [[…]] fields are the owner's to fill in.

const sections: LegalSection[] = [
  {
    id: 'who',
    title: 'Who is responsible',
    body: (
      <>
        <p>
          The controller for allay.chat is <Fill>OWNER NAME</Fill>, <Fill>ADDRESS</Fill>. You can
          reach us at <Fill>CONTACT EMAIL</Fill> about anything on this page.
        </p>
        <p>
          “Allay” here means the hosted backend at allay.chat, this website, and the Telegram bot
          @AllayChatBot. The Allay plugin and Allay Server are open-source software. When you run
          your own backend, it sends nothing to us, and you are the controller for what it keeps.
        </p>
      </>
    ),
  },
  {
    id: 'summary',
    title: 'At a glance',
    body: (
      // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrolling box needs focus so a keyboard can scroll it
      <div className="table-scroll" tabIndex={0}>
        <table>
          <thead>
            <tr>
              <th scope="col">What</th>
              <th scope="col">Why</th>
              <th scope="col">How long</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A player’s conversation with Allay</td>
              <td>To answer follow-up questions</td>
              <td>{retention.sessionHours} hours after the last question</td>
            </tr>
            <tr>
              <td>Facts Allay remembers about a player</td>
              <td>To answer with what the player told it before</td>
              <td>
                Until the player deletes them, or {retention.memoryDays} days after their last
                question
              </td>
            </tr>
            <tr>
              <td>Statistics of each answer, numbers only, under a pseudonym</td>
              <td>Billing, limits, finding faults</td>
              <td>{retention.runsDays} days; daily totals without any player kept</td>
            </tr>
            <tr>
              <td>Full traces of a tenth of answers</td>
              <td>Finding and fixing errors</td>
              <td>{retention.traceDays} days</td>
            </tr>
            <tr>
              <td>Licenses, payments, and the payer’s Telegram user id</td>
              <td>Subscriptions, refunds, accounting</td>
              <td>
                While the license exists, then as tax law requires (<Fill>RETENTION PERIOD</Fill>)
              </td>
            </tr>
            <tr>
              <td>Visits to this website</td>
              <td>Delivering the pages</td>
              <td>We keep nothing; see “This website”</td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
  },
  {
    id: 'website',
    title: 'This website',
    body: (
      <>
        <p>
          The website sets no cookies, runs no analytics, and loads no fonts, scripts, or images
          from other companies. If you pick a light or dark theme, your browser remembers it in its
          own storage; it never reaches us.
        </p>
        <p>
          Cloudflare delivers the pages and protects them from attacks. To do that it processes your
          IP address and the details of each request, as any web server does. We rely on our
          legitimate interest in a working, secure website (Art. 6(1)(f) GDPR). We don’t keep
          request logs for the pages ourselves.
        </p>
        <p>
          The wiki pages show pictures from the Allay wikis on GitHub. When a page has one, your
          browser loads it from raw.githubusercontent.com, which sees your IP address.
        </p>
      </>
    ),
  },
  {
    id: 'players',
    title: 'Players on servers that use allay.chat',
    body: (
      <>
        <p>
          A Minecraft server’s operator decides to connect the Allay plugin to allay.chat. For the
          answers themselves we then work on that operator’s behalf, and the operator is responsible
          for telling its players. Our <Link to="/terms/">terms</Link> include the data processing
          agreement for this. We describe everything here so you know what happens either way.
        </p>
        <h3>What a question sends us</h3>
        <ul>
          <li>The player’s Minecraft UUID and name, their language, and their time zone.</li>
          <li>
            The question, and the answers of the game tools Allay asks for: the inventory, health,
            surroundings, coordinates, notes, goals. Other players appear only as the asker’s
            locator bar shows them: a name, a distance, and a direction.
          </li>
          <li>
            The server’s name and a random id the plugin makes for it, and the plugin’s version.
          </li>
          <li>
            For a public question (<code>/askall</code>), the question and the answer, which every
            player online sees in the game.
          </li>
        </ul>
        <h3>What we keep</h3>
        <ul>
          <li>
            <strong>The session.</strong> Whole exchanges, tool results included, so a follow-up
            question makes sense. It ends {retention.sessionHours} hours after the player’s last
            question. Long sessions fold into a short summary. A server’s thread of public questions
            and each automation agent’s thread end {retention.publicThreadHours} hours after their
            last use.
          </li>
          <li>
            <strong>The lasting memory.</strong> Up to {retention.memoryFacts} short facts per
            player, which Allay saves when it learns something useful and says so. They stay until
            the player deletes them with <code>/allay forget</code> or asks us to, and go by
            themselves {retention.memoryDays} days after the player’s last question.
          </li>
          <li>
            <strong>Statistics.</strong> One record per answer with numbers only: when, the model,
            tokens, cost, duration, which tools ran and whether they worked, the error code if any.
            The player appears as a pseudonym, a keyed hash of their UUID that can’t be turned back
            without our key. Records go after {retention.runsDays} days; daily totals with no player
            in them stay.
          </li>
          <li>
            <strong>Traces.</strong> For {retention.traceShare * 100}% of answers, picked at random,
            a full record of the run: the prompts, the model’s output, and each tool call with its
            arguments and result. They help us find and fix errors and are deleted after{' '}
            {retention.traceDays} days. Keys are removed before a trace is saved.
          </li>
        </ul>
        <p>
          Each server’s data is kept apart: the same Minecraft account on two servers is two
          players, and no server reaches another’s. Nobody sees what players asked or what Allay
          answered in our admin panel, whatever their role: it shows numbers and the shape of a run
          only. The backend’s logs carry no player’s name, id, question, or answer.
        </p>
        <h3>Why</h3>
        <p>
          To answer a question, we follow the server operator’s instructions under the data
          processing agreement (Art. 28 GDPR). Statistics, limits, and traces serve our legitimate
          interests in billing correctly, preventing abuse, and keeping the service working (Art.
          6(1)(f) GDPR).
        </p>
      </>
    ),
  },
  {
    id: 'operators',
    title: 'Server operators who pay or bring a key',
    body: (
      <>
        <h3>Subscriptions</h3>
        <p>
          <code>/allay link</code> creates a license: a random id, a hash of its secret (never the
          secret itself), the server’s name, the plan, its budget, and what was spent. When you
          claim it in @AllayChatBot, we store your Telegram user id, the chat id, and your language,
          so the bot can talk to you and send renewals. For each payment we store Telegram’s charge
          id, the plan, the number of Stars, the date, whether it renews, and any refund.
        </p>
        <p>
          You pay inside Telegram. We never see card details; Telegram, and Apple or Google when
          Stars are bought in their stores, handle the money.
        </p>
        <p>
          We need this to provide the subscription (Art. 6(1)(b) GDPR) and keep payment records as
          tax law requires (Art. 6(1)(c) GDPR). License data stays while the license exists; payment
          records stay for <Fill>RETENTION PERIOD</Fill> after the payment.
        </p>
        <h3>Your own key</h3>
        <p>
          With your own key, the plugin sends it with each question. We use it for that one answer
          and never store or log it. The requests then go to the provider you picked, under its
          terms. Since Allay 6.0, such a server also gets a free license that tells us which server
          asks; it holds no payment data until someone pays.
        </p>
        <h3>Addresses</h3>
        <p>
          The backend uses the IP address a request comes from to limit how many licenses and
          sign-in attempts one address may make. It keeps those counts in memory only. Our admin
          panel’s audit log records which staff account changed what, from which address, for 365
          days.
        </p>
      </>
    ),
  },
  {
    id: 'processors',
    title: 'Who else processes data',
    body: (
      <>
        <p>We use these services, each bound by a data processing agreement or its own terms:</p>
        <ul>
          <li>
            <strong>Hetzner Online GmbH</strong>, Germany: the server that runs the backend and its
            databases, in Helsinki, Finland.
          </li>
          <li>
            <strong>Cloudflare, Inc.</strong>, USA: the website, DNS, protection from attacks, and
            the encrypted tunnel to our server. Requests to allay.chat pass through it.
          </li>
          <li>
            <strong>OpenRouter, Inc.</strong>, USA: forwards each answer’s context (the question,
            the session, tool results, and remembered facts) to the AI model that writes the answer,
            and to the model that summarizes long sessions. Which company runs the model depends on
            the model in use.
          </li>
          <li>
            <strong>Perplexity AI, Inc.</strong>, USA: when Allay searches the web, it receives the
            search query Allay wrote, not the conversation.
          </li>
          <li>
            <strong>Telegram</strong>: runs @AllayChatBot and Telegram Stars. Telegram processes
            your account and payments as a controller of its own.
          </li>
        </ul>
        <p>
          Some of them are in the USA. Transfers rely on the EU–U.S. Data Privacy Framework where
          the company is certified, and on the European Commission’s standard contractual clauses
          otherwise (Art. 45 and 46 GDPR).
        </p>
      </>
    ),
  },
  {
    id: 'rights',
    title: 'Your rights',
    body: (
      <>
        <p>
          You may ask us what we hold about you, have it corrected or deleted, restrict its use,
          receive it in a portable form, and object to processing based on legitimate interests
          (Art. 15–21 GDPR). You may also complain to a data protection authority, for example where
          you live, or to ours: <Fill>SUPERVISORY AUTHORITY</Fill>.
        </p>
        <p>Players can do the most common things themselves in the game:</p>
        <ul>
          <li>
            <code>/allay privacy</code> says what Allay keeps about them on that server, and{' '}
            <code>/allay privacy erase</code> erases all of it (Allay 6.0 and newer).
          </li>
          <li>
            <code>/allay memory</code> lists what Allay remembers, and <code>/allay forget</code>{' '}
            deletes it.
          </li>
          <li>
            <code>/allay new</code> ends the current session.
          </li>
        </ul>
        <p>
          A server’s admins can export or erase a player’s data for them with{' '}
          <code>/allay privacy export</code> and <code>/allay privacy erase</code>.
        </p>
        <p>
          For anything else, such as a copy of everything we keep about you, write to{' '}
          <Fill>CONTACT EMAIL</Fill> with your Minecraft name or UUID, or your Telegram user id. We
          may ask you to prove the account is yours. On erasure, your memories, sessions, agents’
          threads, and the traces of your questions go, and your statistics lose even their
          pseudonym.
        </p>
      </>
    ),
  },
  {
    id: 'decisions',
    title: 'Automated answers',
    body: (
      <p>
        Allay’s answers are written by AI models and can be wrong. They make no decision about you
        with legal or similarly significant effects (Art. 22 GDPR). When a subscription’s limit is
        used up, hosted answers pause for that server until the budget refills; that follows from
        the plan, not from a judgment about anyone.
      </p>
    ),
  },
  {
    id: 'children',
    title: 'Children',
    body: (
      <p>
        Many Minecraft players are young. Allay collects the same little from everyone and asks no
        one for an email, a real name, or a birthday. Paying for a subscription takes an adult, or a
        young person with a parent’s permission where the law asks for it.
      </p>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <ul>
        <li>All traffic to allay.chat is encrypted on its way.</li>
        <li>
          Secrets saved in the admin panel are encrypted at rest; license secrets are stored only as
          hashes.
        </li>
        <li>Statistics use pseudonyms; traces are kept for {retention.traceDays} days only.</li>
        <li>
          Only our own staff have admin accounts, and the panel never shows what players asked.
        </li>
      </ul>
    ),
  },
  {
    id: 'changes',
    title: 'Changes',
    body: (
      <p>
        When the backend starts storing something new or keeps it longer, this page changes first,
        and the date at the top moves. For a change that matters to paying servers, we also tell
        them through @AllayChatBot.
      </p>
    ),
  },
]

export function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="Last updated: 20 October 2026"
      intro={
        <p>
          Allay keeps as little as it can, for as short as it can. This page says what that means
          for visitors of this site, for players on servers that use allay.chat, and for server
          operators who pay.
        </p>
      }
      sections={sections}
    />
  )
}
