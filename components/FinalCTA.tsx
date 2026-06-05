export default function FinalCTA() {
    return (
        <section className="w-full bg-[#f9fafb] py-28 px-6 md:px-16 overflow-hidden">

            <div className="max-w-4xl mx-auto text-center">

                {/* SMALL LABEL */}
                <p className="text-yellow-500 uppercase tracking-[0.3em] font-semibold mb-6">
                    Join the Mission
                </p>

                {/* HEADING */}
                <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-8">
                    Every Child
                    <br />
                    Deserves Hope
                </h2>

                {/* DESCRIPTION */}
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
                    Together, we can create opportunities, restore hope,
                    and empower children to build brighter futures.
                </p>

                {/* CTA BUTTON */}
                <button className="bg-yellow-500 hover:bg-yellow-600 transition duration-300 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-xl hover:scale-105">

                    Take Action Today

                </button>

            </div>

        </section>
    );
}