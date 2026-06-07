import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    id: 1,
    quote:
      "Reclaim Hope helped my daughter stay in school and regain confidence in her future.",
    author: "Parent",
    role: "Mother of Program Participant",
    image: "/weaving.jpg",
  },
  {
    id: 2,
    quote:
      "The mentorship program inspired me to dream bigger and work harder in school.",
    author: "Student",
    role: "LEAD Program Participant",
    image: "/LEAD.png",
  },
  {
    id: 3,
    quote:
      "Volunteering with Reclaim Hope has been one of the most rewarding experiences of my life.",
    author: "Volunteer",
    role: "Community Mentor",
    image: "/mentorship.jpg",
  },
];

export default function MediaTestimonials() {
  return (
    <section className="py-24 px-6 md:px-16 bg-gradient-to-b from-yellow-50 to-white">

      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">

          <p className="text-yellow-500 uppercase tracking-[0.3em] font-semibold mb-4">
            Testimonials
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Voices of Impact
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from children, parents, volunteers, and partners whose lives
            have been touched through the work of Reclaim Hope Rwanda.
          </p>

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              image={testimonial.image}
            />
          ))}

        </div>

      </div>

    </section>
  );
}