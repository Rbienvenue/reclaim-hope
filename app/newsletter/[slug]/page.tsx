import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const stories = [
  {
    slug: "from-struggle-to-success",
    title: "From Struggle to Success: A Child's Journey",
    date: "April 2024",
    category: "Success Story",
    image: "/mentors_kids.jpg",
    summary:
      "Jean-Pierre overcame enormous odds through mentorship, education, and community support to become a leader in his village.",
    content: [
      "Jean-Pierre grew up in a small town where resources were limited and hope was fragile. At age nine he struggled in school because his family could not afford textbooks, uniforms, or extra support. When he joined Reclaim Hope Rwanda’s LEAD program, everything began to change.",
      "The after-school tutoring and mentorship sessions gave Jean-Pierre personalized attention. Volunteers helped him catch up in reading and math, while mentors encouraged him to discover his passions and set goals. He learned how to manage his time, stay focused, and believe in himself.",
      "Beyond academics, the program showed Jean-Pierre how to use his voice. He helped organize small group activities, led a community service project, and began supporting younger children around him. His confidence grew, and he started dreaming of university and a career where he could give back.",
      "Today, Jean-Pierre is a source of inspiration for his family and community. The support he received from education, mentorship, and community programs made this transformation possible, and his story continues to remind us that every child can thrive when given the right support.",
    ],
    highlights: [
      "Improved academic performance through targeted tutoring.",
      "Stronger leadership and community participation.",
      "Greater confidence and long-term ambition.",
    ],
  },
  {
    slug: "empowering-young-minds-through-education",
    title: "Empowering Young Minds Through Education",
    date: "March 15, 2024",
    category: "Education",
    image: "/classroom.jpg",
    summary:
      "A literacy initiative that is transforming classrooms and giving students the tools to succeed.",
    content: [
      "Our literacy program focuses on the foundational skills children need to progress confidently through school. Through carefully designed lessons, reading circles, and teacher coaching, students gain stronger reading comprehension and vocabulary.",
      "The program also supports classroom teachers with teaching materials, training, and hands-on resources. When teachers are equipped, students learn more effectively and classrooms become lively places of curiosity.",
      "Families are invited to participate in literacy events where children share stories and practice new skills. This creates a supportive learning environment at home and strengthens the connection between school and family.",
      "As a result, children in the program are more engaged, more motivated, and more likely to see school as a path to opportunity.",
    ],
    highlights: [
      "Stronger literacy skills across classrooms.",
      "Teacher support and community learning events.",
      "Increased confidence and classroom engagement.",
    ],
  },
  {
    slug: "nutrition-program-saves-lives",
    title: "Nutrition Program Saves Lives",
    date: "February 28, 2024",
    category: "Health & Nutrition",
    image: "/healthy.png",
    summary:
      "Our feeding and wellness initiative supports children’s health so they can learn and grow with strength.",
    content: [
      "Many children in the communities we serve arrive at school hungry and unable to focus. Our nutrition program changes that by offering balanced meals, food supplements, and nutrition education.",
      "Beyond the meals, health workers visit families to share hygiene practices, safe water habits, and simple food preparation techniques. This holistic approach protects children from illness and supports healthy growth.",
      "The program also creates community gardens and food demonstrations so caregivers can learn how to prepare nutritious meals with local ingredients. When families are nourished, children are healthier and perform better at school.",
      "Because of this program, more children arrive ready to learn, and families feel more secure knowing their children are supported with both food and health education.",
    ],
    highlights: [
      "Daily nutritious meals at school and community centers.",
      "Health education for children and caregivers.",
      "Reduced illness and improved school attendance.",
    ],
  },
  {
    slug: "community-event-brings-families-together",
    title: "Community Event Brings Families Together",
    date: "February 10, 2024",
    category: "Events",
    image: "/gathering.jpg",
    summary:
      "A celebration of unity, progress, and the community spirit behind our programs.",
    content: [
      "Our community event brought families together to celebrate the small victories and collective progress made through Reclaim Hope Rwanda. Children performed songs, shared stories, and highlighted what they had learned throughout the year.",
      "The event showcased the power of community participation. Caregivers, volunteers, and teachers came together to witness how the programs are changing lives and to recommit to supporting children’s futures.",
      "Families left with renewed hope, a stronger network of support, and practical resources to continue the work at home and in the community.",
      "Events like this remind us that change is possible when people come together with a shared purpose and commitment to children’s success.",
    ],
    highlights: [
      "Strengthened family and community bonds.",
      "Positive celebration of program achievements.",
      "Renewed hope and collaboration across communities.",
    ],
  },
  {
    slug: "from-struggling-student-to-future-doctor",
    title: "From Struggling Student to Future Doctor",
    date: "May 10, 2024",
    category: "Child Success Story",
    image: "/aline.png",
    summary:
      "Aline transformed from a struggling student into a child who now dreams of becoming a doctor.",
    content: [
      "Aline once struggled to stay in school because her family could not afford uniforms, books, and transportation. With support from Reclaim Hope Rwanda, she gained access to tutoring, mentorship, and the confidence to keep going.",
      "Over time, Aline's grades improved and she began to trust her own potential. She attended leadership activities, received academic coaching, and found a supportive community of teachers and volunteers.",
      "Today, Aline is focused on a future in medicine. She wants to use her education to care for children in her community and inspire others to pursue their dreams.",
    ],
    highlights: [
      "Personalized academic support that rebuilt confidence.",
      "Mentorship that helped Aline set long-term goals.",
      "A renewed sense of purpose and future opportunity.",
    ],
  },
  {
    slug: "a-new-sense-of-hope-for-families",
    title: "A New Sense of Hope for Families",
    date: "April 5, 2024",
    category: "Parent Testimonial",
    image: "/testimonial.png",
    summary:
      "Family support programs have helped children stay healthy, confident, and motivated to continue learning.",
    content: [
      "Parents in our community say the programs have brought stability and renewed hope to their homes. Meeting basic needs made it possible for children to return to school and focus on learning.",
      "Caregivers appreciated the nutrition, school supplies, and emotional support their children received. This helped families build stronger routines and feel less overwhelmed by daily challenges.",
      "As children grew healthier and more engaged in school, parents saw renewed optimism for the future. They began to believe that education could open doors for their whole family.",
    ],
    highlights: [
      "Increased family confidence through reliable support.",
      "Improved child health and school attendance.",
      "Stronger parent-community connections.",
    ],
  },
  {
    slug: "creating-impact-through-mentorship",
    title: "Creating Impact Through Mentorship",
    date: "March 20, 2024",
    category: "Volunteer Experience",
    image: "/mentors_kids.jpg",
    summary:
      "Volunteer mentors are helping children build confidence, skills, and long-term hope.",
    content: [
      "Volunteers who work with Reclaim Hope Rwanda speak of the joy they feel when children begin to believe in themselves. Mentorship sessions focus on academic support, life skills, and emotional encouragement.",
      "Children take part in group activities, literacy sessions, and confidence-building exercises. Volunteers help them set goals, practice communication, and pursue dreams beyond their current circumstances.",
      "The relationships formed in mentorship programs are powerful. Children gain both practical tools and the belief that they can achieve more than they ever thought possible.",
    ],
    highlights: [
      "Inspiring mentorship connections for children and youth.",
      "Practical support for learning and emotional growth.",
      "Stronger community bonds through volunteer engagement.",
    ],
  },
];

export default async function NewsletterStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = stories.find((item) => item.slug === slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white px-6 md:px-16 py-24">
      <div className="max-w-5xl mx-auto">
        <Link href="/newsletter" className="text-orange-500 font-semibold mb-8 inline-block">
          ← Back to Stories
        </Link>

        <article className="space-y-10">
          <header className="space-y-6">
            <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold">
              {story.category}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              {story.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-gray-500">
              <span>{story.date}</span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">{story.summary}</p>
          </header>

          <div className="overflow-hidden rounded-[32px] shadow-2xl h-[420px] relative">
            <Image
              src={story.image}
              alt={story.title}
              fill
              className="object-cover"
              quality={85}
            />
          </div>

          <section className="space-y-8 text-gray-700 text-lg leading-relaxed">
            {story.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>

          <section className="rounded-[32px] border border-gray-100 bg-gray-50 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Story Highlights</h2>
            <ul className="space-y-4 list-disc list-inside text-gray-700">
              {story.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </div>
  );
}
