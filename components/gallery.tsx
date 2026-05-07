import Image from "next/image";

export default function GallerySection() {

    const images = [
        {
            id: 1,
            src: "/children.jpg",
            alt: "Children learning",
            height: "h-[300px]",
        },
        {
            id: 2,
            src: "/community.jpg",
            alt: "Community outreach",
            height: "h-[450px]",
        },
        {
            id: 3,
            src: "/classroom.jpg",
            alt: "Students in classroom",
            height: "h-[350px]",
        },
        {
            id: 4,
            src: "/mentors_kids.jpg",
            alt: "Mentorship session",
            height: "h-[500px]",
        },
        {
            id: 5,
            src: "/activities.jpg",
            alt: "Children activities",
            height: "h-[320px]",
        },
        {
            id: 6,
            src: "/gathering.jpg",
            alt: "Community event",
            height: "h-[400px]",
        },
    ];

    return (
        <section className="w-full bg-white py-24 px-6 md:px-16">

            <div className="max-w-7xl mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-16 animate-fade-in-up">

                    <p className="text-orange-500 font-semibold uppercase tracking-widest mb-3">
                        Our Gallery
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Moments of Hope & Transformation
                    </h2>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Explore some of the inspiring moments from our educational,
                        mentorship, and community empowerment programs.
                    </p>

                </div>

                {/* MASONRY GALLERY */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">

                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className={`relative overflow-hidden rounded-[28px] ${image.height} group animate-fade-in-up`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >

                            {/* IMAGE */}
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                            />

                            {/* DARK OVERLAY */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-500" />

                            {/* TEXT */}
                            <div className="absolute bottom-0 left-0 p-6 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">

                                <p className="text-white text-lg font-semibold">
                                    {image.alt}
                                </p>

                            </div>

                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}