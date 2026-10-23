import { useEffect, useRef } from 'react'
import { shotSize } from '../../data/shots.ts'
import type { Locale } from '../../i18n/locales.ts'
import type { Copy } from '../../i18n/types.ts'
import { Section } from './Section.tsx'
import styles from './ShotsSection.module.less'

/**
 * Allay in the game, in the page's language: the live status as a looping video, then stills of an answer, a message
 * to send, and the windows. The plugin's tools/shots/shoot.py takes them; public/shots/<locale>/ holds the copies.
 */
export function ShotsSection({ shots, locale }: { shots: Copy['shots']; locale: Locale }) {
  const video = useRef<HTMLVideoElement>(null)
  const src = (file: string) => `/shots/${locale}/${file}`

  // React leaves `muted` out of the prerendered HTML, so the browser may refuse to play; it plays once mounted,
  // unless the reader asked for less motion.
  useEffect(() => {
    const element = video.current
    if (!element) return
    element.muted = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    element.play().catch(() => {})
  }, [])

  return (
    <Section id="screens" kicker={shots.kicker} title={shots.title} lead={shots.lead}>
      <figure className={styles.status}>
        <video
          ref={video}
          className={styles.media}
          src={src('status.mp4')}
          poster={src('status.webp')}
          width={shotSize.status.width}
          height={shotSize.status.height}
          muted
          loop
          playsInline
          controls={false}
          preload="metadata"
          aria-label={shots.status.label}
        />
        <figcaption className={styles.caption}>{shots.status.caption}</figcaption>
      </figure>
      <ul className={styles.grid}>
        {shots.items.map((item) => (
          <li key={item.file} className={styles.item}>
            <figure className={styles.figure}>
              <img
                className={styles.media}
                src={src(`${item.file}.webp`)}
                alt={item.alt}
                width={shotSize[item.file].width}
                height={shotSize[item.file].height}
                loading="lazy"
                decoding="async"
              />
              <figcaption className={styles.caption}>{item.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  )
}
