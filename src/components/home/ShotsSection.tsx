import { clipSize, shotSize } from '../../data/shots.ts'
import type { Locale } from '../../i18n/locales.ts'
import type { Copy, ShotFile } from '../../i18n/types.ts'
import { useLoop } from '../shared/useLoop.ts'
import { AskBlock } from './AskSection.tsx'
import { Section } from './Section.tsx'
import styles from './ShotsSection.module.less'

/**
 * A scene recorded whole, from the question typed to what it brings, played as
 * [useLoop] says; its last frame is the poster.
 */
function ShotClip({
  file,
  alt,
  video,
  locale,
}: {
  file: ShotFile
  alt: string
  video: Copy['video']
  locale: Locale
}) {
  const { ref, held, toggle, scripted } = useLoop()
  const size = clipSize[file]
  if (!size) return null
  return (
    <div className={styles.frame}>
      <video
        ref={ref}
        className={styles.media}
        src={`/shots/${locale}/${file}.mp4`}
        poster={`/shots/${locale}/${file}-end.webp`}
        width={size.width}
        height={size.height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={alt}
      />
      {scripted && (
        <button type="button" className={styles.pause} aria-pressed={held} onClick={toggle}>
          {held ? video.play : video.pause}
        </button>
      )}
    </div>
  )
}

/**
 * Some of the captures in public/shots/<locale>/, side by side, each with its
 * caption: a recorded scene where there is one and [video] names its button,
 * else the still.
 */
export function ShotGrid({
  shots,
  files,
  locale,
  video,
}: {
  shots: Copy['shots']
  files: ShotFile[]
  locale: Locale
  video?: Copy['video']
}) {
  return (
    <ul className={styles.grid}>
      {files.map((file) => {
        const item = shots.items.find((shot) => shot.file === file)
        if (!item) return null
        return (
          <li key={file} className={styles.item}>
            <figure className={styles.figure}>
              {video && clipSize[file] ? (
                <ShotClip file={file} alt={item.alt} video={video} locale={locale} />
              ) : (
                <img
                  className={styles.media}
                  src={`/shots/${locale}/${file}.webp`}
                  alt={item.alt}
                  width={shotSize[file].width}
                  height={shotSize[file].height}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <figcaption className={styles.caption}>{item.caption}</figcaption>
            </figure>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * Allay in the game, in the page's language: a message to send, the memory
 * window and one memory, a recipe, the way to a village, and glowing chests,
 * the scenes recorded whole where they move (the hero's video already shows an
 * answer with buttons), then how a player asks. The plugin's tools/shots/shoot.py
 * takes the stills and the recordings; public/shots/<locale>/ holds the copies.
 */
export function ShotsSection({
  shots,
  ask,
  video,
  locale,
}: {
  shots: Copy['shots']
  ask: Copy['ask']
  video: Copy['video']
  locale: Locale
}) {
  return (
    <Section id="screens" title={shots.title} lead={shots.lead} tone="band">
      <div id="memory">
        <ShotGrid
          shots={shots}
          files={['say', 'memory', 'memory-one', 'recipe', 'trail', 'chests']}
          locale={locale}
          video={video}
        />
      </div>
      <AskBlock ask={ask} />
    </Section>
  )
}
