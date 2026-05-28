import Link from "next/link";

export default function DonationCTABanner() {
    return (
        <section className="w-full px-6 md:px-16 py-24 bg-[#f9fafb]">

            <div
                className="relative overflow-hidden rounded-[40px] bg-cover bg-center animate-slow-background-zoom"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBlZHVjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60')",
                }}
                data-aos="zoom-in"
                data-aos-duration="1500"
            >

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-black/70"></div>

                {/* GLOW EFFECTS */}
                <div className="absolute top-0 left-0 w-80 h-80 bg-orange-500/30 blur-3xl rounded-full"></div>

                <div className="absolute bottom-0 right-0 w-80 h-80 bg-green-500/30 blur-3xl rounded-full"></div>

                {/* CONTENT */}
                <div className="relative z-10 max-w-4xl mx-auto text-center px-8 py-28 text-white">

                    {/* SMALL LABEL */}
                    <p className="text-orange-400 uppercase tracking-[0.3em] font-semibold mb-6">
                        Make an Impact
                    </p>

                    {/* HEADING */}
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-8">
                        Together We Can Build
                        <br />
                        Brighter Futures
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="text-lg md:text-2xl text-white/85 leading-relaxed max-w-3xl mx-auto mb-14">
                        Your support helps underserved children access
                        education, nutrition, mentorship, and opportunities
                        that inspire hope and lasting transformation.
                    </p>

                    {/* BUTTONS */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">

                        {/* DONATE BUTTON */}
                        <Link href="/donate" className="bg-orange-500 hover:bg-orange-600 transition duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl hover:scale-105 inline-block text-center">

                            Donate Now

                        </Link>

                        {/* CONTACT BUTTON */}
                        <Link href="/contact" className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 inline-block text-center">

                            Contact Us

                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}