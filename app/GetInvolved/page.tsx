import GetInvolvedHero from "@/components/GetInvolvedHero";
import GetInvolvedIntro from "@/components/GetInvolvedIntro";
import WaysToGetInvolved from "@/components/WaysToGetInvolved";
import SponsorshipSection from "@/components/SponsorshipSection";
import VolunteerSection from "@/components/VolunteerSection";
import PartnershipSection from "@/components/PartnershipSection";
import DonationCTABanner from "@/components/DonationCTABanner";
import FaqSection from "@/components/FaqSection";
import FinalCTA from "@/components/FinalCTA";

export default function Page() {
    return (
        <div>
            <GetInvolvedHero />
            <GetInvolvedIntro />
            <WaysToGetInvolved />
            <SponsorshipSection />
            <VolunteerSection />
            <PartnershipSection />
            <DonationCTABanner />
            <FaqSection />
            <FinalCTA />
        </div>
    )
}