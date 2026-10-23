import { Link } from 'react-router-dom'
import { byokLimits, retention } from '../data/plans.ts'
import { links, modsShipped } from '../data/site.ts'
import { count } from './format.ts'
import type { Copy } from './types.ts'

export const en: Copy = {
  htmlLang: 'en',
  meta: {
    title: 'Allay – an AI helper for your Minecraft server',
    description: modsShipped
      ? 'Players type /ask, and Allay answers from their real game: inventory, chests, recipes, the server’s plugins. For Spigot, Paper, Fabric, and NeoForge, hosted or self-hosted.'
      : 'Players type /ask, and Allay answers from their real game: inventory, chests, recipes, the server’s plugins. For Spigot and Paper, hosted or self-hosted.',
  },
  ui: {
    skipToContent: 'Skip to content',
    primaryNav: 'Primary',
    nav: { features: 'Features', pricing: 'Pricing', install: 'Install', faq: 'FAQ', wiki: 'Wiki' },
    menu: 'Menu',
    closeMenu: 'Close menu',
    theme: {
      system: 'Theme: system. Switch to light',
      light: 'Theme: light. Switch to dark',
      dark: 'Theme: dark. Follow the system',
    },
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
    eyebrow: modsShipped
      ? 'AI helper for Minecraft servers and worlds'
      : 'AI helper for Spigot and Paper servers',
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
    facts: [
      modsShipped ? 'Spigot, Paper, Fabric, NeoForge 26.3' : 'Spigot and Paper 26.3',
      'Free with your own key',
      'EU and US privacy law friendly',
      'Open source, MIT',
    ],
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
    killerTitle: 'Killer features',
    killer: [
      {
        icon: 'eye',
        title: 'Answers from the real game',
        body: 'Allay reads the inventory, the block under the crosshair, statistics, and advancements, this server’s recipes and game rules, and the plugins that really run, instead of guessing.',
        ask: 'which of my swords is better?',
      },
      {
        icon: 'search',
        title: 'It finds your things and lights them up',
        body: 'It counts an item in the inventory, the ender chest, and chests up to 32 blocks around, inside shulker boxes and bundles too. The chests that hold it glow through walls, with what’s inside written over them, for you alone.',
        ask: 'where did I put my redstone?',
      },
      {
        icon: 'trail',
        title: 'The way to anything',
        body: 'The compass and a particle trail lead to a death point, a village, a cherry grove, a place Allay remembers, or a friend on the locator bar, following them as they run. A dozen trail looks, from flames to hearts.',
        ask: 'take me back to where I died',
      },
      {
        icon: 'agent',
        title: 'Agents do the chores',
        body: 'They sort chests, stash your loot, fetch 64 iron from the chests around, smelt evenly with exactly the fuel needed, brew in rounds, and craft at a real table, netherite included. They work while you play, hand steps to helper agents, and report.',
        ask: 'smelt all my raw gold evenly',
      },
      {
        icon: 'redstone',
        title: 'Redstone, debugged',
        body: 'Allay reads the machine you look at: dust power, repeater delays, comparators, pistons, torches. The game’s rules point at the fault, like a burned-out torch or a jammed piston, and red marks show where.',
        ask: 'why doesn’t my door open?',
      },
      {
        icon: 'brain',
        title: 'It remembers you and your places',
        body: `Up to ${retention.memoryFacts} memories per player: facts, how they like answers, and places, kept by dimension and found nearest first. The conversation stays for ${retention.sessionDays} days, so a follow-up needs no second look. All of it encrypted.`,
        ask: 'remember there’s an arrow trader here',
      },
    ],
    otherTitle: 'And much more',
    other: [
      {
        icon: 'grid',
        title: 'A tidy inventory',
        body: '“Sword first, food in the last row.” Stacks merge, pinned slots get the best item, chests take the same words, and [Put back] undoes it for 5 minutes.',
      },
      {
        icon: 'window',
        title: 'Buttons and windows',
        body: 'Recipes, every brewing step, enchantments, and villager trades, one click under the answer.',
      },
      {
        icon: 'hammer',
        title: 'The anvil, planned',
        body: 'The cheapest order for your books and items, with the levels shown first. Say yes, and an agent does it and renames the item.',
      },
      {
        icon: 'bulb',
        title: 'No dark corners',
        body: '“Where do I put torches?” puts glowing ghost torches on every spot where mobs could spawn.',
      },
      {
        icon: 'cube',
        title: 'Drafts of builds',
        body: 'Experimental: a build up to 20×15×20 as ghost blocks, layer by layer. A wrong block turns red and says what belongs there.',
      },
      {
        icon: 'sprout',
        title: 'A farm check',
        body: 'Crops by stage, farmland, animals, and spawners around you, in one look.',
      },
      {
        icon: 'flag',
        title: 'Goals and reminders',
        body: 'Up to 5 goals as bars at the top of the screen, reminders from 1 to 120 minutes, and a ping everyone nearby sees and hears.',
      },
      {
        icon: 'chat',
        title: 'Chat mode and /askall',
        body: 'Talk to Allay without a command, or ask in front of everyone so friends can follow up.',
      },
      {
        icon: 'terminal',
        title: 'Commands in words',
        body: '/askx turns a request into commands and runs them as you. Operators only by default, as are the tools that give items or teleport.',
      },
      {
        icon: 'calc',
        title: 'Fresh facts, exact math',
        body: 'Web search when a question needs it, and calculations at 64 significant digits: stacks, Nether coordinates, XP.',
      },
      {
        icon: 'chart',
        title: 'Allay Room',
        body: 'An admin panel with every setting, accounts with roles, and questions, cost, models, tools, and the busiest players. Never what anyone asked.',
      },
      {
        icon: 'key',
        title: 'Pay your way',
        body: 'Your own key, free on allay.chat; a subscription in Telegram Stars; or your own backend without limits.',
      },
    ],
  },
  shots: {
    kicker: 'In the game',
    title: 'What your players see',
    lead: 'Real screenshots from a server with Allay: the live status while it works, answers with buttons right in the text, and the game’s own windows for memory and the data notice.',
    status: {
      label: 'Allay answers: the status above the hotbar, the tools it uses, then the answer',
      caption:
        'While Allay works, the line above the hotbar says what it’s doing, and every tool it uses leaves a line in chat.',
    },
    items: [
      {
        file: 'answer',
        caption:
          'Buttons sit right in the answer: the recipe, the way to the village, coordinates to copy, a note, the next question.',
        alt: 'Allay’s answer in chat with Recipe, Way, Copy, Remember, and Yes buttons in the text',
      },
      {
        file: 'say',
        caption: 'Ask Allay to write to the others for you. Nothing goes out until you press Send.',
        alt: 'Allay offers a polite message with a Send button, and the message appears in chat from the player',
      },
      {
        file: 'memory',
        caption: 'What Allay remembers, in a window: open a memory to find its place or forget it.',
        alt: 'The memory window with five memories and buttons to add one or forget them all',
      },
      {
        file: 'consent',
        caption:
          'Before the first question, every player reads what Allay sends and keeps, and agrees.',
        alt: 'The window with Allay’s data notice and the I agree, No thanks, and Privacy policy buttons',
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
        body: 'What players say is stored encrypted, and the admin panel shows numbers, not conversations. Only an owner can open one answer, with a reason, and every look is logged. Keys and licenses never reach a log.',
      },
    ],
  },
  privacy: {
    kicker: 'Privacy and the law',
    title: 'EU and US privacy law friendly',
    lead: (
      <>
        allay.chat follows the GDPR, Spain’s LOPDGDD, COPPA, and the CCPA/CPRA. Here is what it does
        with players’ data.
      </>
    ),
    laws: ['GDPR', 'LOPDGDD', 'CCPA/CPRA', 'COPPA'],
    items: [
      {
        title: 'Stored in the EU',
        body: 'On servers in Helsinki, Finland. Encrypted nightly backups sit with Cloudflare R2 for up to 12 months.',
      },
      {
        title: 'Sealed with AES-256-GCM',
        body: 'Conversations, memories and places, deaths, settings and goals, and records of questions are encrypted at rest.',
      },
      {
        title: 'Kept only as long as needed',
        body: `A conversation ${retention.sessionDays} days; memories, places, deaths, and settings a year after the player’s last question; records of questions ${retention.traceDays} days; numbers and the players directory 2 years.`,
      },
      {
        title: 'Age and agreement first',
        body: 'Before the first question a player says their age, which must reach their country’s age of consent, and agrees to a short notice. Below that age, Allay answers nothing and sends nothing.',
      },
      {
        title: 'Players control their data',
        body: (
          <>
            <code>/allay privacy</code> shows what’s kept, gives a 24-hour download link, and erases
            it. Withdrawing the agreement erases what it covered.
          </>
        ),
      },
      {
        title: 'No training on questions',
        body: 'Every question goes through OpenRouter in the USA, only to AI providers that don’t collect it for training. A player who didn’t agree reaches the AI only as “Player 1”.',
      },
    ],
    more: (
      <>
        The <Link to="/privacy/">privacy policy</Link> has every detail, with{' '}
        <Link to="/privacy/#usa">a section for US residents</Link>.
      </>
    ),
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
            {modsShipped ? (
              <>
                Put <code>allay-spigot.jar</code> into <code>plugins/</code> on Spigot or Paper, or
                the mod’s jar into <code>mods/</code> on Fabric or NeoForge, and restart the server.
              </>
            ) : (
              <>
                Put <code>allay-spigot.jar</code> into <code>plugins/</code> and restart the server.
              </>
            )}
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
    download: {
      spigot: 'Download allay-spigot.jar',
      fabric: 'Download allay-fabric.jar',
      neoforge: 'Download allay-neoforge.jar',
    },
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
      ...(modsShipped
        ? [
            'Spigot or Paper 26.3, or a fork like Purpur; Fabric 26.3 with Fabric API; or NeoForge 26.3',
            'Java 25',
            'Optional: GriefPrevention, PlaceholderAPI, Plan; in the mods, Flan, Open Parties and Claims, LuckPerms',
          ]
        : [
            'Spigot or Paper 26.3, or a fork like Purpur',
            'Java 25',
            'Optional: GriefPrevention, PlaceholderAPI, Plan',
          ]),
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
      from: 'from',
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
      more: (
        <>
          Need more? <a href="mailto:personal@mairwunnx.com">Contact us</a> for higher limits.
        </>
      ),
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
      ...(modsShipped
        ? [
            {
              question: 'Does Allay run on Fabric, NeoForge, or in singleplayer?',
              answer:
                'Yes. The mods for Fabric and NeoForge 26.3 have every tool the plugin has and run on a dedicated server or in your own singleplayer world, where you link a license without cheats. Players joining a server with Allay need nothing in their game.',
            },
          ]
        : []),
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
        question: 'Do players have to agree first?',
        answer:
          'On allay.chat, yes. Before a first question, Allay shows each player what it sends and keeps, asks their age, and waits for a yes. Until then, nothing about them reaches the backend, and Allay doesn’t answer them.',
      },
      {
        question: 'Is my key or license safe?',
        answer: (
          <>
            Neither ever reaches a log or the chat, and <code>/allay status</code> shows a key
            masked. The license lives in <code>license.key</code>, apart from{' '}
            <code>config.yml</code>, so you can share your config when asking for help.
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
