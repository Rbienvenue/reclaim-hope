"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Bar,
} from "recharts";

type TimelineItem = {
    year: string;
    title: string;
    description: string;
};

const timeline: TimelineItem[] = [
    {
        year: "2021",
        title: "100 Children Supported",
        description:
            "Started expanding educational and mentorship support programs.",
    },

    {
        year: "2022",
        title: "Nutrition Programs Expanded",
        description:
            "Introduced consistent meal and wellness initiatives for underserved children.",
    },

    {
        year: "2023",
        title: "300+ Children Reached",
        description:
            "Community outreach and after-school programs continued growing.",
    },

    {
        year: "2025",
        title: "500+ Children Supported",
        description:
            "Expanded partnerships and strengthened long-term community impact.",
    },
];

const chartData = [
    {
        year: "2021",
        children: 100,
        meals: 12000,
        volunteers: 15,
    },

    {
        year: "2022",
        children: 180,
        meals: 24000,
        volunteers: 28,
    },

    {
        year: "2023",
        children: 300,
        meals: 42000,
        volunteers: 45,
    },

    {
        year: "2024",
        children: 420,
        meals: 56000,
        volunteers: 60,
    },

    {
        year: "2025",
        children: 500,
        meals: 65000,
        volunteers: 80,
    },
];

export default function AnnualGrowthSection() {

    return (
        <section className="w-full bg-[#f9fafb] py-24 px-6 md:px-16 overflow-hidden">

            <div className="max-w-7xl mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-20">

                    <p className="text-yellow-500 uppercase tracking-[0.3em] font-semibold mb-4">
                        Growth & Progress
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Growing Impact
                        <br />
                        Year After Year
                    </h2>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Our journey reflects continuous growth in educational support,
                        nutrition initiatives, community partnerships, and opportunities
                        created for underserved children and families.
                    </p>

                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-start">

                    {/* LEFT SIDE - TIMELINE */}
                    <div className="relative" data-aos="fade-right" data-aos-duration="1000">

                        {/* VERTICAL LINE */}
                        <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-yellow-200"></div>

                        <div className="space-y-12">

                            {timeline.map((item, index) => (

                                <div
                                    key={index}
                                    data-aos="fade-up"
                                    data-aos-delay={index * 150}
                                    className="relative pl-16"
                                >

                                    {/* DOT */}
                                    <div className="absolute left-0 top-2 w-10 h-10 rounded-full bg-yellow-500 border-8 border-yellow-100"></div>

                                    {/* CARD */}
                                    <div className="bg-white rounded-[28px] p-8 shadow-sm border border-gray-100 hover:shadow-xl transition duration-500">

                                        <span className="inline-block bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                            {item.year}
                                        </span>

                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            {item.title}
                                        </h3>

                                        <p className="text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* RIGHT SIDE - CHARTS */}
                    <div className="space-y-10">

                        {/* CHILDREN GROWTH */}
                        <div data-aos="fade-left" data-aos-duration="1000" className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">

                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Children Supported Growth
                            </h3>

                            <div className="w-full h-[300px]">

                                <ResponsiveContainer width="100%" height="100%">

                                    <LineChart data={chartData}>

                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis dataKey="year" />

                                        <YAxis />

                                        <Tooltip />

                                        <Line
                                            type="monotone"
                                            dataKey="children"
                                            stroke="#f97316"
                                            strokeWidth={4}
                                        />

                                    </LineChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                        {/* MEALS DISTRIBUTED */}
                        <div data-aos="fade-left" data-aos-duration="1000" data-aos-delay="150" className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100">

                            <h3 className="text-2xl font-bold text-gray-900 mb-6">
                                Meals Distributed
                            </h3>

                            <div className="w-full h-[300px]">

                                <ResponsiveContainer width="100%" height="100%">

                                    <BarChart data={chartData}>

                                        <CartesianGrid strokeDasharray="3 3" />

                                        <XAxis dataKey="year" />

                                        <YAxis />

                                        <Tooltip />

                                        <Bar
                                            dataKey="meals"
                                            fill="#16a34a"
                                            radius={[10, 10, 0, 0]}
                                        />

                                    </BarChart>

                                </ResponsiveContainer>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}