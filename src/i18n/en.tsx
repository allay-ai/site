import { Link } from 'react-router-dom'
import {
  byokLimits,
  plans,
  retention,
  soloOnSale,
  soloPlans,
  soloReleaseDays,
} from '../data/plans.ts'
import { links, modsShipped } from '../data/site.ts'
import { count } from './format.ts'
import type { Copy } from './types.ts'

/** The lowest price among some plans, in Stars. */
const cheapest = (list: { stars: number }[]) => Math.min(...list.map((plan) => plan.stars))

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
      textures:
        'The buttons, tabs, windows, and slots are Minecraft’s own textures, ©\u00a0Mojang Studios.',
    },
  },
  hero: {
    title: 'Ask your world anything',
    lead: (
      <>
        Type <code>/ask</code>, and Allay reads your real game before it answers.
      </>
    ),
    platforms: 'Allay {version} for Minecraft 26.3, on a server or in your own world.',
    manual: 'Read the manual',
  },
  video: {
    label: 'Allay answers: the status above the hotbar, the tools it uses, then the answer',
    caption:
      'While Allay works, the line above the hotbar says what it’s doing, and every tool it uses leaves a line in chat.',
    pause: 'Pause',
    play: 'Play',
  },
  features: {
    title: 'It looks before it answers',
    lead: 'Allay reads the game through tools the plugin runs, so answers fit this player, this world, and this server.',
    moments: [
      {
        ask: 'which of my swords is better?',
        title: 'Answers from the real game',
        body: 'Allay reads the inventory, the block under the crosshair, statistics, and advancements instead of guessing.',
        answer:
          'The diamond one with Sharpness V: 10 damage a hit, against 8 for your netherite sword without enchantments.',
      },
      {
        ask: 'how do I set a home here?',
        title: 'It knows this server',
        body: 'Mods’ items, data packs’ recipes, the plugins that really run, and the commands you may use here.',
        answer: 'Stand where you want it and run /sethome. EssentialsX gives it on this server.',
        buttons: ['/sethome'],
      },
      {
        ask: 'where did I put my redstone?',
        title: 'It finds your things and lights them up',
        body: 'It counts an item in chests up to 32 blocks around, and the chests that hold it glow for you alone.',
        answer:
          '2 stacks sit in the chest left of your furnace, and 14 more in the barrel under the stairs. I lit them up.',
        buttons: ['The way'],
      },
      {
        ask: 'take me back to where I died',
        title: 'The way to anything',
        body: 'The compass and a particle trail lead to a death point, a village, or a friend on the locator bar.',
        answer:
          'You died 230 blocks north-east, at -120 64 410. The compass points there, and the trail leads the way.',
      },
      {
        ask: 'smelt all my raw gold evenly',
        title: 'Agents do the chores',
        body: 'They sort chests, smelt, brew in rounds, and craft at a real table while you play.',
        answer:
          'An agent took it: 24 raw gold into 3 furnaces, 8 each, with exactly 3 coal. I’ll tell you when it’s done.',
      },
      {
        ask: 'why doesn’t my door open?',
        title: 'Redstone, debugged',
        body: 'Allay reads the machine you look at, and red marks show where the fault is.',
        answer: 'The dust runs past the door instead of into it. I marked the block in red.',
      },
      {
        ask: 'remember there’s an arrow trader here',
        title: 'It remembers you and your places',
        body: `Up to ${retention.memoryFacts} memories per player, places kept by dimension, all of it encrypted. /allay memory lists them.`,
        answer: 'Remembered: an arrow trader at -212 71 348.',
        buttons: ['The way'],
      },
    ],
    example: 'Examples. Real answers depend on the player’s game.',
    speaker: 'Allay',
    more: (
      <>
        There’s more: a tidy inventory, buttons and windows, the anvil planned, fireworks to your
        design, drafts of builds, goals and reminders, web search and exact math, five languages,
        and Allay Room, the admin panel.{' '}
        <Link to="/wiki/plugin/what-allay-can-do/">Everything Allay can do</Link>
      </>
    ),
  },
  shots: {
    title: 'What your players see',
    lead: 'Real screenshots from a server with Allay.',
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
    title: 'Three commands and a chat mode',
    lead: 'Allay answers in the language of the question.',
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
  privacy: {
    title: 'Helpful, never a cheat',
    lead: (
      <>
        Allay sees what the asking player could see. allay.chat follows the GDPR, Spain’s LOPDGDD,
        COPPA, and the CCPA/CPRA.
      </>
    ),
    items: [
      {
        title: 'Only the asker’s things',
        body: 'Other players appear only as the locator bar shows them: a name, a distance, a direction.',
      },
      {
        title: 'No items for regular players',
        body: 'Tools that give items or teleport go to operators only, and the plugin checks three times.',
      },
      {
        title: 'Claims and vanish respected',
        body: 'Allay opens only containers the player could open and never reveals a vanished player.',
      },
      {
        title: 'Age and agreement first',
        body: 'Below their country’s age of consent, Allay answers nothing and sends nothing.',
      },
      {
        title: 'Stored in the EU, sealed',
        body: 'On servers in Helsinki, Finland. Conversations and memories are sealed with AES-256-GCM.',
      },
      {
        title: 'Players control their data',
        body: (
          <>
            <code>/allay privacy</code> shows what’s kept, gives a 24-hour download link, and erases
            it.
          </>
        ),
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
    title: 'Three steps to the first answer',
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
            As an operator, or in your own world, run <code>/allay link</code> for a subscription,
            or put your own OpenRouter key into <code>provider.byok</code> and run{' '}
            <code>/allay reload</code>.
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
      spigot: 'Download for Paper and Spigot',
      fabric: 'Download for Fabric',
      neoforge: 'Download for NeoForge',
    },
    latest: 'Latest release: {version}, for Minecraft 26.3',
    allReleases: 'All releases',
    dockerTitle: 'Running itzg/minecraft-server?',
    dockerLead: (
      <>
        Give <code>PLUGINS</code>, or <code>MODS</code> for a mod, the jar’s address on allay.chat,
        and the container fetches Allay itself.
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
    title: 'Pay for the model, nothing else',
    lead: 'Every answer costs money at the model’s provider. Your server picks who pays.',
    routes: {
      byok: {
        name: 'Your own key',
        price: 'Free',
        line: (
          <>
            On allay.chat, with a key from <a href={links.openRouter}>OpenRouter</a> or any
            OpenAI-compatible API: up to {byokLimits.perMinute} questions a minute,{' '}
            {count(byokLimits.perDay, 'en')} a day, and {byokLimits.concurrent} at once.
          </>
        ),
      },
      hosted: {
        name: 'Subscription',
        line: 'Our key and our models, paid in Telegram Stars.',
      },
      solo: {
        name: 'Solo',
        line: 'For the mod in your own world: one player, a smaller limit, a smaller price.',
      },
      self: {
        name: 'Self-hosted',
        price: 'Free',
        line: 'Allay Server with Docker next to Minecraft: your key, no license, no limits.',
        cta: 'Host it yourself',
      },
    },
    from: 'from',
    serverTitle: 'For a server',
    soloTitle: 'Solo, for your own world',
    plans: { week: 'Week', month: 'Month', year: 'Year' },
    period: '{days} days',
    renews: 'renews by itself',
    budget: '{budget} of model costs',
    budgetMonthly: '{budget} of model costs every 30 days',
    soloNote: `A singleplayer or LAN world with the Fabric or NeoForge mod, no cheats needed. It answers you alone; its payer can hand it on once every ${soloReleaseDays} days.`,
    steps: [
      <>
        Run <code>/allay link</code> as an operator or in your own world
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
        Need higher limits? Write to <a href={links.authorEmail}>personal@mairwunnx.com</a> or to{' '}
        <a href={links.authorTelegram}>@mairwunnx</a> on Telegram.
      </>
    ),
    how: [
      'The limit is money, not a number of questions: what your server’s questions really cost at the provider.',
      'A typical question on the default model costs between $0.001 and $0.003. There’s no free trial.',
    ],
  },
  faq: {
    title: 'Questions server owners ask',
    items: [
      {
        question: 'Where does Allay run?',
        answer: modsShipped
          ? 'On Spigot, Paper, and their forks as a plugin, and on Fabric and NeoForge 26.3 as a mod, on a dedicated server or in your own world. Players who join need nothing in their game.'
          : 'On Spigot, Paper, and their forks, as a plugin. Players who join need nothing in their game.',
      },
      {
        question: 'What does it cost?',
        answer: (
          <>
            Nothing on allay.chat with your own AI key. A subscription for a server starts at{' '}
            {cheapest(plans)} ⭐ a week
            {soloOnSale && (
              <>, and Solo, for the mod in your own world, at {cheapest(soloPlans)} ⭐</>
            )}
            . Your own backend is free. See <Link to="/#pricing">pricing</Link>.
          </>
        ),
      },
      {
        question: 'Do I need my own AI key?',
        answer:
          'No. A subscription runs on allay.chat’s key and model. With a key of your own from OpenRouter or another OpenAI-compatible API, you pay its provider and pick any model that can call tools.',
      },
      {
        question: 'Can players cheat with it?',
        answer: (
          <>
            No. Tools that give items or change the world are for operators only, checked three
            times. Agents only move a player’s own things and craft from real ingredients. The one
            gift is <strong>[Take the book]</strong>: a written book with Allay’s long answer, once.
          </>
        ),
      },
      {
        question: 'Can Allay give away where other players are?',
        answer:
          'Only what the asker’s locator bar already shows: a name, a distance, and a direction. Whoever hides from the bar, crouching, under a pumpkin, or invisible, hides from Allay too.',
      },
      {
        question: 'What happens to my players’ data?',
        answer: (
          <>
            On allay.chat, before a first question, Allay shows each player what it sends and keeps,
            asks their age, and waits for a yes. It then keeps a session for {retention.sessionDays}{' '}
            days and up to {retention.memoryFacts} facts and places, all encrypted, until the player
            erases them with <code>/allay privacy</code>. The{' '}
            <Link to="/privacy/">privacy policy</Link> has the details.
          </>
        ),
      },
      {
        question: 'Can I cap what players spend?',
        answer: (
          <>
            Yes. A monthly budget splits fairly between the player tiers you give with permissions.
            See{' '}
            <Link to="/wiki/plugin/paying-for-the-model/#limits-per-player">limits per player</Link>
            .
          </>
        ),
      },
      {
        question: 'Can I host everything myself?',
        answer: (
          <>
            Yes. Allay Server is open source and runs in Docker next to Minecraft, with no billing
            and no limits, and nothing passes through allay.chat. See{' '}
            <Link to="/#self-hosting">self-hosting</Link>.
          </>
        ),
      },
      {
        question: 'Which languages does it speak?',
        answer:
          'Allay answers in the language of the question. Its buttons, windows, and messages come in English, Russian, Spanish, Portuguese, and German, picked by the player’s country or game language, or with /allay language.',
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
