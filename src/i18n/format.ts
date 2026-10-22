// Numbers written by hand rather than through Intl: the prerender runs in Node
// and hydration in the browser, and two ICU versions may disagree on a space,
// which React reports as a hydration mismatch.

const groupSeparator = { en: ',', ru: ' ', es: ' ' } as const
const decimalSeparator = { en: '.', ru: ',', es: ',' } as const

type FormatLocale = keyof typeof groupSeparator

export function count(value: number, locale: FormatLocale): string {
  const digits = String(value)
  // Spanish groups only from five digits on (RAE): 2000, but 10 000.
  if (locale === 'es' && digits.length <= 4) return digits
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator[locale])
}

/** US dollars with cents: $0.75 in English, 0,75 $ in Russian and Spanish. */
export function usd(amount: number, locale: FormatLocale): string {
  const number = amount.toFixed(2).replace('.', decimalSeparator[locale])
  return locale === 'en' ? `$${number}` : `${number}\u00a0$`
}
