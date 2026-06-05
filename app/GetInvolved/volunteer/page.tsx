import Link from "next/link";
import VolunteerSection from "@/components/VolunteerSection";

export default function VolunteerPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-16">
        <Link href="/GetInvolved" className="text-yellow-500 font-semibold mb-8 inline-block">
          ← Back to Get Involved
        </Link>
      </div>
      <VolunteerSection />
    </div>
  );
}
