import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function SuccessStories() {

    const stories = [
        {
            id: 1,
            image: "/aline.png",
            category: "Child Success Story",
            title: "From Struggling Student to Future Doctor",
            excerpt:
                "Before joining Reclaim Hope Rwanda, Aline struggled to stay in school due to financial challenges. Today, she dreams of becoming a doctor and helping her community.",
        },

        {
            id: 2,
            image: "/testimonial.png",
            category: "Parent Testimonial",
            title: "A New Sense of Hope for Families",
            excerpt:
                "The support provided through nutrition and education programs has helped our children stay healthy, confident, and motivated to continue learning.",
        },

        {
            id: 3,
            image: "/mentors_kids.jpg",
            category: "Volunteer Experience",
            title: "Creating Impact Through Mentorship",
            excerpt:
                "Volunteering with Reclaim Hope Rwanda has been a life-changing experience. Seeing children grow in confidence and ambition is deeply inspiring.",
        },
    ];

    return (
        <section className="w-full bg-white py-24 px-6 md:px-16 overflow-hidden">

            <div className="max-w-7xl mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-20">

                    <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold mb-4">
                        Stories of Transformation
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Real Stories.
                        <br />
                        Real Impact.
                    </h2>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Behind every number is a child, a family, or a community
                        whose life has been transformed through education,
                        mentorship, nutrition, and hope.
                    </p>

                </div>

                {/* STORIES GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">

                    {stories.map((story, index) => (
                        <div
                            key={story.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                            className="group bg-[#f9fafb] rounded-[36px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition duration-500"
                        >

                            {/* IMAGE */}
                            <div className="relative h-[300px] overflow-hidden">

                                <Image
                                    src={story.image}
                                    alt={story.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition duration-700"
                                />

                            </div>

                            {/* CONTENT */}
                            <div className="p-8">

                                {/* CATEGORY */}
                                <p className="text-orange-500 font-semibold uppercase tracking-wide mb-4 text-sm">
                                    {story.category}
                                </p>

                                {/* TITLE */}
                                <h3 className="text-2xl font-bold text-gray-900 leading-snug mb-5">
                                    {story.title}
                                </h3>

                                {/* EXCERPT */}
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    {story.excerpt}
                                </p>

                                {/* BUTTON */}
                                <button className="inline-flex items-center gap-3 text-orange-500 font-semibold hover:gap-4 transition-all duration-300">

                                    Read More

                                    <ArrowRight className="w-5 h-5" />

                                </button>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}