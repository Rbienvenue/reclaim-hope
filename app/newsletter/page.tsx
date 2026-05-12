import BlogHero from "@/components/BlogHero";
import BlogIntroduction from "@/components/BlogIntroduction";
import FeaturedStory from "@/components/FeaturedStory";
import StoriesGrid from "@/components/StoriesGrid";
import CategoriesFilters from "@/components/CategoriesFilters";
import NewsletterSection from "@/components/newsLetter";
import FinalCTASection from "@/components/cta";

export default function StoriesPage() {
  return (
    <div>
      <BlogHero />
      <BlogIntroduction />
      <FeaturedStory />
      <CategoriesFilters />
      <StoriesGrid />
      <NewsletterSection />
      <FinalCTASection />
    </div>
  );
}