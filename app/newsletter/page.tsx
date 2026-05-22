"use client";

import { useState } from "react";
import BlogHero from "@/components/BlogHero";
import BlogIntroduction from "@/components/BlogIntroduction";
import FeaturedStory from "@/components/FeaturedStory";
import StoriesGrid from "@/components/StoriesGrid";
import CategoriesFilters from "@/components/CategoriesFilters";
import NewsletterSection from "@/components/newsLetter";
import FinalCTASection from "@/components/cta";

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All Stories");

  return (
    <div>
      <BlogHero />
      <BlogIntroduction />
      <FeaturedStory />
      <CategoriesFilters activeCategory={activeCategory} onChange={setActiveCategory} />
      <StoriesGrid activeCategory={activeCategory} />
      <NewsletterSection />
      <FinalCTASection />
    </div>
  );
}