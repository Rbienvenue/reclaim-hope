"use client";

import CountUp from "react-countup";

export default function ProgramImpactHighlights() {

    const progressMetrics = [
        {
            label: "School Attendance Improvement",
            value: 90,
        },

        {
            label: "Nutrition Program Reach",
            value: 85,
        },

        {
            label: "Mentorship Participation",
            value: 95,
        },
    ];

    return (
        <section className="w-full bg-white py-24 px-6 md:px-16 overflow-hidden">

            <div className="max-w-7xl mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-20">

                    <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold mb-4">
                        Program Impact
                    </p>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Our programs continue to create measurable impact
                        across communities by supporting children through
                        education, nutrition, mentorship, and empowerment.
                    </p>

                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

                    {/* LEFT BIG CARD */}
                    <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-orange-500 to-orange-600 text-white p-12 flex flex-col justify-center">

                        {/* DECORATIVE GLOW */}
                        <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/10 rounded-full blur-3xl"></div>

                        <p className="uppercase tracking-[0.3em] text-white/70 font-semibold mb-6">
                            Children Enrolled
                        </p>

                        <h3 className="text-6xl md:text-8xl font-bold mb-6">

                            <CountUp
                                end={500}
                                duration={4}
                            />

                            +

                        </h3>

                        <p className="text-xl text-white/80 leading-relaxed max-w-md">
                            Hundreds of children are receiving educational
                            support, mentorship, and opportunities for brighter futures.
                        </p>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="bg-[#f9fafb] rounded-[40px] p-10 flex flex-col justify-center">

                        <div className="space-y-10">

                            {/* MEALS SERVED */}
                            <div>

                                <div className="flex items-center justify-between mb-4">

                                    <h4 className="text-xl font-semibold text-gray-900">
                                        Meals Served
                                    </h4>

                                    <span className="text-orange-500 font-bold text-xl">

                                        <CountUp
                                            end={65000}
                                            duration={4}
                                            separator=","
                                        />

                                        +

                                    </span>

                                </div>

                                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                                    <div className="h-full bg-orange-500 rounded-full w-[85%]"></div>

                                </div>

                            </div>

                            {/* PROGRESS METRICS */}
                            {progressMetrics.map((metric, index) => (
                                <div key={index}>

                                    <div className="flex items-center justify-between mb-4">

                                        <h4 className="text-lg font-semibold text-gray-900">
                                            {metric.label}
                                        </h4>

                                        <span className="text-green-600 font-bold text-lg">
                                            {metric.value}%
                                        </span>

                                    </div>

                                    {/* PROGRESS BAR */}
                                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                                        <div
                                            className="h-full bg-green-500 rounded-full transition-all duration-1000"
                                            style={{
                                                width: `${metric.value}%`,
                                            }}
                                        ></div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}