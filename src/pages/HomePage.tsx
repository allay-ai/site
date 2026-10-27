import { Closing } from '../components/home/Closing.tsx'
import { FaqSection } from '../components/home/FaqSection.tsx'
import { Features } from '../components/home/Features.tsx'
import { Hero } from '../components/home/Hero.tsx'
import { InstallSection } from '../components/home/InstallSection.tsx'
import { PricingSection } from '../components/home/PricingSection.tsx'
import { PrivacySection } from '../components/home/PrivacySection.tsx'
import { ShotsSection } from '../components/home/ShotsSection.tsx'
import { copies } from '../i18n/index.ts'
import type { Locale } from '../i18n/locales.ts'

export function HomePage({ locale }: { locale: Locale }) {
  const copy = copies[locale]
  return (
    <div lang={copy.htmlLang}>
      <Hero copy={copy} locale={locale} />
      <Features features={copy.features} />
      <ShotsSection shots={copy.shots} ask={copy.ask} locale={locale} />
      <PricingSection copy={copy} locale={locale} />
      <InstallSection copy={copy} />
      <PrivacySection privacy={copy.privacy} shots={copy.shots} locale={locale} />
      <FaqSection faq={copy.faq} />
      <Closing closing={copy.closing} />
    </div>
  )
}
