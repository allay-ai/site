import { Gallery } from '../components/gallery/Gallery.tsx'
import { Section } from '../components/home/Section.tsx'
import { copies } from '../i18n/index.ts'
import type { Locale } from '../i18n/locales.ts'

/** /gallery/ in each language: every capture from the plugin's tools/shots and the build scene, one at a time. */
export function GalleryPage({ locale }: { locale: Locale }) {
  const copy = copies[locale]
  return (
    <div lang={copy.htmlLang}>
      <Section id="media" title={copy.gallery.title} lead={copy.gallery.lead}>
        <Gallery copy={copy} locale={locale} />
      </Section>
    </div>
  )
}
