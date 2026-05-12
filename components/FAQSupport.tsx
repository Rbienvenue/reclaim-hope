"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I sponsor a child?",
    answer: "You can sponsor a child through our monthly sponsorship program. Each sponsorship provides education, nutrition, and mentorship. Contact us to learn more about available children and sponsorship levels."
  },
  {
    question: "Do you accept international donations?",
    answer: "Yes, we accept donations from around the world. All donations are tax-deductible for US donors and go directly to our programs. We use secure payment processing for international transactions."
  },
  {
    question: "Can volunteers join remotely?",
    answer: "Absolutely! We have remote volunteer opportunities in areas like content creation, social media management, grant writing, and virtual tutoring. Contact our volunteer coordinator to discuss options."
  },
  {
    question: "How are donations used?",
    answer: "100% of donations go directly to our programs. We maintain full transparency with regular impact reports. Our administrative costs are covered by separate funding sources."
  },
  {
    question: "How can I partner with Reclaim Hope?",
    answer: "We welcome partnerships with corporations, foundations, and other NGOs. Partnership opportunities include employee matching programs, cause marketing, and joint program development."
  }
];

export default function FAQSupport() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-24 px-6 md:px-16 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our work and how you can get involved.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-gray-200 rounded-3xl overflow-hidden bg-[#f9fafb]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <button
                  onClick={() => toggleAccordion(index)}
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
    </section>
  );
}