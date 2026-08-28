import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const donations = await prisma.donation.findMany({
      include: {
        donor: true,
        payments: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = donations.map((d) => ({
      id: d.id,
      amount: Number(d.amount),
      currency: d.currency,
      category: d.category,
      status: d.status,
      createdAt: d.createdAt.toISOString(),
      donor: d.donor
        ? {
            id: d.donor.id,
            name: `${d.donor.firstName} ${d.donor.lastName}`.trim(),
            email: d.donor.email,
            phoneNumber: d.donor.phoneNumber,
            country: d.donor.country,
          }
        : null,
      latestPayment: d.payments[0]
        ? {
            id: d.payments[0].id,
            reference: d.payments[0].reference,
            status: d.payments[0].status,
            paidAt: d.payments[0].paidAt?.toISOString() || null,
          }
        : null,
      paymentsCount: d.payments.length,
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    console.error("Error fetching donations:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch donations." },
      { status: 500 }
    );
  }
}

