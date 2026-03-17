import { HeroSection } from "@/components/home/HeroSection"
import { TrustStrip } from "@/components/home/TrustStrip"
import { WhySEOFails } from "@/components/home/WhySEOFails"
import { HolisticDifference } from "@/components/home/HolisticDifference"
import { FrameworkPreview } from "@/components/home/FrameworkPreview"
import { ServicesSection } from "@/components/home/ServicesSection"
import { GraderCTA } from "@/components/home/GraderCTA"
import { FounderStory } from "@/components/home/FounderStory"
import { FAQSection } from "@/components/home/FAQSection"
import { FinalCTA } from "@/components/home/FinalCTA"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <WhySEOFails />
      <HolisticDifference />
      <FrameworkPreview />
      <ServicesSection />
      <GraderCTA />
      <FounderStory />
      <FAQSection />
      <FinalCTA />
    </>
  )
}
