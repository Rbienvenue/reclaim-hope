'use client';

import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Testimonial {
    id: number;
    name: string;
    role: string;
    quote: string;
    image: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Aline Uwase",
        role: "Student Beneficiary",
        quote: "Before joining Reclaim Hope, I struggled in school and lacked confidence in myself. Today, I dream of becoming a doctor and helping my community.",
        image: "/testimonial.png",
    },
    {
        id: 2,
        name: "Juma Kamau",
        role: "Student Beneficiary",
        quote: "Reclaim Hope gave me the support and guidance I needed. Now I have completed my secondary education and I'm preparing for university to study engineering.",
        image: "/testimonial.png",
    },
    {
        id: 3,
        name: "Maria Santos",
        role: "Student Beneficiary",
        quote: "I was afraid of my future, but this program showed me that anything is possible. I want to give back and help other children like me achieve their dreams.",
        image: "/testimonial.png",
    },
];

export default function TestimonialSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [autoPlay]);

    const goToPrevious = () => {
        setAutoPlay(false);
        setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setAutoPlay(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    const goToSlide = (index: number) => {
        setAutoPlay(false);
        setCurrentIndex(index);
    };

    return (
        <section className="w-full bg-white py-24 px-6 md:px-16">
            <div className="max-w-7xl mx-auto">
                {/* SECTION HEADER */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <p className="text-orange-500 font-semibold uppercase tracking-widest mb-3">
                        Success Story
                    </p>
                    
                </div>

                {/* CAROUSEL */}
                <div className="relative overflow-hidden rounded-[40px] bg-[#f9fafb] shadow-sm hover:shadow-xl transition duration-500">
                    <div
                        className="flex transition-all duration-1000 ease-in-out"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {testimonials.map((testimonial) => (
                            <div key={testimonial.id} className="min-w-full grid grid-cols-1 md:grid-cols-2 items-center">
                                <div className="relative h-full min-h-[500px] overflow-hidden">
                                    <Image
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                                        className="object-cover animate-slide-in-left"
                                    />
                                    {/* Overlay for reveal effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20"></div>
                                </div>
                                <div className="p-10 md:p-16 animate-fade-in-up">
                                    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-8 animate-fade-in-up">
                                        <Quote className="w-8 h-8 text-orange-500" />
                                    </div>
                                    <p className="text-2xl md:text-3xl leading-relaxed text-gray-800 font-medium mb-8">
                                        "{testimonial.quote}"
                                    </p>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-gray-500 mt-1">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 transition duration-300 z-10"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-3 transition duration-300 z-10"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex justify-center gap-3 mt-12">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-3 rounded-full transition-all duration-300 ${
                                index === currentIndex ? "bg-orange-500 w-8" : "bg-gray-300 w-3 hover:bg-gray-400"
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
