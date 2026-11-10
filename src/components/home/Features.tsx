import { useEffect, useId, useRef, useState } from 'react'
import type { Copy } from '../../i18n/types.ts'
import { ArrowIcon } from '../shared/icons.tsx'
import styles from './Features.module.less'
import { Section } from './Section.tsx'

/** How many moments a page of buttons holds. */
const PAGE = 7

/**
 * How a moment plays once the page runs: the question typed into the input line, Allay
 * thinking for a moment, then the answer. The prerendered page and reduced motion show
 * it answered at once.
 */
type Phase = { typed: number; step: 'typing' | 'thinking' | 'answered' }

const TYPE_MS = 28
const THINK_MS = 650

function usePlay(question: string, key: number) {
  const [phase, setPhase] = useState<Phase>({ typed: question.length, step: 'answered' })
  const seen = useRef(false)
  const box = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = box.current
    if (!element) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.4,
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: plays again on a new moment, and once when first seen
  useEffect(() => {
    if (!visible && !seen.current) return
    seen.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let typed = 0
    setPhase({ typed: 0, step: 'typing' })
    const timers: number[] = []
    const typing = window.setInterval(() => {
      typed += 1
      setPhase({ typed, step: 'typing' })
      if (typed >= question.length) {
        window.clearInterval(typing)
        timers.push(window.setTimeout(() => setPhase({ typed, step: 'thinking' }), 220))
        timers.push(window.setTimeout(() => setPhase({ typed, step: 'answered' }), 220 + THINK_MS))
      }
    }, TYPE_MS)
    return () => {
      window.clearInterval(typing)
      for (const timer of timers) window.clearTimeout(timer)
    }
  }, [key, visible && !seen.current])

  return { phase, box }
}

/**
 * What players get: the moments as the game's buttons, a page of them at a time with
 * the game's arrows to turn it, and the chosen one in the game's window, the way the
 * chat shows it: Allay's answer with its buttons over the input line where the player
 * typed the question. The first moment shows without a script; the others need a click.
 */
export function Features({ features }: { features: Copy['features'] }) {
  const [current, setCurrent] = useState(0)
  const base = useId()
  const moment = features.moments[current]
  const pages = Math.ceil(features.moments.length / PAGE)
  const page = Math.floor(current / PAGE)
  const shown = features.moments.slice(page * PAGE, page * PAGE + PAGE)
  // A new page shows its first moment.
  const turn = (to: number) => setCurrent(((to + pages) % pages) * PAGE)
  const { phase, box } = usePlay(moment.ask, current)
  const asked = phase.step !== 'typing'

  return (
    <Section id="features" title={features.title} lead={features.lead}>
      <div className={styles.switcher}>
        <div className={styles.list} role="tablist" aria-label={features.title}>
          {shown.map((item, offset) => {
            const index = page * PAGE + offset
            return (
              <button
                key={item.ask}
                type="button"
                role="tab"
                id={`${base}-tab-${index}`}
                aria-selected={index === current}
                aria-controls={`${base}-panel`}
                className={styles.choice}
                onClick={() => setCurrent(index)}
              >
                {item.title}
              </button>
            )
          })}
          {pages > 1 && (
            <div className={styles.pager}>
              <button
                type="button"
                className={styles.turn}
                aria-label={features.pager.previous}
                onClick={() => turn(page - 1)}
              >
                <ArrowIcon className={styles.back} />
              </button>
              <span className={styles.page} aria-live="polite">
                {features.pager.page
                  .replace('{page}', String(page + 1))
                  .replace('{pages}', String(pages))}
              </span>
              <button
                type="button"
                className={styles.turn}
                aria-label={features.pager.next}
                onClick={() => turn(page + 1)}
              >
                <ArrowIcon className={styles.forward} />
              </button>
            </div>
          )}
        </div>

        <div
          className={styles.panel}
          role="tabpanel"
          id={`${base}-panel`}
          aria-labelledby={`${base}-tab-${current}`}
        >
          <div ref={box} className={styles.window}>
            {asked && (
              <p className={styles.asked}>
                <span className={styles.command}>/ask</span> {moment.ask}
              </p>
            )}
            {phase.step === 'thinking' && (
              <p className={`${styles.chat} ${styles.thinking}`}>
                <span className={styles.mark}>✦ </span>
                <span className={styles.speaker}>{features.speaker}</span> {features.thinking}
              </p>
            )}
            {phase.step === 'answered' && (
              <p className={`${styles.chat} ${styles.answer}`}>
                <span className={styles.mark}>✦ </span>
                <span className={styles.speaker}>{features.speaker}</span>
                <span className={styles.arrow}> » </span>
                {moment.answer}
                {moment.buttons?.map((label) => (
                  <span key={label} className={styles.button}>
                    {' '}
                    [{label}]
                  </span>
                ))}
              </p>
            )}
            <p className={styles.input}>
              {phase.step === 'typing' ? (
                <>
                  <span className={styles.command}>/ask</span> {moment.ask.slice(0, phase.typed)}
                  <span className={styles.caret}>_</span>
                </>
              ) : (
                <span className={styles.caret}>_</span>
              )}
            </p>
          </div>
          <p className={styles.body}>{moment.body}</p>
          <p className={styles.example}>{features.example}</p>
        </div>
      </div>
      <p id="languages" className={styles.more}>
        {features.more}
      </p>
    </Section>
  )
}
