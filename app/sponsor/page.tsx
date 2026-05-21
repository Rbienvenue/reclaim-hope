import ChildGrid from "@/components/ChildGrid";
import SponsorHero from "@/components/SponsorHero";
import SponsorIntro from "@/components/SponsorIntro";
import SponsorFaqSection from "@/components/SponsorFaqSection";

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