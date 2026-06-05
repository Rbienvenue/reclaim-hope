import Image from "next/image";
import Link from "next/link";

const stories = [
  {
    id: 1,
    slug: "empowering-young-minds-through-education",
    title: "Empowering Young Minds Through Education",
    excerpt: "How our literacy program is transforming classrooms across rural Rwanda...",
    date: "March 15, 2024",
    category: "Education",
    image: "/classroom.jpg"
  },
  {
    id: 2,
    slug: "nutrition-program-saves-lives",
    title: "Nutrition Program Saves Lives",
    excerpt: "The impact of our feeding initiatives on child health and development...",
    date: "February 28, 2024",
    category: "Health & Nutrition",
    image: "/healthy.png"
  },
  {
    id: 3,
    slug: "community-event-brings-families-together",
    title: "Community Event Brings Families Together",
    excerpt: "Celebrating milestones and building stronger community bonds...",
    date: "February 10, 2024",
    category: "Events",
    image: "/gathering.jpg"
  },
  {
    id: 4,
    slug: "from-orphan-to-leader",
    title: "From Orphan to Leader",
    excerpt: "The inspiring journey of a young girl who became a role model...",
    date: "January 22, 2024",
    category: "Success Stories",
    image: "/aline.png"
  },
  {
    id: 5,
    slug: "from-struggling-student-to-future-doctor",
    title: "From Struggling Student to Future Doctor",
    excerpt: "Aline overcame school challenges and now dreams of becoming a doctor.",
    date: "May 10, 2024",
    category: "Child Success Story",
    image: "/aline.png"
  },
  {
    id: 6,
    slug: "a-new-sense-of-hope-for-families",
    title: "A New Sense of Hope for Families",
    excerpt: "Family support programs are helping children stay healthy, confident, and motivated.",
    date: "April 5, 2024",
    category: "Parent Testimonial",
    image: "/testimonial.png"
  },
  {
    id: 7,
    slug: "creating-impact-through-mentorship",
    title: "Creating Impact Through Mentorship",
    excerpt: "Volunteer mentors help children build confidence, skills, and long-term hope.",
    date: "March 20, 2024",
    category: "Volunteer Experience",
    image: "/mentors_kids.jpg"
  },
];

interface StoriesGridProps {
  activeCategory?: string;
}

function matchesCategory(storyCategory: string, activeCategory: string) {
  if (activeCategory === "All Stories") return true;
  if (activeCategory === "Success Stories") {
    return storyCategory.toLowerCase().includes("success");
  }
  return storyCategory === activeCategory;
}

export default function StoriesGrid({ activeCategory = "All Stories" }: StoriesGridProps) {
  return (
    <section className="w-full py-24 px-6 md:px-16 bg-gray-50" data-aos="fade-up">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories
            .filter((story) => matchesCategory(story.category, activeCategory))
            .map((story, index) => {
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
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
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
                    <Link href={`/newsletter/${story.slug}`} className="text-yellow-500 hover:text-yellow-600 font-semibold">
                      Read More →
                    </Link>
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