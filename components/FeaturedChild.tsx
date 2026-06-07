import Image from "next/image";

export type ChildProfile = {
  id: string;
  name: string;
  age: number;
  dream: string;
  image: string;
  summary: string;
  story: string[];
  goals: string[];
  needs: string[];
  updates: string[];
  sponsorshipImpact: string;
};

type FeaturedChildProps = {
  child: ChildProfile;
};

export default function FeaturedChild({ child }: FeaturedChildProps) {
  return (
    <div className="min-h-screen bg-white px-6 md:px-16 py-24">
      <div className="max-w-6xl mx-auto">
        <section className="grid lg:grid-cols-[1fr_1fr] gap-12">
          <div className="relative h-[550px] rounded-[32px] overflow-hidden shadow-xl">
            <Image
              src={child.image}
              alt={child.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold mb-4">
              Child Profile
            </p>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {child.name}, {child.age}
            </h1>
            <p className="text-2xl text-orange-500 font-semibold mb-6">
              Dreams of Becoming a {child.dream}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {child.summary}
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold transition">
              Sponsor {child.name}
            </button>

            <section className="mt-20">
          <h2 className="text-3xl text-black font-bold mb-8">{child.name}&apos;s Story</h2>
          {child.story.map((paragraph, index) => (
            <p
              key={index}
              className="text-gray-600 text-lg leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          ))}
        </section>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8 mt-20">
          <div className="bg-gray-50 rounded-[32px] p-8">
            <h3 className="text-2xl text-black font-bold mb-6">Dreams & Goals</h3>
            <ul className="space-y-3 text-gray-600 list-disc list-inside">
              {child.goals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-50 rounded-[32px] p-8">
            <h3 className="text-2xl text-black font-bold mb-6">Current Needs</h3>
            <ul className="space-y-3 text-gray-600 list-disc list-inside">
              {child.needs.map((need, index) => (
                <li key={index}>{need}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-3xl text-black font-bold mb-8">Progress Updates</h2>
          <div className="space-y-4">
            {child.updates.map((update, index) => (
              <div
                key={index}
                className="bg-green-50 text-gray-600 border border-green-100 rounded-2xl p-5"
              >
                ✓ {update}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 bg-yellow-50 rounded-[32px] p-10">
          <h2 className="text-3xl text-black font-bold mb-6">How Sponsorship Helps</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {child.sponsorshipImpact}
          </p>
        </section>
      </div>
    </div>
  );
}
