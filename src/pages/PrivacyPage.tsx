import { Link } from 'react-router-dom'
import { LegalPage, type LegalSection } from '../components/legal/LegalPage.tsx'
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
          The controller for allay.chat is Pavel Erokhin Viktorovich, in Spain. You can reach us at
          <a href="mailto:personal@mairwunnx.com">personal@mairwunnx.com</a> about anything on this
          page.
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
              <td>A player’s conversation with Allay, encrypted</td>
              <td>To answer follow-up questions</td>
              <td>{retention.sessionDays} days after the last question</td>
            </tr>
            <tr>
              <td>Facts and places Allay remembers about a player, encrypted</td>
              <td>To answer with what the player told it before</td>
              <td>
                Until the player deletes them, or {retention.memoryDays} days after their last
                question
              </td>
            </tr>
            <tr>
              <td>A player’s deaths, goals, time zone, and Allay settings, encrypted</td>
              <td>“When did I die?”, goals that last, answers in the player’s time</td>
              <td>{retention.memoryDays} days after the player’s last question</td>
            </tr>
            <tr>
              <td>
                A player’s agreement to Allay’s notice: which version, a hash of its text, their age
                group, and when
              </td>
              <td>To show the player agreed before Allay answered</td>
              <td>
                Until the player withdraws it or is erased, or {retention.runsDays} days after their
                last question
              </td>
            </tr>
            <tr>
              <td>A player’s name, UUID, and operator status on each server</td>
              <td>The admin panel, unless the player turns on full privacy</td>
              <td>{retention.runsDays} days after the last question</td>
            </tr>
            <tr>
              <td>Statistics of each answer, numbers only, under a pseudonym</td>
              <td>Billing, limits, finding faults</td>
              <td>{retention.runsDays} days; daily totals without any player kept</td>
            </tr>
            <tr>
              <td>Traces of answers, encrypted</td>
              <td>Analysing and fixing errors</td>
              <td>{retention.traceDays} days</td>
            </tr>
            <tr>
              <td>Servers: name, address, software, and the address they connect from</td>
              <td>Showing operators and us which server asks</td>
              <td>{retention.runsDays} days after the server’s last question</td>
            </tr>
            <tr>
              <td>Licenses, payments, and the payer’s Telegram user id</td>
              <td>Subscriptions, refunds, accounting</td>
              <td>While the license exists, then as Spanish law requires (six years)</td>
            </tr>
            <tr>
              <td>Backups of all of the above, encrypted</td>
              <td>Recovering from a failure</td>
              <td>Up to 12 months, then gone by themselves</td>
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
          <li>
            The player’s Minecraft UUID and name, whether they are an operator, their language,
            their time zone, and where they stand: coordinates, dimension, and world.
          </li>
          <li>
            The question, and the answers of the game tools Allay asks for: the inventory, health,
            surroundings, goals. Other players appear only as the asker’s locator bar shows them: a
            name, a distance, and a direction.
          </li>
          <li>
            The server’s name, address, game version, and a random id the plugin makes for it, and
            the plugin’s version. We see the address the server connects from.
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
            question makes sense. It ends {retention.sessionDays} days after the player’s last
            question. Long sessions fold into a short summary. A server’s thread of public questions
            and each automation agent’s thread end {retention.publicThreadHours} hours after their
            last use.
          </li>
          <li>
            <strong>The lasting memory.</strong> Up to {retention.memoryFacts} short facts and
            places per player, which Allay saves when it learns something useful or when the player
            asks it to note a place, and says so. A place keeps its coordinates, dimension, and
            world. They stay until the player deletes them with <code>/allay forget</code> or asks
            us to, and go by themselves {retention.memoryDays} days after the player’s last
            question.
          </li>
          <li>
            <strong>Deaths, goals, and settings.</strong> The player’s last deaths (when, where,
            what killed them, what dropped), their goals, their time zone, and their Allay settings,
            so Allay can answer “when did I die?” and keep goals across restarts. Since Allay 6.7
            they live with us, not on the game server, and go {retention.memoryDays} days after the
            player’s last question.
          </li>
          <li>
            <strong>The agreement.</strong> Before their first question, the plugin asks each
            player’s age (see “Children”) and shows a short notice: what it sends, where we keep it,
            and that AI providers write the answers. Allay answers only once the player agrees. On
            allay.chat neither the notice nor the age question can be switched off, and the backend
            itself refuses questions from a player without a current agreement. We keep which
            version of the notice they agreed to, a SHA-256 hash of its text and of this policy’s
            revision, the age group they picked, and when. When the notice or this policy changes,
            the player sees what changed and is asked again before Allay answers. The agreement
            stays until their data is erased or {retention.runsDays} days after their last question.
            When the player withdraws it with <code>/allay privacy withdraw</code>, what it covered
            goes at once: memories and places, deaths, settings and goals, and the conversation.
            Statistics stay under the pseudonym, and we keep the record that they agreed and then
            withdrew, as proof.
          </li>
          <li>
            <strong>The name.</strong> The player’s name, UUID, and operator status on each server,
            so the admin panel can name them. A player who turns on full privacy (
            <code>/allay privacy full on</code>) appears there under a pseudonym only. Kept{' '}
            {retention.runsDays} days after the last question.
          </li>
          <li>
            <strong>Statistics.</strong> One record per answer with numbers only: when, the model,
            tokens, cost, duration, which tools ran and whether they worked, the error code if any.
            The player appears as a pseudonym, a keyed hash of their UUID that can’t be turned back
            without our key. Records go after {retention.runsDays} days; daily totals with no player
            in them stay.
          </li>
          <li>
            <strong>Traces.</strong> A record of how an answer was made: the prompts, the model’s
            output, and each tool call with its arguments and result. We use them to analyse how
            Allay answers and to find and fix errors, and they are deleted after{' '}
            {retention.traceDays} days. Keys are removed before a trace is saved.
          </li>
        </ul>
        <h3>Who can read it</h3>
        <p>
          Everything a player said or Allay wrote about them, the session, memories and places,
          deaths, goals, settings, and traces, is encrypted before it reaches our database (see
          “Security”). Each server’s data is kept apart: the same Minecraft account on two servers
          is two players, and no server reaches another’s. The backend’s logs carry no player’s
          name, id, question, or answer.
        </p>
        <p>
          Our admin panel shows numbers and the shape of a run. To look into a problem that a player
          or a server operator reported, the operator of allay.chat, and no other role, may decrypt
          the trace and the session of that one answer. Each such look is written to the audit log
          with the answer and the player’s pseudonym, and the audit log is kept{' '}
          {retention.auditDays} days. We don’t read conversations for any other reason.
        </p>
        <p>
          AI providers may keep a prompt in their cache for a short time under their own terms, so
          the next step of the same answer comes faster.
        </p>
        <h3>Why</h3>
        <p>
          To answer a question, we follow the server operator’s instructions under the data
          processing agreement (Art. 28 GDPR). Statistics, limits, traces, and the audit log serve
          our legitimate interests in billing correctly, preventing abuse, and keeping the service
          working (Art. 6(1)(f) GDPR). The agreement before the first question is the record that
          the player was told and agreed (Art. 7(1) GDPR).
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
          records stay for six years after the payment, as the Spanish Commercial Code requires.
        </p>
        <h3>Your own key</h3>
        <p>
          With your own key, the plugin sends it with each question. We use it for that one answer
          and never store or log it. The requests then go to the provider you picked, under its
          terms. Since Allay 6.0, such a server also gets a free license that tells us which server
          asks; it holds no payment data until someone pays.
        </p>
        <h3>Your server</h3>
        <p>
          For each server we keep its name, MOTD, the address and port players join, its software
          and versions, the plugin’s version, and the address it connects to us from, so you and we
          can tell servers apart in the admin panel. A server’s record goes {retention.runsDays}{' '}
          days after its last question.
        </p>
        <h3>Addresses</h3>
        <p>
          The backend uses the IP address a request comes from to limit how many licenses and
          sign-in attempts one address may make. It keeps those counts in memory only. Our admin
          panel’s audit log records which staff account changed or looked at what, from which
          address, for {retention.auditDays} days.
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
            <strong>Cloudflare R2</strong>, Cloudflare’s storage, in Western Europe: our backups,
            encrypted before they leave our server. Cloudflare keeps them as a processor under its
            own guarantees: its{' '}
            <a href="https://www.cloudflare.com/cloudflare-customer-dpa/">
              data processing addendum
            </a>{' '}
            and <a href="https://www.cloudflare.com/privacypolicy/">privacy policy</a>.
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
          otherwise (Art. 45 and 46 GDPR). Each of them answers for its own part under its own
          guarantees; on our side we follow the GDPR and the other rules this page names.
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
          you live, or to ours: the Agencia Española de Protección de Datos (
          <a href="https://www.aepd.es">aepd.es</a>).
        </p>
        <p>Players can do the most common things themselves in the game:</p>
        <ul>
          <li>
            <code>/allay privacy</code> says what Allay keeps about them on that server, and{' '}
            <code>/allay privacy erase</code> erases all of it (Allay 6.0 and newer).
          </li>
          <li>
            <code>/allay privacy export</code> gives a link to everything we keep about them, as a
            JSON file. The link works for {retention.exportHours} hours, and whoever has it can
            download the file, so don’t share it (Allay 6.7 and newer).
          </li>
          <li>
            <code>/allay privacy withdraw</code> takes back their agreement to Allay’s notice: Allay
            stops answering them, and their memories and places, deaths, settings and goals, and
            conversation are erased (Allay 6.7 and newer).
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
          <code>/allay privacy export</code> and <code>/allay privacy erase</code>; the export link
          then goes to the admin who asked, to hand to the player.
        </p>
        <p>
          For anything else, such as a copy of everything we keep about you, write to{' '}
          <a href="mailto:personal@mairwunnx.com">personal@mairwunnx.com</a> with your Minecraft
          name or UUID, or your Telegram user id. We may ask you to prove the account is yours. On
          erasure, your memories and places, deaths, goals, settings, sessions, agents’ threads,
          agreement, name, and the traces of your questions go, and your statistics lose even their
          pseudonym. Copies in our encrypted backups disappear as the backups age out, within 12
          months; we never restore erased data from them except to recover from a failure, and then
          erase it again.
        </p>
      </>
    ),
  },
  {
    id: 'usa',
    title: 'If you live in the United States',
    body: (
      <>
        <p>
          US state privacy laws, such as California’s CCPA as amended by the CPRA, give you rights
          over personal information. In their terms, we collect identifiers (a Minecraft UUID and
          name, a Telegram user id, the address a server connects from), what a player asks and what
          Allay reads in the game for them, and records of payments, for the purposes and as long as
          this page says.
        </p>
        <ul>
          <li>
            We don’t sell personal information, and we don’t share it for cross-context behavioral
            advertising. We show no ads and use no analytics.
          </li>
          <li>
            We don’t use sensitive personal information to infer anything about anyone. A player’s
            position in the game is a game coordinate, not a real-world location.
          </li>
          <li>
            You may ask what we hold about you, have it corrected or deleted, and get a copy, as
            “Your rights” describes, yourself or through an agent you authorize. We answer within 45
            days and treat you no differently for asking.
          </li>
        </ul>
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
      <>
        <p>
          Allay isn’t directed at children under 13. Many Minecraft players are young, so the law
          sets an age below which a player can’t agree alone: 13 under the US Children’s Online
          Privacy Protection Act (COPPA), 14 in Spain (Art. 7 LOPDGDD), and between 13 and 16 in the
          other countries of the EU and the EEA (Art. 8 GDPR).
        </p>
        <p>
          So before their first question, the plugin asks every player once how old they are: under
          13, 13, 14–15, 16–17, or 18 and over. The question says why it’s asked and suggests no
          answer. The game server picks the age that applies from the country of the player’s
          connection, with a database on the game server, so the address never reaches us: 13 in the
          United States, 14 in Spain, the national age elsewhere in the EU and the EEA, 16 when the
          country is unknown, and 13 everywhere else.
        </p>
        <p>
          A player below that age gets no answers from Allay, and nothing about them reaches us or
          any AI provider. So that the question isn’t simply repeated until another answer comes,
          the game server keeps a sealed note of that answer for a year, on the game server only. A
          player at or above the age goes on to the notice, and we keep the age group they picked
          with their agreement.
        </p>
        <p>
          Paying for a subscription takes an adult, or a young person with a parent’s permission
          where the law asks for it. If you believe we hold data about a child under 13 in the
          United States, write to us and we’ll erase it.
        </p>
      </>
    ),
  },
  {
    id: 'security',
    title: 'Security',
    body: (
      <ul>
        <li>All traffic to allay.chat is encrypted on its way (TLS).</li>
        <li>
          What players said and what Allay keeps about them is encrypted at rest with AES-256-GCM: a
          fresh random 96-bit nonce for every value and a 128-bit tag, so a changed value is
          refused, not read. The key is derived with HMAC-SHA256 from a 256-bit key that the backend
          holds apart from the database, so a copy of the database alone reveals nothing.
        </li>
        <li>
          Backups are encrypted with AES-256 by restic before they leave our server, stored with
          Cloudflare R2 in Western Europe, and kept up to 12 months.
        </li>
        <li>
          The database takes no connections from the internet, except ours with a client
          certificate. The backend connects with its own database account, which reaches only
          Allay’s database, never with the administrator account.
        </li>
        <li>
          Secrets saved in the admin panel are encrypted the same way; license secrets and admin
          sessions are stored only as hashes, and admin passwords with Argon2id.
        </li>
        <li>Statistics use pseudonyms; traces are kept for {retention.traceDays} days only.</li>
        <li>
          Only our own staff have admin accounts. Only the operator of allay.chat may decrypt a
          conversation, one answer at a time, and every such look is logged.
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
        and the date at the top moves. Each change gets a new revision (now{' '}
        {retention.policyRevision}); players who agreed to an older one are told what changed and
        asked again before Allay answers them. For a change that matters to paying servers, we also
        tell them through @AllayChatBot.
      </p>
    ),
  },
]

export function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="Last updated: 23 October 2026"
      intro={
        <p>
          Allay keeps only what it needs to answer and to keep working, encrypts what players say,
          and deletes it on a schedule. This page says what that means for visitors of this site,
          for players on servers that use allay.chat, and for server operators who pay.
        </p>
      }
      sections={sections}
    />
  )
}
