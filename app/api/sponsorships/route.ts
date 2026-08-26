import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sponsorships = await prisma.sponsorship.findMany({
      include: {
        donor: true,
        child: true,
        payments: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formatted = sponsorships.map((s) => ({
      id: s.id,
      amount: Number(s.amount),
      currency: s.currency,
      frequency: s.frequency,
      status: s.status,
      startedAt: s.startedAt?.toISOString() || null,
      endedAt: s.endedAt?.toISOString() || null,
      createdAt: s.createdAt.toISOString(),
      donor: {
        id: s.donor.id,
        name: `${s.donor.firstName} ${s.donor.lastName}`.trim(),
        email: s.donor.email,
        phoneNumber: s.donor.phoneNumber,
        country: s.donor.country,
        address: s.donor.address,
      },
      child: {
        id: s.child.id,
        name: `${s.child.firstName} ${s.child.lastName}`.trim(),
        dream: s.child.dream,
        imageUrl: s.child.imageUrl,
      },
      latestPayment: s.payments[0]
        ? {
            id: s.payments[0].id,
            reference: s.payments[0].reference,
            status: s.payments[0].status,
            paidAt: s.payments[0].paidAt?.toISOString() || null,
          }
        : null,
      paymentsCount: s.payments.length,
    }));

    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    console.error("Error fetching sponsorships:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch sponsorships." },
      { status: 500 }
    );
  }
}
