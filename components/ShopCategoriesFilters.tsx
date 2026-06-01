"use client";

interface ShopCategoriesFiltersProps {
  activeCategory: string;
  onChange: (category: string) => void;
}

const categories = [
  "All Categories",
  "Fashion & Accessories",
  "Apparel & Clothing",
  "Home Decor & Living",
  "Bath, Body & Wellness",
];

export default function ShopCategoriesFilters({ activeCategory, onChange }: ShopCategoriesFiltersProps) {
  return (
    <section className="w-full py-8 px-6 md:px-16 bg-white border-b" data-aos="fade-up">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onChange(category)}
              className={`px-5 py-2 rounded-full font-semibold transition ${
                activeCategory === category
                  ? "bg-orange-500 text-white"
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
