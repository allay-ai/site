import type { ReactNode } from 'react'
import type { PlanId } from '../data/plans.ts'
import type { Platform } from '../data/site.ts'

/** One of the moments the front page leads with: the question a player types, then what Allay does. */
export type Moment = {
  /** As the player would type it after /ask. */
  ask: string
  title: string
  body: ReactNode
}

export type Question = { question: string; answer: ReactNode }

/**
 * Everything the front page and the site's chrome say, in one language. Each
 * language file fills all of it, so a missing text is a type error rather than
 * an English line on a Russian page.
 */
/** The stills in public/shots/<locale>/, without .webp. */
export type ShotFile = 'answer' | 'say' | 'memory' | 'consent'

export type Copy = {
  /** For <html lang> and Intl. */
  htmlLang: string
  meta: { title: string; description: string }
  ui: {
    skipToContent: string
    primaryNav: string
    nav: { features: string; pricing: string; install: string; faq: string; wiki: string }
    menu: string
    closeMenu: string
    /** The theme button's label in each state: what it is now and what a click picks. */
    theme: { system: string; light: string; dark: string }
    language: string
    github: string
    copy: string
    copied: string
    footer: {
      product: string
      docs: string
      code: string
      legal: string
      privacy: string
      terms: string
      serverWiki: string
      pluginWiki: string
      releases: string
      madeBy: ReactNode
      notMojang: string
    }
  }
  hero: {
    title: ReactNode
    lead: ReactNode
    /** Under the downloads; with {version}. */
    platforms: string
    manual: string
  }
  /** The looping capture of Allay at work, in the hero. */
  video: { label: string; caption: string; pause: string; play: string }
  features: {
    title: string
    lead: string
    moments: Moment[]
    /** One sentence naming the rest, with a link to the wiki's full list. */
    more: ReactNode
  }
  /** Screenshots from the game; files live in public/shots/<locale>/. */
  shots: {
    title: string
    lead: string
    items: { file: ShotFile; caption: string; alt: string }[]
  }
  ask: {
    title: string
    lead: ReactNode
    commands: { command: string; what: ReactNode }[]
    chatTitle: string
    chatLead: ReactNode
    prefixes: { input: string; goes: string }[]
    youWrite: string
    itGoes: string
  }
  /** What keeps play fair and data safe, beside the consent and memory windows. */
  privacy: {
    title: string
    lead: ReactNode
    items: { title: string; body: ReactNode }[]
    more: ReactNode
  }
  install: {
    title: string
    lead: ReactNode
    steps: { title: string; body: ReactNode }[]
    /** The download button for each build the latest release carries, named by its loaders. */
    download: Record<Platform, string>
    /** With {version}. */
    latest: string
    allReleases: string
    dockerTitle: string
    dockerLead: ReactNode
    storesTitle: string
    storesNone: ReactNode
    requirementsTitle: string
    requirements: ReactNode[]
  }
  pricing: {
    title: string
    lead: string
    /** The four ways to pay, one row each. */
    routes: {
      byok: { name: string; price: string; line: ReactNode }
      hosted: { name: string; line: ReactNode }
      solo: { name: string; line: ReactNode }
      self: { name: string; price: string; line: ReactNode; cta: string }
    }
    /** Before the cheapest plan's price in Stars. */
    from: string
    serverTitle: string
    soloTitle: string
    plans: Record<PlanId, string>
    /** With {days}. */
    period: string
    renews: string
    /** With {budget}. */
    budget: string
    /** With {budget}. */
    budgetMonthly: string
    soloNote: ReactNode
    steps: ReactNode[]
    cta: string
    /** Where to ask for higher limits. */
    more: ReactNode
    how: ReactNode[]
  }
  faq: { title: string; items: Question[] }
  closing: { title: string; body: ReactNode; cta: string; address: string }
}
