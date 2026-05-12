import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function FeaturedStory() {
  return (
    <section className="w-full py-24 px-6 md:px-16 bg-white" data-aos="fade-up">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl animate-slow-zoom">
            <Image
              src="/mentors_kids.jpg" // Placeholder, replace with actual image
              alt="Featured story of transformation"
              fill
              className="object-cover"
              quality={85}
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              From Struggle to Success: A Child&apos;s Journey
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Meet Jean-Pierre, who overcame incredible odds to become a beacon of hope in his community. Through our education program, he not only learned to read and write but discovered his passion for helping others...
            </p>
            <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-full text-white font-semibold">
              Read Full Story
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}