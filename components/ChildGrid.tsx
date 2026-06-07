import ChildCard from "./ChildCard";

export const children = [
  {
    id: "aline",
    name: "Aline",
    age: 10,
    dream: "a nurse",
    support: "education and school materials",
    image: "/aline.png",
    summary:
      "Aline is a bright and determined learner who dreams of becoming a nurse and serving her community.",
    story: [
      "Aline enjoys science, reading books, and helping younger children in her community.",
      "She consistently performs well in school despite facing financial challenges.",
      "With continued support, she can remain focused on her education and future goals."
    ],
    goals: [
      "Complete primary education",
      "Excel in science subjects",
      "Become a healthcare professional"
    ],
    needs: [
      "School supplies",
      "Tuition support",
      "Nutritious meals",
      "Mentorship"
    ],
    updates: [
      "Promoted to next class",
      "Joined leadership activities",
      "Improved school attendance"
    ],
    sponsorshipImpact:
      "Your sponsorship helps provide education, nutrition, mentorship, and opportunities for long-term growth."
  },
  {
    id: "kevin",
    name: "Kevin",
    age: 12,
    dream: "an engineer",
    support: "tuition and mentorship",
    image: "/education.png",
    summary:
      "Kevin loves solving problems, building models, and dreaming of the day he can engineer solutions for his community.",
    story: [
      "Kevin is curious about science and technology, and he enjoys working with his hands.",
      "He studies hard to overcome the financial barriers that make school attendance difficult.",
      "With the right support, he can continue learning and prepare for a future in engineering."
    ],
    goals: [
      "Complete middle school",
      "Develop strong math and science skills",
      "Study engineering or technology"
    ],
    needs: [
      "Tuition support",
      "School supplies",
      "Mentorship and tutoring",
      "Safe study space"
    ],
    updates: [
      "Improved grades in math",
      "Participated in a local science club",
      "Built a school project with pride"
    ],
    sponsorshipImpact:
      "Your sponsorship provides the resources and guidance Kevin needs to grow his talents and keep going to school."
  },
  {
    id: "grace",
    name: "Grace",
    age: 9,
    dream: "a teacher",
    support: "nutrition and school support",
    image: "/LEAD.png",
    summary:
      "Grace is compassionate and loves helping her classmates, and she dreams of becoming a teacher who inspires others.",
    story: [
      "Grace is always eager to read and share stories with younger children.",
      "Her family struggles to provide enough food, but she keeps showing up to school with a smile.",
      "With stable support, Grace can continue her education and reach her dream of teaching."
    ],
    goals: [
      "Stay in school",
      "Improve reading and writing skills",
      "Become a caring teacher"
    ],
    needs: [
      "Balanced meals",
      "School supplies",
      "Uniforms and transport",
      "Learning support"
    ],
    updates: [
      "Increased classroom participation",
      "Helped younger children during reading time",
      "Maintained excellent attendance"
    ],
    sponsorshipImpact:
      "Your sponsorship helps Grace stay healthy and focused so she can become a strong learner and future mentor."
  },
  {
    id: "emmanuel",
    name: "Emmanuel",
    age: 11,
    dream: "a doctor",
    support: "education and meals",
    image: "/healthy.png",
    summary:
      "Emmanuel cares deeply about people and dreams of becoming a doctor who helps families in his community.",
    story: [
      "Emmanuel is driven by a desire to see children stay healthy and attend school.",
      "He studies hard despite food insecurity at home and remains optimistic about his future.",
      "With consistent support, he can keep learning and work toward his dream career in medicine."
    ],
    goals: [
      "Complete school successfully",
      "Grow in science knowledge",
      "Train to be a medical professional"
    ],
    needs: [
      "Regular nutritious meals",
      "Academic support",
      "School fees",
      "Health education"
    ],
    updates: [
      "Kept top marks in science",
      "Volunteered in school health campaigns",
      "Committed to improving his community"
    ],
    sponsorshipImpact:
      "Your sponsorship gives Emmanuel the stability and educational foundation he needs to pursue a future in healthcare."
  }
];

type ChildGridProps = {
  onChildSelect?: (id: string) => void;
  activeChildId?: string;
};

export default function ChildGrid({
  onChildSelect,
  activeChildId,
}: ChildGridProps) {
  return (
    <section id="" className="w-full bg-[#f9fafb] py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-yellow-500 uppercase tracking-[0.3em] font-semibold mb-4">
            Meet the Children
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {children.map((child) => (
            <ChildCard
              key={child.id}
              id={child.id}
              name={child.name}
              age={child.age}
              image={child.image}
              active={activeChildId === child.id}
              onSelect={onChildSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
