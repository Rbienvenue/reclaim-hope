import Image from "next/image";

type GalleryImage = {
    id: number;
    src: string;
    alt: string;
    height: string;
};

export default function VisualImpactGallery() {

    const images: GalleryImage[] = [
        {
            id: 1,
            src: "/classroom.jpg",
            alt: "Children learning in classroom",
            height: "h-[320px]",
        },

        {
            id: 2,
            src: "/mentors_kids.jpg",
            alt: "Community mentorship activity",
            height: "h-[450px]",
        },

        {
            id: 3,
            src: "/gathering.jpg",
            alt: "Children during nutrition program",
            height: "h-[380px]",
        },

        {
            id: 4,
            src: "/healthy.png",
            alt: "Volunteer teaching children",
            height: "h-[300px]",
        },

        {
            id: 5,
            src: "/community.jpg",
            alt: "Community celebration event",
            height: "h-[500px]",
        },

        {
            id: 6,
            src: "/activities.jpg",
            alt: "Students participating in activities",
            height: "h-[360px]",
        },
    ];

    return (
        <section className="w-full bg-[#f9fafb] py-24 px-6 md:px-16 overflow-hidden">

            <div className="max-w-7xl mx-auto">

                {/* SECTION HEADER */}
                <div className="text-center mb-20">

                    <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold mb-4">
                        Visual Impact
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Moments of Hope
                        <br />
                        & Transformation
                    </h2>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                        Every image represents lives impacted, communities strengthened,
                        and children empowered through education, mentorship,
                        nutrition, and support programs.
                    </p>

                </div>

                {/* GALLERY GRID */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">

                    {images.map((image, index) => (

                        <div
                            key={image.id}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className={`relative overflow-hidden rounded-[32px] shadow-lg group break-inside-avoid ${image.height}`}
                        >

                            {/* IMAGE */}
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                className="object-cover group-hover:scale-110 transition duration-700"
                            />

                            {/* OVERLAY */}
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-500"></div>

                            {/* OPTIONAL TEXT */}
                            <div className="absolute bottom-0 left-0 p-6">

                                <p className="text-white font-medium text-lg opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition duration-500">
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