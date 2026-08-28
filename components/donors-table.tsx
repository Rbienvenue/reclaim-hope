"use client";

import { useState } from "react";
import { Search, Users, Heart, HandCoins } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Donor = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  country: string | null;
  createdAt: string;
  donations: number;
  completedDonations: number;
  donatedAmount: number;
  donatedCurrencies: string[];
  sponsorships: number;
  activeSponsorships: number;
  sponsorshipAmount: number;
  sponsorshipCurrency: string;
};

function formatAmount(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function DonorsTable({ donors }: { donors: Donor[] }) {
  const [search, setSearch] = useState("");
  const filteredDonors = donors.filter((donor) =>
    [donor.name, donor.email, donor.country ?? ""].some((value) =>
      value.toLowerCase().includes(search.toLowerCase())
    )
  );
  const totalDonated = donors.reduce((total, donor) => total + donor.donatedAmount, 0);
  const activeSponsors = donors.reduce((total, donor) => total + donor.activeSponsorships, 0);
function formatDonatedAmount(donor: Donor) {
  if (donor.donatedCurrencies.length === 1) {
    return formatAmount(donor.donatedAmount, donor.donatedCurrencies[0]);
  }
  return donor.donatedAmount.toLocaleString("en-US");
}

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">People who support Reclaim Hope</p>
          <h1 className="text-3xl font-semibold tracking-tight">Donors</h1>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search donors"
            aria-label="Search donors"
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total donors</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{donors.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed donations</CardTitle>
            <HandCoins className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{formatAmount(totalDonated)}</CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active sponsorships</CardTitle>
            <Heart className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{activeSponsors}</CardContent>
        </Card>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Donor</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Donations</TableHead>
              <TableHead>Sponsorships</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDonors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                  {donors.length === 0 ? "No donors yet." : "No donors match your search."}
                </TableCell>
              </TableRow>
            ) : (
              filteredDonors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell>
                    <div className="font-medium">{donor.name}</div>
                    <div className="text-xs text-muted-foreground">{donor.country || "Country not provided"}</div>
                  </TableCell>
                  <TableCell>
                    <div>{donor.email}</div>
                    <div className="text-xs text-muted-foreground">{donor.phoneNumber || "Phone not provided"}</div>
                  </TableCell>
                  <TableCell>
                    <div>{formatDonatedAmount(donor)}</div>
                    <div className="text-xs text-muted-foreground">
                      {donor.completedDonations} completed of {donor.donations}
                      {donor.donatedCurrencies.length > 1 && " (multiple currencies)"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {donor.activeSponsorships > 0 ? (
                      <Badge variant="secondary">{donor.activeSponsorships} active</Badge>
                    ) : (
                      <span className="text-muted-foreground">None</span>
                    )}
                    {donor.sponsorshipAmount > 0 && (
                      <div className="mt-1 text-xs text-muted-foreground">
                        {formatAmount(donor.sponsorshipAmount, donor.sponsorshipCurrency)}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(donor.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}