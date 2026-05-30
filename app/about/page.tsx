import AboutHero from "@/components/about-hero";
import WhoWeAreSection from "@/components/WhoWeAreSection";
import MissionVisionValues from "@/components/Mission";
import OurStorySection from "@/components/OurStorySection";
import LeadershipSection from "@/components/LeadershipSection";
import WhyOurWorkMatters from "@/components/WhyOurWorkMatters";
import ImpactSnapshot from "@/components/ImpactSnapshot";
import AboutCTASection from "@/components/AboutCTASection";
import HelpSection from "@/components/help";

export default function AboutPage() {
    return (
        <div>
            <AboutHero />
            < WhoWeAreSection/>
            <MissionVisionValues/>
            <OurStorySection/>
            <WhyOurWorkMatters/>
            <LeadershipSection/>
            <ImpactSnapshot/>
            <HelpSection/>
        </div>
    )
}