import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { shotSize } from '../../data/shots.ts'
import { builds, type Platform } from '../../data/site.ts'
import releases from '../../generated/releases.json'
import { fill } from '../../i18n/index.ts'
import type { Locale } from '../../i18n/locales.ts'
import type { Copy } from '../../i18n/types.ts'
import { LoaderLogo } from '../shared/LoaderLogo.tsx'
import styles from './Hero.module.less'

/** The jars the latest release carries, in the order the page names them. */
export const shippedBuilds = (Object.entries(builds) as [Platform, string | null][]).filter(
  (entry): entry is [Platform, string] => entry[1] !== null,
)

/**
 * Allay at work in the game, in the page's language: the plugin's own capture of
 * the status above the hotbar, the tools, and the answer. It plays while it's on
 * screen, holds still for visitors who asked for less motion, and a button
 * pauses it, since it loops past five seconds.
 */
function StatusVideo({ video, locale }: { video: Copy['video']; locale: Locale }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [held, setHeld] = useState(false)
  const [seen, setSeen] = useState(false)
  const [scripted, setScripted] = useState(false)

  // React leaves `muted` out of the prerendered HTML, so the browser may refuse to
  // play until the element is muted here. Reduced motion starts it held.
  useEffect(() => {
    const element = ref.current
    if (!element) return
    element.muted = true
    setScripted(true)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setHeld(true)
    const observer = new IntersectionObserver(([entry]) => setSeen(entry.isIntersecting))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (seen && !held) element.play().catch(() => {})
    else element.pause()
  }, [seen, held])

  const src = (file: string) => `/shots/${locale}/${file}`
  return (
    <figure className={styles.screen}>
      <div className={styles.frame}>
        <video
          ref={ref}
          className={styles.video}
          src={src('status.mp4')}
          poster={src('status.webp')}
          width={shotSize.status.width}
          height={shotSize.status.height}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={video.label}
        />
        {scripted && (
          <button
            type="button"
            className={styles.pause}
            aria-pressed={held}
            onClick={() => setHeld((value) => !value)}
          >
            {held ? video.play : video.pause}
          </button>
        )}
      </div>
      <figcaption className={styles.caption}>{video.caption}</figcaption>
    </figure>
  )
}

export function Hero({ copy, locale }: { copy: Copy; locale: Locale }) {
  const { hero, install } = copy
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.text}>
          <h1 id="hero-title" className={styles.title}>
            {hero.title}
          </h1>
          <p className={styles.lead}>{hero.lead}</p>
        </div>

        <div className={styles.action}>
          <ul className={styles.downloads}>
            {shippedBuilds.map(([platform, href]) => (
              <li key={platform}>
                <a className={styles.download} href={href}>
                  <LoaderLogo platform={platform} />
                  <span className={styles.downloadLabel}>{install.download[platform]}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className={styles.platforms}>
            {fill(hero.platforms, { version: releases.plugin || '' })}{' '}
            <Link to="/wiki/plugin/">{hero.manual}</Link>
          </p>
        </div>

        <StatusVideo video={copy.video} locale={locale} />
      </div>
    </section>
  )
}
