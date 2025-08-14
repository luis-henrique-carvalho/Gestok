import { HeroSection } from "./components/hero-section"
import { FeaturesSection } from "./components/features-section"
import { BenefitsSection } from "./components/benefits-section"
import { CTASection } from "./components/cta-section"
import { Footer } from "./components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
