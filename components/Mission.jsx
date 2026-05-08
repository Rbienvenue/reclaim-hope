import {
    Target,
    Eye,
    HeartHandshake,
} from "lucide-react";

export default function MissionVisionValues() {

    const cards = [
        {
            id: 1,
            title: "Mission",
            description:
                "To empower vulnerable children through education, nutrition, mentorship, and holistic community support programs.",
            icon: Target,
            color: "orange",
        },

        {
            id: 2,
            title: "Vision",
            description:
                "A future where every child has the opportunity to thrive, grow confidently, and achieve their full potential.",
            icon: Eye,
            color: "green",
        },

        {
            id: 3,
            title: "Values",
            description:
                "Compassion, Integrity, Empowerment, Community, and Hope guide every initiative and action we take.",
            icon: HeartHandshake,
            color: "blue",
        },
    ];

    const colorStyles = {
        orange: {
            bg: "bg-orange-100",
            text: "text-orange-500",
        },

        green: {
            bg: "bg-green-100",
            text: "text-green-600",
        },

        blue: {
            bg: "bg-blue-100",
            text: "text-blue-600",
        },
    };

    const delayClasses = [
        "animate-fade-up-delay-1",
        "animate-fade-up-delay-2",
        "animate-fade-up-delay-3",
    ];

    return (
        <section className="w-full bg-[#f9fafb] py-24 px-6 md:px-16">

            <div className="max-w-7xl mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-16">

                    <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold mb-4">
                        Our Foundation
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Mission, Vision & Values
                    </h2>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Our mission, vision, and core values guide every effort
                        we make toward empowering children and strengthening communities.
                    </p>

                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {cards.map((card) => {

                        const Icon = card.icon;
                        const style = colorStyles[card.color];

                        return (
                            <div
                                key={card.id}
                                className={`bg-white rounded-[32px] p-10 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition duration-500 border border-gray-100 opacity-0 ${delayClasses[card.id - 1]}`}
                            >

                                {/* ICON */}
                                <div className={`w-20 h-20 rounded-full ${style.bg} flex items-center justify-center mb-8`}>

                                    <Icon className={`w-10 h-10 ${style.text}`} />

                                </div>

                                {/* TITLE */}
                                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                                    {card.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {card.description}
                                </p>

                            </div>
                        );
                    })}

                </div>

            </div>

        </section>
    );
}