import GetInvolvedHero from "@/components/GetInvolvedHero";
import GetInvolvedIntro from "@/components/GetInvolvedIntro";
import WaysToGetInvolved from "@/components/WaysToGetInvolved";
import FaqSection from "@/components/FaqSection";
import HelpSection from "@/components/help";

export default function Page() {
    return (
        <div className="bg-white">
            <GetInvolvedHero />
            <GetInvolvedIntro />
            <WaysToGetInvolved />
            <HelpSection />
            <FaqSection />
        </div>
    )
}