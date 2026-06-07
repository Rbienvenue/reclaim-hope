"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ChildGrid, { children as childList } from "@/components/ChildGrid";
import FeaturedChild from "@/components/FeaturedChild";

export default function SponsorPage() {
  const searchParams = useSearchParams();
  const queryChildId = searchParams.get("child");
  const featuredRef = useRef<HTMLDivElement>(null);
  const defaultChildId = childList[0].id;
  const [selectedChildStateId, setSelectedChildStateId] = useState(defaultChildId);
  const validQueryChildId =
    queryChildId && childList.some((child) => child.id === queryChildId)
      ? queryChildId
      : null;
  const selectedChildId = validQueryChildId ?? selectedChildStateId;
  const selectedChild =
    childList.find((child) => child.id === selectedChildId) ?? childList[0];

  const handleChildSelect = (id: string) => {
    setSelectedChildStateId(id);
    featuredRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div ref={featuredRef}>
        <FeaturedChild child={selectedChild} />
      </div>
      <ChildGrid
        activeChildId={selectedChildId}
        onChildSelect={handleChildSelect}
      />
    </>
  );
}
