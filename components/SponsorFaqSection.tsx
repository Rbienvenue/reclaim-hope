import FaqSection from "@/components/FaqSection";

export default function SponsorFaqSection() {
    return (
        <>
            <FaqSection />
            <div className="max-w-4xl mx-auto px-6 md:px-16 mt-8 text-center">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    If any part of sponsorship still feels unclear, please <a className="underline font-bold text-gray-400" href="/contact">get in touch</a> with our team. We’re here to answer your questions and help you move forward with confidence.
                </p>
            </div>
        </>
    );
}
