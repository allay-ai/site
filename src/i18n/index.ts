import { en } from './en.tsx'
import { es } from './es.tsx'
import type { Locale } from './locales.ts'
import { ru } from './ru.tsx'
import type { Copy } from './types.ts'

export const copies: Record<Locale, Copy> = { en, ru, es }

/** Fills {name} placeholders in a text. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  )
}
