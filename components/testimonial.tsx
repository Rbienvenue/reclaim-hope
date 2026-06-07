'use client';

import Image from "next/image";
import Link from "next/link";
import { children as childList } from "@/components/ChildGrid";

export default function TestimonialSection() {
    const topChildren = childList.slice(0, 3);

    return (
        <section className="w-full bg-white py-24 px-6 md:px-16">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 animate-fade-in-up">
                    <p className="text-yellow-500 font-semibold uppercase tracking-widest mb-3">
                        Children in Need
                    </p>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        These children are ready for a sponsor and would love to meet you. Click the button to go to the sponsor page and see their full profile.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {topChildren.map((child) => (
                        <div key={child.id} className="rounded-[32px] overflow-hidden shadow-lg border border-gray-100 bg-white">
                            <div className="relative h-72 overflow-hidden">
                                <Image
                                    src={child.image}
                                    alt={child.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-8">
                                <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold mb-3">
                                    Needs sponsorship
                                </p>
                                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                                    {child.name}, {child.age}
                                </h3>
                                <p className="text-lg text-gray-600 mb-4">
                                    Dreams of becoming {child.dream}
                                </p>
                                <p className="text-gray-600 mb-6">
                                    {child.summary}
                                </p>
                                <Link
                                    href={`/sponsor?child=${child.id}`}
                                    className="inline-flex items-center justify-center w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-full font-semibold transition duration-300"
                                >
                                    Meet {child.name}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
