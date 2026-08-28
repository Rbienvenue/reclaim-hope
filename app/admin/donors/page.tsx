import { DonorsTable } from "@/components/donors-table";
import { prisma } from "@/lib/prisma";

export default async function DonorsPage() {
  const donors = await prisma.donor.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phoneNumber: true,
      country: true,
      createdAt: true,
      donations: {
        select: { amount: true, currency: true, status: true },
      },
      sponsorships: {
        select: { amount: true, currency: true, status: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const donorRows = donors.map((donor) => ({
    id: donor.id,
    name: `${donor.firstName} ${donor.lastName}`.trim(),
    email: donor.email,
    phoneNumber: donor.phoneNumber,
    country: donor.country,
    createdAt: donor.createdAt.toISOString(),
    donations: donor.donations.length,
    completedDonations: donor.donations.filter((donation) => donation.status === "COMPLETED").length,
    donatedAmount: donor.donations
      .filter((donation) => donation.status === "COMPLETED")
      .reduce((total, donation) => total + Number(donation.amount), 0),
    donatedCurrencies: [...new Set(
      donor.donations
        .filter((donation) => donation.status === "COMPLETED")
        .map((donation) => donation.currency)
    )],
    sponsorships: donor.sponsorships.length,
    activeSponsorships: donor.sponsorships.filter((sponsorship) => sponsorship.status === "ACTIVE").length,
    sponsorshipAmount: donor.sponsorships
      .filter((sponsorship) => sponsorship.status === "ACTIVE")
      .reduce((total, sponsorship) => total + Number(sponsorship.amount), 0),
    sponsorshipCurrency: donor.sponsorships[0]?.currency ?? "USD",
  }));

  return <DonorsTable donors={donorRows} />;
}