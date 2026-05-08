"use client"
import Image from "next/image";
import {
    Share2,
    Users,
    Mail,
} from "lucide-react";

export default function LeadershipSection() {

    const leaders = [
        {
            id: 1,
            name: "John Doe",
            role: "Executive Director",
            image: "/team1.jpg",
            bio: "Passionate about empowering vulnerable children through education and community development initiatives.",
        },

        {
            id: 2,
            name: "Jane Smith",
            role: "Program Coordinator",
            image: "/team2.jpg",
            bio: "Focused on mentorship programs, youth empowerment, and creating sustainable community impact.",
        },

        {
            id: 3,
            name: "David Wilson",
            role: "Community Outreach Lead",
            image: "/team3.jpg",
            bio: "Dedicated to strengthening community partnerships and expanding support initiatives across Rwanda.",
        },
    ];

    return (
        <section className="w-full bg-[#f9fafb] py-24 px-6 md:px-16">

            <div className="max-w-7xl mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-20">

                    <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold mb-4">
                        Leadership Team
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Meet the People Behind the Mission
                    </h2>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Our dedicated team works tirelessly to empower children,
                        strengthen communities, and create lasting positive impact.
                    </p>

                </div>

                {/* TEAM GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {leaders.map((leader) => (
                        <div
                            key={leader.id}
                            className="bg-white rounded-[32px] p-10 text-center shadow-sm hover:shadow-2xl transition duration-500 hover:-translate-y-2 border border-gray-100"
                        >

                            {/* IMAGE */}
                            <div className="relative w-40 h-40 mx-auto mb-8">

                                <Image
                                    src={leader.image}
                                    alt={leader.name}
                                    fill
                                    className="object-cover rounded-full border-4 border-orange-100"
                                />

                            </div>

                            {/* NAME */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                {leader.name}
                            </h3>

                            {/* ROLE */}
                            <p className="text-orange-500 font-semibold mb-6">
                                {leader.role}
                            </p>

                            {/* BIO */}
                            <p className="text-gray-600 leading-relaxed mb-8">
                                {leader.bio}
                            </p>

                            {/* SOCIALS */}
                            <div className="flex items-center justify-center gap-4">

                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-500 transition flex items-center justify-center group"
                                >
                                    <Share2 className="w-5 h-5 text-orange-500 group-hover:text-white" />
                                </a>

                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-500 transition flex items-center justify-center group"
                                >
                                    <Users className="w-5 h-5 text-orange-500 group-hover:text-white" />
                                </a>

                                <a
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-orange-100 hover:bg-orange-500 transition flex items-center justify-center group"
                                >
                                    <Mail className="w-5 h-5 text-orange-500 group-hover:text-white" />
                                </a>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}