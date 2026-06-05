import Link from "next/link";
import PartnershipSection from "@/components/PartnershipSection";

export default function PartnerPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-16">
        <Link href="/GetInvolved" className="text-yellow-500 font-semibold mb-8 inline-block">
          ← Back to Get Involved
        </Link>
      </div>
      <PartnershipSection />
    </div>
  );
}
