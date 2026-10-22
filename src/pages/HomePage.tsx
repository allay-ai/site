import { AskSection } from '../components/home/AskSection.tsx'
import { Closing } from '../components/home/Closing.tsx'
import { FaqSection } from '../components/home/FaqSection.tsx'
import { Features } from '../components/home/Features.tsx'
import { Hero } from '../components/home/Hero.tsx'
import { InstallSection } from '../components/home/InstallSection.tsx'
import { MemorySection } from '../components/home/MemorySection.tsx'
import { PricingSection } from '../components/home/PricingSection.tsx'
import { PrivacySection } from '../components/home/PrivacySection.tsx'
import { SafetySection } from '../components/home/SafetySection.tsx'
import { SelfHostSection } from '../components/home/SelfHostSection.tsx'
import { copies } from '../i18n/index.ts'
import { homePath, type Locale } from '../i18n/locales.ts'

export function HomePage({ locale }: { locale: Locale }) {
  const copy = copies[locale]
  return (
    <div lang={copy.htmlLang}>
      <Hero copy={copy} home={homePath(locale)} />
      <Features features={copy.features} />
      <AskSection ask={copy.ask} />
      <MemorySection memory={copy.memory} languages={copy.languages} />
      <SafetySection safety={copy.safety} />
      <PrivacySection privacy={copy.privacy} />
      <InstallSection copy={copy} />
      <PricingSection copy={copy} locale={locale} />
      <SelfHostSection copy={copy} />
      <FaqSection faq={copy.faq} />
      <Closing closing={copy.closing} />
    </div>
  )
}
