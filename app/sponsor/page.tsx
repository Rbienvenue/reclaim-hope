import ChildGrid from "@/components/ChildGrid";
import SponsorHero from "@/components/SponsorHero";
import SponsorIntro from "@/components/SponsorIntro";
import SponsorFaqSection from "@/components/SponsorFaqSection";
import StillHaveQuestion from "@/components/stillHaveQuestion";

export default function SponsorPage() {
    return (
        <>
            <SponsorHero/>
            <SponsorIntro/>
            <ChildGrid/>
            <SponsorFaqSection />

        </>
    );
}