import { Link } from 'react-router-dom'
import { byokLimits, infinity, retention } from '../data/plans.ts'
import { links } from '../data/site.ts'
import { count, usdWhole } from './format.ts'
import type { Copy } from './types.ts'

export const en: Copy = {
  htmlLang: 'en',
  meta: {
    title: 'Allay – an AI helper for your Minecraft server',
    description:
      'Players type /ask, and Allay answers from their real game: inventory, chests, recipes, the server’s plugins. For Spigot and Paper, hosted or self-hosted.',
  },
  ui: {
    skipToContent: 'Skip to content',
    primaryNav: 'Primary',
    nav: { features: 'Features', pricing: 'Pricing', install: 'Install', faq: 'FAQ', wiki: 'Wiki' },
    menu: 'Menu',
    closeMenu: 'Close menu',
    themeToLight: 'Switch to the light theme',
    themeToDark: 'Switch to the dark theme',
    language: 'Language',
    github: 'Allay on GitHub',
    copy: 'Copy',
    copied: 'Copied',
    footer: {
      product: 'Allay',
      docs: 'Documentation',
      code: 'Source code',
      legal: 'Legal',
      privacy: 'Privacy policy',
      terms: 'Terms of service',
      serverWiki: 'Server wiki',
      pluginWiki: 'Plugin wiki',
      protocol: 'Protocol v2',
      releases: 'Releases',
      madeBy: (
        <>
          Made by <a href={links.author}>Pavel Erokhin (mairwunnx)</a>. MIT licensed.
        </>
      ),
      notMojang:
        'Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.',
    },
  },
  hero: {
    eyebrow: 'AI helper for Spigot and Paper servers',
    title: (
      <>
        Ask your world <em>anything</em>
      </>
    ),
    lead: (
      <>
        Allay lives in your server’s chat. A player types <code>/ask</code>, and Allay looks into
        their real game—the inventory, the block under the crosshair, the chests around, this
        server’s recipes and plugins—before it answers.
      </>
    ),
    primary: 'Add Allay to your server',
    secondary: 'Read the manual',
    facts: ['Spigot and Paper 26.3', 'Free with your own key', 'Open source, MIT'],
  },
  demo: {
    label: 'An example of Allay answering in the game chat',
    caption: 'An example. Real answers depend on the player’s game.',
    command: '/ask where did I put my redstone?',
    status: '⠹ Fluttering over the chests… (3s · ↑ 2,184 · ↓ 61 tokens)',
    lines: [
      { kind: 'tool', label: 'Searching for redstone', result: '3 chests within 32 blocks' },
      { kind: 'tool', label: 'Marking blocks', result: '3 chests lit up for 30 seconds' },
      {
        kind: 'answer',
        text: '2 stacks sit in the chest left of your furnace, 6 blocks north, and 14 more in the barrel under the stairs. I lit them up for you.',
      },
      { kind: 'buttons', labels: ['The way', 'Recipe: repeater'] },
    ],
  },
  features: {
    kicker: 'What players get',
    title: 'It looks before it answers',
    lead: 'Allay reads the game through tools the plugin runs, so answers fit this player, this world, and this server.',
    items: [
      {
        icon: 'eye',
        title: 'Answers from the real game',
        body: '“Which sword is better?” Allay reads the inventory, the block under the crosshair, statistics, and advancements instead of guessing.',
      },
      {
        icon: 'search',
        title: 'It finds your things',
        body: '“Where’s my redstone?” counts it in the inventory, the ender chest, and chests up to 32 blocks around, inside shulker boxes and bundles too.',
      },
      {
        icon: 'trail',
        title: 'It shows the way',
        body: 'The compass and a particle trail lead to a death point, a village, a cherry grove, a note, or a friend on the locator bar.',
      },
      {
        icon: 'agent',
        title: 'Agents do the chores',
        body: 'Sorting chests by category, smelting evenly, brewing in rounds, crafting at a real table. Agents work while you play, then report.',
      },
      {
        icon: 'grid',
        title: 'A tidy inventory',
        body: '“Sword first, food in the last row.” Stacks merge, pinned slots get the best item, and [Put back] undoes it for 5 minutes.',
      },
      {
        icon: 'window',
        title: 'Buttons and windows',
        body: 'Recipes, every brewing step, the cheapest anvil order, enchantments, and villager trades, one click under the answer.',
      },
      {
        icon: 'redstone',
        title: 'Redstone and drafts',
        body: '“Why doesn’t my door open?” reads the machine and marks the fault. Experimental drafts show a build as ghost blocks, layer by layer.',
      },
      {
        icon: 'note',
        title: 'Notes, goals, reminders',
        body: 'Notes pinned to places, goals as a bar at the top of the screen, and reminders from 1 to 120 minutes.',
      },
      {
        icon: 'calc',
        title: 'Fresh facts, exact math',
        body: 'Web search when a question needs it, and calculations at 64 significant digits: stacks, Nether coordinates, XP.',
      },
    ],
  },
  ask: {
    kicker: 'How to ask',
    title: 'Three commands and a chat mode',
    lead: (
      <>
        Allay answers in the language of the question. While it works, the action bar shows what
        it’s doing, and a chat line appears for every tool it uses.
      </>
    ),
    commands: [
      { command: '/ask <question>', what: 'A private question: only you see it and the answer.' },
      {
        command: '/askall <question>',
        what: 'Everyone online sees the question and the answer, and friends can follow up.',
      },
      {
        command: '/askx <what to do>',
        what: 'Allay turns a request into commands and runs them as you. Operators only by default.',
      },
    ],
    chatTitle: 'Chat mode',
    chatLead: (
      <>
        <code>/allay chat</code> sends what you write in chat to Allay. The first character decides
        where a line goes:
      </>
    ),
    prefixes: [
      { input: 'how do I find netherite?', goes: 'To Allay, privately, like /ask' },
      { input: '! give me a stack of torches', goes: 'To Allay as commands, like /askx' },
      { input: '? where’s the nearest village?', goes: 'To everyone, like /askall' },
      { input: '~ brb', goes: 'To the ordinary chat' },
    ],
    youWrite: 'You write',
    itGoes: 'It goes',
  },
  memory: {
    kicker: 'Memory',
    title: 'It remembers what matters',
    items: [
      {
        title: 'A conversation with context',
        body: `Each player’s session keeps whole exchanges, tool results included, for ${retention.sessionDays} days after the last question. “And how many were in that chest?” needs no second look.`,
      },
      {
        title: 'Facts that last',
        body: `Up to ${retention.memoryFacts} short facts and places per player: where the base is, what they’re building, how they like answers. Allay saves them itself, says so, and keeps them encrypted.`,
      },
      {
        title: 'The player decides',
        body: (
          <>
            <code>/allay memory</code> lists the facts, <code>/allay forget</code> erases them, and{' '}
            <code>/allay new</code> starts the conversation over.
          </>
        ),
      },
    ],
  },
  languages: {
    kicker: 'Languages',
    title: 'Every player reads their own language',
    lead: (
      <>
        The plugin’s texts come in five languages, picked by the country of the player’s IP address,
        then by the game’s language. <code>/allay language</code> picks one by hand.
      </>
    ),
    names: ['English', 'Русский', 'Español', 'Português', 'Deutsch'],
    note: 'The country database sits on your server: no address goes anywhere for the lookup. Allay answers in whatever language the question was asked.',
  },
  safety: {
    kicker: 'Fair by design',
    title: 'Helpful, never a cheat',
    lead: 'Allay sees what the asking player could see, and gives regular players nothing they didn’t earn.',
    items: [
      {
        title: 'Only the asker’s things',
        body: 'Game tools see the player who asked and the world around them. Other players appear only as the locator bar shows them: a name, a distance, a direction.',
      },
      {
        title: 'No items for regular players',
        body: 'Tools that give items, teleport, or change the weather go to operators only, and the plugin checks three times.',
      },
      {
        title: 'Claims and vanish respected',
        body: 'Allay opens only containers the player could open, honors GriefPrevention claims, and never reveals a vanished player.',
      },
      {
        title: 'Private by default',
        body: 'The admin panel never shows what anyone asked or what Allay answered, in any role. Keys and licenses never reach a log.',
      },
    ],
  },
  install: {
    kicker: 'Install',
    title: 'Running in three steps',
    lead: (
      <>
        The plugin talks to the hosted backend at <code>allay.chat</code> out of the box. You can
        also run your own.
      </>
    ),
    steps: [
      {
        title: 'Drop in the jar',
        body: (
          <>
            Put <code>allay-spigot.jar</code> into <code>plugins/</code> and restart the server.
          </>
        ),
      },
      {
        title: 'Pick who pays',
        body: (
          <>
            As an operator, run <code>/allay link</code> for a subscription, or put your own
            OpenRouter key into <code>provider.byok</code> and run <code>/allay reload</code>.
          </>
        ),
      },
      {
        title: 'Ask',
        body: (
          <>
            Type <code>/ask how do I craft a beacon?</code> Asking “what can you do?” makes Allay
            explain itself.
          </>
        ),
      },
    ],
    download: 'Download allay-spigot.jar',
    latest: 'Latest release: {version}',
    allReleases: 'All releases',
    dockerTitle: 'Running itzg/minecraft-server?',
    dockerLead: (
      <>
        Give <code>PLUGINS</code> the jar’s address, and the container fetches Allay itself.
      </>
    ),
    storesTitle: 'Where to get it',
    storesNone: (
      <>
        Allay is on GitHub only for now. Modrinth and Hangar pages will follow; until then, take the
        jar from the releases.
      </>
    ),
    requirementsTitle: 'You need',
    requirements: [
      'Spigot or Paper 26.3, or a fork like Purpur',
      'Java 25',
      'Optional: GriefPrevention, PlaceholderAPI, Plan',
    ],
  },
  pricing: {
    kicker: 'Pricing',
    title: 'Pay for the model, nothing else',
    lead: 'Every answer costs money at the model’s provider. Your server picks who pays.',
    byok: {
      name: 'Your own key',
      price: 'Free',
      tagline: 'On allay.chat, with your provider’s bill.',
      points: [
        'A key from OpenRouter or any OpenAI-compatible API, paid to the provider directly',
        `Up to ${byokLimits.perMinute} questions a minute, ${count(byokLimits.perDay, 'en')} a day, and ${byokLimits.concurrent} at once per server`,
        'The model must be able to call tools',
        'The key is used for each run and never stored or logged',
      ],
    },
    hosted: {
      name: 'Subscription',
      tagline: 'Our key and our models, paid in Telegram Stars.',
      plans: { week: 'Week', month: 'Month', year: 'Year' },
      period: '{days} days',
      renews: 'renews by itself',
      budget: '{budget} of model costs',
      budgetMonthly: '{budget} of model costs every 30 days',
      steps: [
        <>
          Run <code>/allay link</code> as an operator
        </>,
        <>
          Pay in <a href={links.bot}>@AllayChatBot</a> on Telegram
        </>,
        <>
          See the plan and its limit in <code>/allay status</code>
        </>,
      ],
      cta: 'Open @AllayChatBot',
      infinity: {
        name: 'Infinity',
        price: `${usdWhole(infinity.priceUsd, 'en')} a year, on request`,
        detail: `${infinity.days} days, ${usdWhole(infinity.budget, 'en')} of model costs. Too big for one Telegram invoice: write to @AllayChatBot or personal@mairwunnx.com.`,
      },
    },
    self: {
      name: 'Self-hosted',
      price: 'Free',
      tagline: 'Your backend, your key, no limits.',
      points: [
        'Run Allay Server with Docker next to Minecraft',
        'Every player asks on your own key',
        'No license, no subscription, no per-server limits',
        'Your own admin panel with statistics',
      ],
      cta: 'Host it yourself',
    },
    howTitle: 'How the subscription’s limit works',
    how: [
      'The limit is money, not a number of questions: what your server’s questions really cost at the provider, counting the model, web searches, and the summaries of long conversations.',
      'A typical question on the default model costs between $0.001 and $0.003, depending on searches and the length of the conversation. Automation agents take several steps, so they cost more.',
      'Operators see the limit in /allay status as a percentage, and hear when it passes 80% and 100%. Players only hear that it’s used up.',
      'A payment during a period adds its limit at once and moves the end date. There’s no free trial: a server pays before its first hosted question.',
    ],
  },
  selfHost: {
    kicker: 'Self-hosting',
    title: 'Run your own backend',
    lead: (
      <>
        Allay Server is open source and ships as one Docker image. With <code>SELFHOSTED=1</code>,
        billing is off and every question runs on your key.
      </>
    ),
    steps: [
      <>
        Save this as <code>compose.yaml</code>, give every <code>change-me</code> a random value of
        its own, and run <code>docker compose up -d</code>.
      </>,
      <>
        Point <code>server.url</code> in the plugin’s <code>config.yml</code> at your backend, give{' '}
        <code>server.token</code> the same <code>PLUGIN_TOKEN</code>, and run{' '}
        <code>/allay reload</code>.
      </>,
      <>
        Run <code>/allay init</code> for a one-time link to the admin panel, and paste your
        OpenRouter key there.
      </>,
    ],
    more: 'The full guide: proxies, passwords, upgrades',
  },
  faq: {
    kicker: 'FAQ',
    title: 'Questions server owners ask',
    items: [
      {
        question: 'Does Allay run on Spigot, or only on Paper?',
        answer:
          'Both, and their forks. It builds against the Spigot API. Furnace experience from agents goes to the player only on Paper; on Spigot it stays in the furnace.',
      },
      {
        question: 'Can a regular player get items through Allay?',
        answer: (
          <>
            No. Tools that give items or change the world go to operators only, and the plugin
            checks three times. Agents only move a player’s own things and craft from real
            ingredients. The one exception is <strong>[Take the book]</strong>: a written book with
            Allay’s own long answer, once.
          </>
        ),
      },
      {
        question: 'What does Allay know about other players?',
        answer:
          'Only what the asker’s locator bar shows: a name, a distance, and a direction. Whoever hides from the bar by crouching, a pumpkin, or invisibility hides from Allay too.',
      },
      {
        question: 'What does allay.chat keep about players?',
        answer: (
          <>
            A session for {retention.sessionDays} days after the last question; up to{' '}
            {retention.memoryFacts} facts and places, deaths, and settings until the player erases
            them or stops asking for a year; numbers-only statistics under a pseudonym for{' '}
            {retention.runsDays} days; and traces of answers for {retention.traceDays} days, to find
            faults. Everything a player said is encrypted at rest. The{' '}
            <Link to="/privacy/">privacy policy</Link> has the details. In the game,{' '}
            <code>/allay privacy</code> shows a player the same and erases it on request.
          </>
        ),
      },
      {
        question: 'Which model answers?',
        answer:
          'On a subscription, the model allay.chat picks, which the plugin can’t change. With your own key or your own backend, any model that can call tools; a server can even give each player tier its own model.',
      },
      {
        question: 'Can I cap what players spend?',
        answer: (
          <>
            Yes. The plugin’s quota sets a monthly budget and splits it fairly by tiers you give
            with permissions. See{' '}
            <Link to="/wiki/plugin/paying-for-the-model/#limits-per-player">limits per player</Link>
            .
          </>
        ),
      },
      {
        question: 'Is Allay on Modrinth or Hangar?',
        answer:
          'Not yet. GitHub releases are the one source for now, and itzg/minecraft-server can fetch the jar from there.',
      },
      {
        question: 'I used MCBuddy. What changes?',
        answer: (
          <>
            Allay was MCBuddy until 4.0.0. The plugin moves your old folder, settings, and
            translations over by itself on the first start. See{' '}
            <Link to="/wiki/plugin/coming-from-mcbuddy/">Coming from MCBuddy</Link>.
          </>
        ),
      },
    ],
  },
  closing: {
    title: 'See it on a real server',
    body: 'Allay runs on Moonlands, a hard survival server with friends. Join and ask it something.',
    cta: 'Visit Moonlands',
    address: 'minecraft.mairwunnx.com',
  },
}
