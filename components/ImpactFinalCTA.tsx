import Link from "next/link";

export default function ImpactFinalCTA() {
    return (
        <section className="w-full bg-white py-24 px-6 md:px-16 overflow-hidden">

            <div className="max-w-6xl mx-auto rounded-[32px] border border-gray-200 bg-slate-50 shadow-[0_30px_80px_rgba(15,23,42,0.08)] overflow-hidden">

                <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] p-10 md:p-16">

                    <div className="space-y-8">
                <div className="inline-flex items-center gap-3 rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600 mb-6" data-aos="fade-up" data-aos-duration="700">
                            <span className="h-2.5 w-2.5 rounded-full bg-orange-500" />
                            Your Support Creates Real Change
                        </div>

                        <div className="space-y-4" data-aos="fade-up" data-aos-delay="100" data-aos-duration="700">
                            <p className="text-green-700 uppercase tracking-[0.3em] font-semibold text-sm">
                                Your support creates real change
                            </p>

                            <h2 className="text-4xl md:text-5xl font-bold text-slate-950 leading-tight">
                                Mobilize hope with action that feels
                                <span className="block text-orange-600">grounded, measurable, and lasting.</span>
                            </h2>

                            <p className="max-w-3xl text-lg text-slate-700 leading-8">
                                Every donation and sponsorship helps turn data into stories of transformation. Join us in supporting education, nutrition, mentorship, and community resilience across Rwanda.
                            </p>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-3">
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <p className="text-3xl font-bold text-green-700">95%</p>
                                <p className="mt-2 text-sm text-slate-600">Program retention rate</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <p className="text-3xl font-bold text-green-700">4,200</p>
                                <p className="mt-2 text-sm text-slate-600">Meals provided this year</p>
                            </div>
                            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                <p className="text-3xl font-bold text-green-700">8</p>
                                <p className="mt-2 text-sm text-slate-600">Communities reached</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[28px] bg-gradient-to-br from-white via-slate-50 to-green-50 p-8 shadow-inner shadow-slate-200/50">
                        <div className="space-y-8">
                            <div className="rounded-[28px] bg-white p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                                <p className="text-sm uppercase tracking-[0.3em] font-semibold text-orange-600 mb-4">
                                    Ready to make impact?
                                </p>
                                <h3 className="text-3xl font-bold text-slate-950 leading-tight">
                                    Give hope now with a simple choice.
                                </h3>
                                <p className="mt-4 text-slate-600 leading-7">
                                    Choose a meaningful next step toward sustainable change for vulnerable children and their communities.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <Link href="/donate" className="w-full rounded-full bg-green-700 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-green-700/20 transition hover:bg-green-800 inline-block text-center">
                                    Donate Now
                                </Link>
                                <Link href="/donate" className="w-full rounded-full border border-green-700 bg-white px-8 py-4 text-base font-semibold text-green-700 transition hover:bg-green-50 inline-block text-center">
                                    Sponsor a Child
                                </Link>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700">
                                <p className="font-semibold text-slate-900">Prefer guided support?</p>
                                <p className="mt-2 text-sm leading-6">
                                    Reach out to our team and we’ll help you choose the right giving path for your goals and the children we serve.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}
