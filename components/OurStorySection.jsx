"use client"

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
    HeartHandshake,
    BookOpen,
    Soup,
    Users,
} from "lucide-react";

export default function OurStorySection() {

    const timeline = [
        {
            year: "2020",
            title: "Community Support Began",
            description:
                "Reclaim Hope Rwanda started as a small community initiative focused on supporting vulnerable children and families.",
            icon: HeartHandshake,
        },

        {
            year: "2024",
            title: "Education Programs Expanded",
            description:
                "We introduced mentorship and educational support programs to help children access learning opportunities.",
            icon: BookOpen,
        },

        {
            year: "2025",
            title: "Nutrition Initiatives Launched",
            description:
                "Nutrition and wellness programs were introduced to improve child well-being and community health.",
            icon: Soup,
        },

        {
            year: "2026",
            title: "Hundreds of Children Supported",
            description:
                "Our programs expanded across communities, impacting hundreds of children and families through hope-centered initiatives.",
            icon: Users,
        },
    ];

    const timelineRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-up");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                rootMargin: "0px 0px -120px 0px",
                threshold: 0.2,
            }
        );

        timelineRefs.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="w-full bg-white py-24 px-6 md:px-16 overflow-hidden">

            <div className="max-w-7xl mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-20">

                    <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold mb-4">
                        Our Journey
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        The Story Behind Reclaim Hope Rwanda
                    </h2>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        What started as a passion for helping vulnerable children
                        has grown into a mission dedicated to transforming lives
                        through education, mentorship, nutrition, and community support.
                    </p>

                </div>

                {/* CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                    {/* LEFT SIDE - IMAGE */}
                    <div className="relative">

                        {/* DECORATIVE SHAPE */}
                        <div className="absolute -top-6 -right-6 w-full h-full bg-orange-100 rounded-[40px]"></div>

                        {/* IMAGE */}
                        <div className="relative overflow-hidden rounded-[40px] shadow-xl">

                            <Image
                                src="/mentors_kids.jpg"
                                alt="Our story"
                                width={700}
                                height={800}
                                className="w-full h-[650px] object-cover hover:scale-105 transition duration-700"
                            />

                        </div>

                    </div>

                    {/* RIGHT SIDE - TIMELINE */}
                    <div className="relative">

                        {/* TIMELINE LINE */}
                        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-orange-200"></div>

                        <div className="space-y-12">

                            {timeline.map((item, index) => {

                                const Icon = item.icon;

                                return (
                                    <div
                                        key={index}
                                        ref={(el) => (timelineRefs.current[index] = el)}
                                        className="relative flex gap-8 group opacity-0"
                                    >

                                        {/* ICON */}
                                        <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">

                                            <Icon className="w-8 h-8" />

                                        </div>

                                        {/* CONTENT */}
                                        <div>

                                            {/* YEAR */}
                                            <p className="text-orange-500 font-bold text-lg mb-2">
                                                {item.year}
                                            </p>

                                            {/* TITLE */}
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                                {item.title}
                                            </h3>

                                            {/* DESCRIPTION */}
                                            <p className="text-gray-600 leading-relaxed">
                                                {item.description}
                                            </p>

                                        </div>

                                    </div>
                                );
                            })}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}