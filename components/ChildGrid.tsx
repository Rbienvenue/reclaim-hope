import ChildCard from "./ChildCard";

const children = [
    {
        id: "aline",
        name: "Aline",
        age: 10,
        dream: "a nurse",
        support: "education and school materials",
        image: "/aline.png",
    },

    {
        id: "kevin",
        name: "Kevin",
        age: 12,
        dream: "an engineer",
        support: "tuition and mentorship",
        image: "/education.png",
    },

    {
        id: "grace",
        name: "Grace",
        age: 9,
        dream: "a teacher",
        support: "nutrition and school support",
        image: "/LEAD.png",
    },

    {
        id: "emmanuel",
        name: "Emmanuel",
        age: 11,
        dream: "a doctor",
        support: "education and meals",
        image: "/healthy.png",
    },
];

export default function ChildGrid() {

    return (
        <section id="" className="w-full bg-[#f9fafb] py-24 px-6 md:px-16">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="text-center mb-20">

                    <p className="text-orange-500 uppercase tracking-[0.3em] font-semibold mb-4">
                        Meet the Children
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">

                        Children Waiting
                        <br />
                        For Opportunity

                    </h2>

                    <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">

                        Every child has dreams, talents, and potential.
                        Your sponsorship can help provide the support
                        they need to continue learning and growing.

                    </p>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

                    {children.map((child) => (

                        <ChildCard
                            key={child.id}
                            id={child.id}
                            name={child.name}
                            age={child.age}
                            dream={child.dream}
                            support={child.support}
                            image={child.image}
                        />

                    ))}

                </div>

            </div>

        </section>
    );
}