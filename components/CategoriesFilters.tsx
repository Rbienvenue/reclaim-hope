"use client";

interface CategoriesFiltersProps {
  activeCategory: string;
  onChange: (category: string) => void;
}

const categories = [
  "All Stories",
  "Education",
  "Health & Nutrition",
  "Events",
  "Success Stories",
];

export default function CategoriesFilters({ activeCategory, onChange }: CategoriesFiltersProps) {
  return (
    <section className="w-full py-12 px-6 md:px-16 bg-white border-b" data-aos="fade-up">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onChange(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeCategory === category
                  ? "bg-yellow-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
