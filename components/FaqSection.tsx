"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import StillHaveQuestion from "./stillHaveQuestion";

export default function FaqSection() {

    const faqs = [
        {
            question: "How does child sponsorship work?",
            answer:
                "Child sponsorship helps provide education, nutrition, mentorship, and emotional support for vulnerable children through long-term community-centered programs.",
        },

        {
            question: "Are donations secure?",
            answer:
                "Yes. We are committed to transparency and accountability. Donations are processed securely and directly support our programs and initiatives.",
        },

        {
            question: "Can international donors contribute?",
            answer:
                "Absolutely. We welcome support from individuals, organizations, and partners around the world who want to help create lasting impact.",
        },

        {
            question: "How are funds used?",
            answer:
                "Funds are used to support educational programs, nutrition initiatives, mentorship activities, school materials, community outreach, and child development programs.",
        },

        {
            question: "Can I volunteer remotely?",
            answer:
                "Yes. Depending on your skills and availability, there may be opportunities for mentorship, digital support, fundraising, communications, and other remote contributions.",
        },
    ];

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="w-full bg-white py-24 px-6 md:px-16">

            <div className="max-w-4xl mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-16">

                    <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold mb-4">
                        Frequently Asked Questions
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Questions About
                        <br />
                        Getting Involved
                    </h2>

                    <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        We believe transparency and trust are essential.
                        Here are answers to some common questions about
                        sponsorship, donations, volunteering, and partnerships.
                    </p>

                </div>

                {/* FAQ LIST */}
                <div className="space-y-5">

                    {faqs.map((faq, index) => {

                        const isOpen = activeIndex === index;

                        return (
                            <div
                                key={index}
                                className="border border-gray-200 rounded-3xl overflow-hidden bg-[#f9fafb]"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >

                                {/* QUESTION */}
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between text-left px-8 py-6"
                                >

                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {faq.question}
                                    </h3>

                                    <ChevronDown
                                        className={`w-6 h-6 text-gray-500 transition duration-300 ${
                                            isOpen ? "rotate-180" : ""
                                        }`}
                                    />

                                </button>

                                {/* ANSWER */}
                                <div
                                    className={`grid transition-all duration-500 ease-in-out ${
                                        isOpen
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                    }`}
                                >

                                    <div className="overflow-hidden">

                                        <div className="px-8 pb-6 text-gray-600 leading-relaxed">
                                            {faq.answer}
                                        </div>

                                    </div>

                                </div>

                            </div>
                        );
                    })}

                </div>

            </div>

                {/* STILL HAVE QUESTIONS */}        
                <StillHaveQuestion/>

        </section>
    );
}