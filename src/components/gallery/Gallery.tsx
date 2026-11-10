import { useEffect, useRef, useState } from 'react'
import { clipSize, shotSize } from '../../data/shots.ts'
import type { Locale } from '../../i18n/locales.ts'
import type { Copy, ShotFile } from '../../i18n/types.ts'
import { ArrowIcon } from '../shared/icons.tsx'
import styles from './Gallery.module.less'

/** One capture in the gallery: a recording with its poster, or a still. */
type Item = {
  key: string
  video?: string
  image: string
  width: number
  height: number
  title?: string
  caption: string
  alt: string
}

/** The recorded scenes first, the hero's answer among them, then the stills that have no recording. */
const ORDER: ShotFile[] = [
  'trail',
  'build',
  'chests',
  'say',
  'recipe',
  'answer',
  'memory',
  'memory-one',
  'consent',
]

export function galleryItems(copy: Copy, locale: Locale): Item[] {
  const shots: Item[] = ORDER.flatMap((file) => {
    const item = copy.shots.items.find((shot) => shot.file === file)
    if (!item) return []
    const clip = clipSize[file]
    const size = clip ?? shotSize[file]
    return [
      {
        key: file,
        video: clip ? `/shots/${locale}/${file}.mp4` : undefined,
        image: clip ? `/shots/${locale}/${file}-end.webp` : `/shots/${locale}/${file}.webp`,
        width: size.width,
        height: size.height,
        title: item.title,
        caption: item.caption,
        alt: item.alt,
      },
    ]
  })
  const status: Item = {
    key: 'status',
    video: `/shots/${locale}/status.mp4`,
    image: `/shots/${locale}/status.webp`,
    width: shotSize.status.width,
    height: shotSize.status.height,
    caption: copy.video.caption,
    alt: copy.video.label,
  }
  return [shots[0], status, ...shots.slice(1)]
}

/**
 * Every capture, one at a time on a strip that slides sideways: the game's arrows and
 * the keyboard's turn it, the thumbnails jump, and the caption reads large under it.
 * A recording plays with its controls; turning away pauses it.
 */
export function Gallery({ copy, locale }: { copy: Copy; locale: Locale }) {
  const items = galleryItems(copy, locale)
  const [index, setIndex] = useState(0)
  const videos = useRef<(HTMLVideoElement | null)[]>([])
  const go = (to: number) => setIndex((to + items.length) % items.length)

  useEffect(() => {
    videos.current.forEach((video, at) => {
      if (video && at !== index) video.pause()
    })
  }, [index])

  // The keyboard's arrows turn the strip, unless a recording's controls want them.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLVideoElement ||
        event.altKey ||
        event.metaKey ||
        event.ctrlKey
      )
        return
      if (event.key === 'ArrowLeft') setIndex((at) => (at - 1 + items.length) % items.length)
      if (event.key === 'ArrowRight') setIndex((at) => (at + 1) % items.length)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [items.length])

  const { gallery } = copy
  return (
    <section className={styles.gallery} aria-roledescription="carousel" aria-label={gallery.title}>
      <div className={styles.viewport}>
        <ul className={`${styles.track} ${styles[`at${index}`] ?? ''}`}>
          {items.map((item, at) => (
            <li
              key={item.key}
              className={styles.slide}
              aria-roledescription="slide"
              aria-hidden={at !== index}
              aria-label={gallery.position
                .replace('{index}', String(at + 1))
                .replace('{total}', String(items.length))}
            >
              <figure className={styles.figure}>
                {item.video ? (
                  <video
                    ref={(element) => {
                      videos.current[at] = element
                    }}
                    className={styles.media}
                    src={item.video}
                    poster={item.image}
                    width={item.width}
                    height={item.height}
                    controls
                    muted
                    playsInline
                    preload="none"
                    aria-label={item.alt}
                    tabIndex={at === index ? 0 : -1}
                  />
                ) : (
                  <img
                    className={styles.media}
                    src={item.image}
                    alt={item.alt}
                    width={item.width}
                    height={item.height}
                    loading={at === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                )}
                <figcaption className={styles.caption}>
                  {item.title && <strong className={styles.name}>{item.title}</strong>}
                  {item.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.arrow}
          aria-label={gallery.previous}
          onClick={() => go(index - 1)}
        >
          <ArrowIcon className={styles.back} />
        </button>
        <span className={styles.position} aria-live="polite">
          {gallery.position
            .replace('{index}', String(index + 1))
            .replace('{total}', String(items.length))}
        </span>
        <button
          type="button"
          className={styles.arrow}
          aria-label={gallery.next}
          onClick={() => go(index + 1)}
        >
          <ArrowIcon className={styles.forward} />
        </button>
      </div>

      <ul className={styles.thumbs} aria-label={gallery.all}>
        {items.map((item, at) => (
          <li key={item.key}>
            <button
              type="button"
              className={styles.thumb}
              aria-current={at === index}
              aria-label={item.alt}
              onClick={() => setIndex(at)}
            >
              <img
                src={item.image}
                alt=""
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
              />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
