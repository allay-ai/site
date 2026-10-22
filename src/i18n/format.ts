// Numbers written by hand rather than through Intl: the prerender runs in Node
// and hydration in the browser, and two ICU versions may disagree on a space,
// which React reports as a hydration mismatch.

const groupSeparator = { en: ',', ru: ' ' } as const
const decimalSeparator = { en: '.', ru: ',' } as const

type FormatLocale = keyof typeof groupSeparator

export function count(value: number, locale: FormatLocale): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator[locale])
}

/** US dollars with cents: $0.75 in English, 0,75 $ in Russian. */
export function usd(amount: number, locale: FormatLocale): string {
  const number = amount.toFixed(2).replace('.', decimalSeparator[locale])
  return locale === 'en' ? `$${number}` : `${number} $`
}
