import Image from "next/image";

const stories = [
  {
    id: 1,
    title: "Empowering Young Minds Through Education",
    excerpt: "How our literacy program is transforming classrooms across rural Rwanda...",
    date: "March 15, 2024",
    category: "Education",
    image: "/classroom.jpg"
  },
  {
    id: 2,
    title: "Nutrition Program Saves Lives",
    excerpt: "The impact of our feeding initiatives on child health and development...",
    date: "February 28, 2024",
    category: "Health & Nutrition",
    image: "/healthy.png"
  },
  {
    id: 3,
    title: "Community Event Brings Families Together",
    excerpt: "Celebrating milestones and building stronger community bonds...",
    date: "February 10, 2024",
    category: "Events",
    image: "/gathering.jpg"
  },
  {
    id: 4,
    title: "From Orphan to Leader",
    excerpt: "The inspiring journey of a young girl who became a role model...",
    date: "January 22, 2024",
    category: "Success Stories",
    image: "/aline.png"
  },
  // Add more stories as needed
];

export default function StoriesGrid() {
  return (
    <section className="w-full py-24 px-6 md:px-16 bg-gray-50" data-aos="fade-up">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => {
            const delayClass = index === 0 ? 'animate-stagger-reveal' :
                              index === 1 ? 'animate-stagger-reveal-delay-1' :
                              index === 2 ? 'animate-stagger-reveal-delay-2' :
                              'animate-stagger-reveal-delay-3';
            return (
              <div key={story.id} className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition ${delayClass}`}>
                <div className="relative h-48">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover"
                    quality={85}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {story.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {story.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{story.date}</span>
                    <button className="text-orange-500 hover:text-orange-600 font-semibold">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}