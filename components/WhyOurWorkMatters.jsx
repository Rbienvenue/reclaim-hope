export default function WhyOurWorkMatters() {
    return (
        <section
            className="relative w-full bg-cover bg-center py-32 px-6 md:px-16 overflow-hidden"
            style={{
                backgroundImage: "url('/work-matters.jpg')",
            }}
        >

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/70"></div>
            {/* CONTENT */}
            <div className="relative z-10 max-w-5xl mx-auto text-center text-white">

                {/* SMALL LABEL */}
                <p className="text-orange-400 uppercase tracking-[0.3em] font-semibold mb-6">
                    Why Our Work Matters
                </p>

                {/* MAIN TITLE */}

                {/* MAIN CONTENT */}
                <p className="text-lg md:text-2xl leading-relaxed text-white/85 mb-4">
                    Many underserved children face barriers to education,
                    nutrition, mentorship, and opportunities that shape
                    their future. Without support, countless dreams remain
                    unrealized.
                </p>


                <p className="text-lg md:text-2xl leading-relaxed text-white/85 mb-8">
                    At Reclaim Hope Rwanda, we believe every child deserves
                    the chance to learn, grow, and thrive in a supportive
                    community. Through education, empowerment, and hope-centered
                    initiatives, we are helping transform lives and build
                    brighter futures for generations to come.
                </p>               

            </div>

        </section>
    );
}