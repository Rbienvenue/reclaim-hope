import {
    HeartHandshake,
    HandCoins,
    Users,
    Building2,
    ArrowRight,
} from "lucide-react";

export default function WaysToGetInvolved() {

    const involvementOptions = [
        {
            id: 1,
            title: "Sponsor a Child",
            description:
                "Help provide education, nutrition, and emotional support for vulnerable children.",
            button: "Become a Sponsor",
            icon: HeartHandshake,
            color: "orange",
        },

        {
            id: 2,
            title: "Donate",
            description:
                "Support our programs through one-time or monthly contributions that transform lives.",
            button: "Donate Now",
            icon: HandCoins,
            color: "green",
        },

        {
            id: 3,
            title: "Volunteer",
            description:
                "Share your skills, time, and passion with our community initiatives and mentorship programs.",
            button: "Join as Volunteer",
            icon: Users,
            color: "blue",
        },

        {
            id: 4,
            title: "Partner With Us",
            description:
                "Collaborate with us to create sustainable impact for children and families.",
            button: "Become a Partner",
            icon: Building2,
            color: "purple",
        },
    ];

    const colorClasses = {
        orange: {
            bg: "bg-orange-100",
            text: "text-orange-500",
            button: "bg-orange-500 hover:bg-orange-600",
        },

        green: {
            bg: "bg-green-100",
            text: "text-green-600",
            button: "bg-green-500 hover:bg-green-600",
        },

        blue: {
            bg: "bg-blue-100",
            text: "text-blue-600",
            button: "bg-blue-500 hover:bg-blue-600",
        },

        purple: {
            bg: "bg-purple-100",
            text: "text-purple-600",
            button: "bg-purple-500 hover:bg-purple-600",
        },
    };

    return (
        <section className="w-full bg-[#f9fafb] py-24 px-6 md:px-16">

            <div className="max-w-7xl mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-20">

                    <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold mb-4">
                        Ways to Get Involved
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Choose How You Want
                        <br />
                        to Make an Impact
                    </h2>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Every contribution matters. Whether through sponsorship,
                        donations, volunteering, or partnerships, your support
                        helps transform lives and strengthen communities.
                    </p>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

                    {involvementOptions.map((item) => {

                        const Icon = item.icon;

                        const colors = colorClasses[item.color];

                        return (
                            <div
                                key={item.id}
                                className="group bg-white rounded-[32px] p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition duration-500 flex flex-col"
                                data-aos="fade-up"
                                data-aos-delay={item.id * 100}
                            >

                                {/* ICON */}
                                <div
                                    className={`w-20 h-20 rounded-2xl ${colors.bg} flex items-center justify-center mb-8`}
                                >

                                    <Icon className={`w-10 h-10 ${colors.text}`} />

                                </div>

                                {/* TITLE */}
                                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                    {item.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p className="text-gray-600 leading-relaxed mb-10 flex-grow">
                                    {item.description}
                                </p>

                                {/* BUTTON */}
                                <button
                                    className={`${colors.button} text-white px-6 py-4 rounded-full font-semibold flex items-center justify-center gap-3 transition duration-300 hover:scale-105`}
                                >

                                    {item.button}

                                    <ArrowRight className="w-5 h-5" />

                                </button>

                            </div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
}