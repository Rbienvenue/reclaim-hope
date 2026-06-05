import Link from "next/link";

export default function AboutCTASection() {
    return (
        <section className="w-full px-6 md:px-16 py-24 bg-white">

            <div
                className="relative overflow-hidden rounded-[40px] bg-cover bg-center"
                style={{
                    backgroundImage: "url('/finalcta.png')",
                }}
            >

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/70"></div>

                {/* DECORATIVE GLOW */}
                <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-500/20 blur-3xl rounded-full"></div>

                <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-500/20 blur-3xl rounded-full"></div>

                {/* CONTENT */}
                <div className="relative z-10 max-w-4xl mx-auto text-center px-8 py-28 animate-fade-up">

                    {/* SMALL LABEL */}
                    <p className="text-yellow-400 uppercase tracking-[0.3em] font-semibold mb-6">
                        Join Our Mission
                    </p>

                    {/* TITLE */}
                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8">
                        Join Us in
                        <br />
                        Changing Lives
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-12">
                        Together, we can empower underserved children through
                        education, mentorship, nutrition, and opportunities
                        that inspire brighter futures and stronger communities.
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">

                        {/* PRIMARY BUTTON */}
                        <Link href="/donate" className="bg-yellow-500 hover:bg-yellow-600 transition duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:scale-105 inline-block text-center">

                            Donate Now

                        </Link>

                        {/* SECONDARY BUTTON */}
                        <Link href="/contact" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 inline-block text-center">

                            Become a Partner

                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}