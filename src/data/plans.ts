// The hosted backend's prices and limits. They mirror the defaults of
// PLAN_*_STARS, PLAN_*_BUDGET, and BYOK_* in allay-ai/server
// (src/features/settings/settings.definitions.ts and the wiki's “Who pays for
// the model”). When the backend's numbers change, change these with them.

export type PlanId = 'week' | 'month' | 'year'

export type Plan = {
  id: PlanId
  stars: number
  days: number
  /** US dollars of model costs per budget window. */
  budget: number
  /** A year refills its budget every 30 days; the others have one window. */
  refillsMonthly: boolean
  /** Paid as a Telegram Stars subscription that renews every 30 days. */
  renews: boolean
}

export const plans: Plan[] = [
  { id: 'week', stars: 150, days: 7, budget: 0.75, refillsMonthly: false, renews: false },
  { id: 'month', stars: 500, days: 30, budget: 3, refillsMonthly: false, renews: true },
  { id: 'year', stars: 10_000, days: 365, budget: 6, refillsMonthly: true, renews: false },
]

/** What a server with its own key may ask of allay.chat. */
export const byokLimits = { perMinute: 20, perDay: 2000, concurrent: 4 } as const

/**
 * How long the backend keeps what it stores (the wiki's “Memory and traces”), as
 * of Allay Server 6.9: CHAT_TTL_SECONDS, TRACE_DAYS, MEMORY_MAX, and the TTL indexes.
 */
export const retention = {
  sessionDays: 30,
  publicThreadHours: 2,
  agentThreadHours: 2,
  /** Facts and saved places together, per player (MEMORY_MAX). */
  memoryFacts: 200,
  /** Memories and places, deaths, and settings go this long after the player's last question. */
  memoryDays: 365,
  /** Statistics of each answer, the players directory, servers, and consents. */
  runsDays: 730,
  auditDays: 730,
  traceDays: 30,
  exportHours: 24,
  /** The backend's POLICY_REVISION: a consent to an older notice is asked again. */
  policyRevision: '2026-10-23',
} as const
