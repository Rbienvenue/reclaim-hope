import {
    Heart,
    HandCoins,
    Users,
    ArrowRight,
} from "lucide-react";

export default function HelpSection() {

    const helpCards = [
        {
            id: 1,
            title: "Donate",
            description:
                "Support vulnerable children with educational materials, nutrition, and mentorship opportunities.",
            icon: HandCoins,
            color: "orange",
            button: "Donate Now",
        },
        {
            id: 2,
            title: "Sponsor a Child",
            description:
                "Help provide school fees, healthcare, and long-term support for a child’s future.",
            icon: Heart,
            color: "green",
            button: "Become a Sponsor",
        },
        {
            id: 3,
            title: "Volunteer / Partner",
            description:
                "Join our mission through volunteering, partnerships, or community collaboration initiatives.",
            icon: Users,
            color: "blue",
            button: "Get Involved",
        },
    ];

    const colorStyles = {
        orange: {
            bg: "bg-orange-100",
            text: "text-orange-500",
            button: "bg-orange-500 hover:bg-orange-600",
        },

        green: {
            bg: "bg-green-100",
            text: "text-green-600",
            button: "bg-green-600 hover:bg-green-700",
        },

        blue: {
            bg: "bg-blue-100",
            text: "text-blue-600",
            button: "bg-blue-600 hover:bg-blue-700",
        },
    };

    return (
        <section className="w-full bg-[#f9fafb] py-24 px-6 md:px-16">

            <div className="max-w-7xl mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-16 animate-fade-in-up">

                    <p className="text-orange-500 font-semibold uppercase tracking-widest mb-3">
                        How You Can Help
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Be Part of the Change
                    </h2>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Your support can help transform lives through education,
                        mentorship, nutrition, and empowerment programs across communities.
                    </p>

                </div>

                {/* CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {helpCards.map((card, index) => {

                        const Icon = card.icon;
                        const style = colorStyles[card.color];

                        return (
                            <div
                                key={card.id}
                                className="bg-white rounded-[32px] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.2}s` }}
                            >

                                {/* ICON */}
                                <div className={`w-16 h-16 rounded-full ${style.bg} flex items-center justify-center mb-8`}>

                                    <Icon className={`w-8 h-8 ${style.text}`} />

                                </div>

                                {/* TITLE */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                    {card.title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    {card.description}
                                </p>

                                {/* BUTTON */}
                                <button
                                    className={`${style.button} text-white px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 transition`}
                                >
                                    {card.button}

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