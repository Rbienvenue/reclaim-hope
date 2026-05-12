import { Mail } from "lucide-react";

export default function NewsletterSection() {
    return (
        <section className="w-full py-24 px-6 md:px-16 bg-white" data-aos="fade-up">

            <div className="max-w-5xl mx-auto">

                {/* NEWSLETTER CARD */}
                <div className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 rounded-[40px] px-8 py-16 md:px-16 text-center text-white">

                    {/* BACKGROUND DECORATION */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                    {/* ICON */}
                    <div className="w-20 h-20 mx-auto rounded-full bg-white/20 flex items-center justify-center mb-8">

                        <Mail className="w-10 h-10 text-white" />

                    </div>

                    {/* HEADING */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Stay Connected
                    </h2>

                    {/* DESCRIPTION */}
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/90 leading-relaxed mb-10">
                        Stay updated with our programs, community impact stories,
                        events, and opportunities to support vulnerable children.
                    </p>

                    {/* FORM */}
                    <form className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">

                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 px-6 py-4 rounded-full bg-white text-gray-800 outline-none text-lg"
                        />

                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 transition px-8 py-4 rounded-full text-white font-semibold text-lg"
                        >
                            Subscribe
                        </button>

                    </form>

                </div>

            </div>

        </section>
    );
}