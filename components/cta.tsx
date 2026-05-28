import Image from "next/image";
import Link from "next/link";

export default function FinalCTASection() {
    return (
        <section className="w-full px-6 md:px-16 py-24 bg-white">

            <div className="relative overflow-hidden rounded-[40px]">

                {/* Optimized Background Image */}
                <Image
                    src="/community.jpg"
                    alt="Community impact and transformation through Reclaim Hope Rwanda programs"
                    fill
                    className="object-cover animate-parallax"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/70"></div>

                {/* CONTENT */}
                <div className="relative z-10 max-w-4xl mx-auto text-center px-8 py-28">

                    {/* SMALL LABEL */}
                    <p className="text-orange-400 uppercase tracking-[0.3em] font-semibold mb-6 animate-fade-in-up">
                        Join Our Mission
                    </p>

                    {/* MAIN TITLE */}
                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        Together, We Can Change
                        <br />
                        a Child’s Future
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        Your support helps provide education, mentorship,
                        nutrition, and opportunities that empower underserved
                        children to build brighter futures.
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>

                        {/* DONATE BUTTON */}
                        <Link href="/donate" className="bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:scale-105 hover:shadow-orange-500/25 animate-soft-pulse animate-soft-hover-glow inline-block text-center">

                            Donate Now

                        </Link>

                        {/* SPONSOR BUTTON */}
                        <Link href="/sponsor" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-2xl animate-soft-pulse animate-soft-hover-glow inline-block text-center">

                            Become a Sponsor

                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}