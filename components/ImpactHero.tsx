export default function ImpactHero() {
    return (
        <section
            className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center px-6 md:px-16 overflow-hidden"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjBlZHVjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60')",
            }}
        >

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/65"></div>

            {/* GLOW EFFECTS */}
            <div className="absolute top-10 left-10 w-80 h-80 bg-orange-500/20 blur-3xl rounded-full"></div>

            <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-500/20 blur-3xl rounded-full"></div>

            {/* CONTENT */}
            <div className="relative z-10 max-w-5xl text-center text-white">

                {/* LABEL */}
                <p className="text-orange-400 uppercase tracking-[0.3em] font-semibold mb-6">
                    Our Impact
                </p>

                {/* HEADING */}
                {/* SUBTITLE */}
                <p className="text-lg md:text-2xl text-white/85 leading-relaxed max-w-4xl mx-auto">
                    Through education, nutrition, mentorship, and
                    community support, we are helping children build
                    brighter futures and creating meaningful change
                    across Rwanda.
                </p>

            </div>

        </section>
    );
}