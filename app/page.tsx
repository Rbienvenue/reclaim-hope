import FinalCTASection from "@/components/cta";
import GallerySection from "@/components/gallery";
import HelpSection from "@/components/help";
import HeroSection from "@/components/hero-section";
import ImpactSection from "@/components/impact";
import IntroductionSection from "@/components/introduction";
import NewsletterSection from "@/components/newsLetter";
import TestimonialSection from "@/components/testimonial";

export default function Home() {
  return (
    <div>
      <HeroSection/>
      <IntroductionSection/>
      <ImpactSection/>
      <TestimonialSection/>
      <HelpSection/>
      <GallerySection/>
      <NewsletterSection/>
      <FinalCTASection/>
    </div>
  );
}
