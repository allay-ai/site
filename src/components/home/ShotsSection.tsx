import { shotSize } from '../../data/shots.ts'
import type { Locale } from '../../i18n/locales.ts'
import type { Copy, ShotFile } from '../../i18n/types.ts'
import { AskBlock } from './AskSection.tsx'
import { Section } from './Section.tsx'
import styles from './ShotsSection.module.less'

/** Some of the stills in public/shots/<locale>/, side by side, each with its caption. */
export function ShotGrid({
  shots,
  files,
  locale,
}: {
  shots: Copy['shots']
  files: ShotFile[]
  locale: Locale
}) {
  return (
    <ul className={styles.grid}>
      {files.map((file) => {
        const item = shots.items.find((shot) => shot.file === file)
        if (!item) return null
        return (
          <li key={file} className={styles.item}>
            <figure className={styles.figure}>
              <img
                className={styles.media}
                src={`/shots/${locale}/${file}.webp`}
                alt={item.alt}
                width={shotSize[file].width}
                height={shotSize[file].height}
                loading="lazy"
                decoding="async"
              />
              <figcaption className={styles.caption}>{item.caption}</figcaption>
            </figure>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * Allay in the game, in the page's language: a message to send and the memory
 * window (the hero's video already shows an answer with buttons), then how a
 * player asks. The plugin's tools/shots/shoot.py takes the
 * stills; public/shots/<locale>/ holds the copies.
 */
export function ShotsSection({
  shots,
  ask,
  locale,
}: {
  shots: Copy['shots']
  ask: Copy['ask']
  locale: Locale
}) {
  return (
    <Section id="screens" title={shots.title} lead={shots.lead} tone="band">
      <div id="memory">
        <ShotGrid shots={shots} files={['say', 'memory']} locale={locale} />
      </div>
      <AskBlock ask={ask} />
    </Section>
  )
}
