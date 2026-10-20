import type { ReactNode } from 'react'
import type { PlanId } from '../data/plans.ts'

/** A feature card's picture; components/home/FeatureIcon.tsx draws each. */
export type IconName =
  | 'eye'
  | 'search'
  | 'trail'
  | 'agent'
  | 'grid'
  | 'window'
  | 'redstone'
  | 'note'
  | 'globe'
  | 'brain'
  | 'shield'
  | 'calc'

export type Feature = { icon: IconName; title: string; body: ReactNode }

export type ChatLine =
  | { kind: 'tool'; label: string; result: string }
  | { kind: 'answer'; text: string }
  | { kind: 'buttons'; labels: string[] }

export type Question = { question: string; answer: ReactNode }

/**
 * Everything the front page and the site's chrome say, in one language. Each
 * language file fills all of it, so a missing text is a type error rather than
 * an English line on a Russian page.
 */
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
    themeToLight: string
    themeToDark: string
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
      protocol: string
      releases: string
      madeBy: ReactNode
      notMojang: string
    }
  }
  hero: {
    eyebrow: string
    title: ReactNode
    lead: ReactNode
    primary: string
    secondary: string
    facts: string[]
  }
  demo: {
    label: string
    caption: string
    command: string
    status: string
    lines: ChatLine[]
  }
  features: { kicker: string; title: string; lead: string; items: Feature[] }
  ask: {
    kicker: string
    title: string
    lead: ReactNode
    commands: { command: string; what: ReactNode }[]
    chatTitle: string
    chatLead: ReactNode
    prefixes: { input: string; goes: string }[]
    youWrite: string
    itGoes: string
  }
  memory: { kicker: string; title: string; items: { title: string; body: ReactNode }[] }
  languages: { kicker: string; title: string; lead: ReactNode; names: string[]; note: ReactNode }
  safety: {
    kicker: string
    title: string
    lead: string
    items: { title: string; body: ReactNode }[]
  }
  install: {
    kicker: string
    title: string
    lead: ReactNode
    steps: { title: string; body: ReactNode }[]
    download: string
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
    kicker: string
    title: string
    lead: string
    byok: { name: string; price: string; tagline: string; points: ReactNode[] }
    hosted: {
      name: string
      tagline: string
      plans: Record<PlanId, string>
      /** With {days}. */
      period: string
      renews: string
      /** With {budget}. */
      budget: string
      /** With {budget}. */
      budgetMonthly: string
      steps: ReactNode[]
      cta: string
    }
    self: { name: string; price: string; tagline: string; points: ReactNode[]; cta: string }
    howTitle: string
    how: ReactNode[]
  }
  selfHost: {
    kicker: string
    title: string
    lead: ReactNode
    steps: ReactNode[]
    more: string
  }
  faq: { kicker: string; title: string; items: Question[] }
  closing: { title: string; body: ReactNode; cta: string; address: string }
}
