import { getDonationsList } from "@/app/actions/donation";
import { DonationsTable } from "@/components/donations-table";

export default async function DonationsPage() {
  const donations = await getDonationsList();

  return <DonationsTable donations={donations} />;
}