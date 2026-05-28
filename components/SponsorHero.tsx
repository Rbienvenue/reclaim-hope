export default function SponsorHero() {

    return (
        <section
            className="relative w-full h-[90vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
            style={{
                backgroundImage: "url('/sponsor-hero.png')",
            }}
        >

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/65"></div>

            {/* CONTENT */}
            <div className="relative z-10 text-center text-white px-6 max-w-5xl">

                {/* LABEL */}
                <p className="text-orange-400 uppercase tracking-[0.3em] font-semibold mb-6">
                    Sponsor a Child
                </p>

                {/* HEADING */}
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">

                    Change a Child’s
                    <br />
                    Future Forever

                </h1>

                {/* SUBTITLE */}
                <p className="text-lg md:text-2xl text-white/85 leading-relaxed max-w-4xl mx-auto mb-10">

                    Your sponsorship helps underserved children access
                    education, nutrition, mentorship, and opportunities
                    to build brighter futures.

                </p>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-5 justify-center">

                    <button className="bg-orange-500 hover:bg-orange-600 transition duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:scale-105">

                        Sponsor a Child

                    </button>

                    <button className="border border-white/40 hover:bg-white hover:text-gray-900 transition duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold backdrop-blur-md">

                        Learn More

                    </button>

                </div>

            </div>

        </section>
    );
}