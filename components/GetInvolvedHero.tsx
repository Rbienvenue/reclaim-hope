export default function GetInvolvedHero() {
    return (
        <section
            className="relative w-full h-[75vh] bg-cover bg-center flex items-center justify-center px-6 md:px-16 overflow-hidden"
            style={{
                backgroundImage: "url('/finalcta.png')",
            }}
            data-aos="fade-up"
        >

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/65"></div>

            {/* GLOW EFFECTS */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/20 blur-3xl rounded-full"></div>

            <div className="absolute bottom-10 right-10 w-72 h-72 bg-green-500/20 blur-3xl rounded-full"></div>

            {/* CONTENT */}
            <div className="relative z-10 max-w-4xl text-center text-white">

                {/* SMALL LABEL */}
                <p className="text-orange-400 uppercase tracking-[0.3em] font-semibold mb-6">
                    Get Involved
                </p>

                {/* HEADING */}
                <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
                    Be Part of
                    <br />
                    the Change
                </h1>

                {/* SUBTITLE */}
                <p className="text-lg md:text-2xl text-white/85 leading-relaxed max-w-3xl mx-auto">
                    Your support helps underserved children access education,
                    nutrition, mentorship, and hope for a better future
                    through community-driven initiatives.
                </p>

            </div>

        </section>
    );
}