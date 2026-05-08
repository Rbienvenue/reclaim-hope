import {
    Users,
    Utensils,
    GraduationCap,
    MapPinned,
} from "lucide-react";

export default function ImpactSnapshot() {

    const stats = [
        {
            id: 1,
            number: "1200+",
            label: "Children Supported",
            icon: Users,
        },

        {
            id: 2,
            number: "5000+",
            label: "Meals Provided",
            icon: Utensils,
        },

        {
            id: 3,
            number: "95%",
            label: "School Attendance Rate",
            icon: GraduationCap,
        },

        {
            id: 4,
            number: "15+",
            label: "Communities Reached",
            icon: MapPinned,
        },
    ];

    return (
        <section className="w-full bg-[#f9fafb] py-20 px-6 md:px-16">

            <div className="max-w-6xl mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-14">

                    <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold mb-4">
                        Impact Snapshot
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Small Numbers, Big Impact
                    </h2>

                    <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Every initiative contributes toward transforming lives
                        and creating stronger communities across Rwanda.
                    </p>

                </div>

                {/* STATS GRID */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

                    {stats.map((stat) => {

                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.id}
                                className="bg-white rounded-[28px] p-8 text-center border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-500"
                            >

                                {/* ICON */}
                                <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-6">

                                    <Icon className="w-8 h-8 text-orange-500" />

                                </div>

                                {/* NUMBER */}
                                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                                    {stat.number}
                                </h3>

                                {/* LABEL */}
                                <p className="text-gray-600 leading-relaxed">
                                    {stat.label}
                                </p>

                            </div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
}