export default function GetInvolvedCTA() {
    return (
        <section className="w-full px-6 md:px-16 py-24 bg-[#f9fafb]">

            <div
                className="relative overflow-hidden rounded-[40px] bg-cover bg-center"
                style={{
                    backgroundImage: "url('/programcta .png')",
                }}
            >

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* COLOR GLOWS */}
                <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/30 blur-3xl rounded-full"></div>

                <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500/30 blur-3xl rounded-full"></div>

                {/* CONTENT */}
                <div className="relative z-10 max-w-5xl mx-auto text-center px-8 py-28 text-white">

                    {/* LABEL */}
                    <p className="text-orange-400 uppercase tracking-[0.3em] font-semibold mb-6">
                        Get Involved
                    </p>

                    {/* TITLE */}
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
                        Help Us Expand
                        <br />
                        Our Impact
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-lg md:text-2xl text-white/85 leading-relaxed max-w-3xl mx-auto mb-14">
                        Your support helps provide education, mentorship,
                        nutrition, and opportunities that empower children
                        and strengthen communities across Rwanda.
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-6">

                        {/* SPONSOR BUTTON */}
                        <button className="bg-orange-500 hover:bg-orange-600 transition duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:scale-105">

                            Sponsor a Child

                        </button>

                        {/* DONATE BUTTON */}
                        <button className="bg-green-500 hover:bg-green-600 transition duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:scale-105">

                            Donate Now

                        </button>

                        {/* PARTNER BUTTON */}
                        <button className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold hover:scale-105">

                            Partner With Us

                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}