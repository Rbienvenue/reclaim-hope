import { SectionCards } from "@/components/section-cards";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaChild } from "react-icons/fa6";
import { GoSponsorTiers } from "react-icons/go";
import { ArrowRight, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-card border border-border/50 p-6 rounded-2xl shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider mb-1">
            <ShieldCheck className="size-4" />
            <span>Administrator Dashboard</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Welcome to Reclaim Hope Admin
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor child registrations, donor sponsorships, programs, and outreach metrics in real time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/admin/children">
              <FaChild className="size-4" />
              <span>Children</span>
              <ArrowRight className="size-3.5 opacity-70" />
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link href="/admin/sponsors">
              <GoSponsorTiers className="size-4" />
              <span>Sponsors</span>
              <ArrowRight className="size-3.5 opacity-70" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <SectionCards />

      {/* Interactive Charts */}
      <div className="rounded-2xl border border-border/50 bg-card p-4 md:p-6 shadow-xs">
        <h2 className="text-lg font-semibold mb-4">Sponsorship & Donation Trends</h2>
        <ChartAreaInteractive />
      </div>
    </div>
  );
}