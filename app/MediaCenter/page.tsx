"use client";

import { useState } from "react";
import GallerySection from "@/components/gallery";
import MediaArticles from "@/components/Grid";
import MediaCategories from "@/components/MediaCategories";
import MediaFeaturedStory from "@/components/MediaFeaturedStory";
import MediaHero from "@/components/MediaHero";
import MediaTestimonials from "@/components/MediaTestimonials";
import NewsletterArchive from "@/components/NewsletterArchive";

export default function MediaCenterPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <>
      <MediaHero />
      <MediaCategories
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {(selectedCategory === "All" || selectedCategory === "Stories") && (
        <MediaFeaturedStory />
      )}

      {(selectedCategory === "All" || selectedCategory === "Updates") && (
        <MediaArticles />
      )}

      {(selectedCategory === "All" || selectedCategory === "Testimonials") && (
        <MediaTestimonials />
      )}

      {(selectedCategory === "All" || selectedCategory === "Newsletters") && (
        <NewsletterArchive />
      )}

      {(selectedCategory === "All" || selectedCategory === "Gallery") && (
        <GallerySection />
      )}
    </>
  );
}