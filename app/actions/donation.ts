'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { DonorInput } from "./sponsorship"
import IremboPay from "@irembo/irembopay-node-sdk";
const iPay = new IremboPay(process.env.IPAY_SECRET_KEY, process.env.IPAY_ENVIRONMENT)

export type DonationCategoryType = 'MEALS' | 'HEALTH' | 'EDUCATION' | 'LOVE_GIFT'

export interface CreateDonationInput {
  category: DonationCategoryType
  amount: number
  currency?: 'USD' | 'RWF'
  donor?: DonorInput & { message?: string }
}


async function createIpayInvoice({ donor }: { donor: any }, amount: number, currency: string, category: string, paymentId: string) {
   iPay.invoice.createInvoice({
    transactionId: paymentId,
    paymentAccountIdentifier: "07808652516",
    customer: {
      email: donor?.email,
      phoneNumber: "0780000001",
      name: donor?.firstName + " " + donor?.lastName,
    },
    paymentItems: [
      {
        unitAmount: amount,
        quantity: 1,
        code: "PC-aaf751b73f",
      },
    ],
    description: "test",
    language: "EN",
  }).then((data: any) => {
    console.log(data);
  }).catch((error: any) => {
    console.log(error);
  });

  

}
function generateReference(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

/**
 * Step 1-6: Create Pending Donation & Pending Payment
 */
export async function createPendingDonation(input: CreateDonationInput) {
  try {
    const { category, amount, currency = "USD", donor: donorInput } = input

    if (!amount || isNaN(amount) || amount <= 0) {
      return { success: false, error: "Please enter a valid donation amount." }
    }

    if (!category) {
      return { success: false, error: "Please choose a donation purpose." }
    }

    let donor = null
    if (donorInput?.email && donorInput?.firstName && donorInput?.lastName) {
      const cleanEmail = donorInput.email.trim().toLowerCase()
      donor = await prisma.donor.upsert({
        where: { email: cleanEmail },
        update: {
          firstName: donorInput.firstName.trim(),
          lastName: donorInput.lastName.trim(),
          phoneNumber: donorInput.phoneNumber?.trim() || null,
          country: donorInput.country?.trim() || null,
          address: donorInput.address?.trim() || null,
        },
        create: {
          firstName: donorInput.firstName.trim(),
          lastName: donorInput.lastName.trim(),
          email: cleanEmail,
          phoneNumber: donorInput.phoneNumber?.trim() || null,
          country: donorInput.country?.trim() || null,
          address: donorInput.address?.trim() || null,
        },
      })
    }

    const reference = generateReference("DON")

    const result = await prisma.$transaction(async (tx) => {
      const donation = await tx.donation.create({
        data: {
          donorId: donor ? donor.id : null,
          amount,
          currency,
          category,
          status: "PENDING",
        },
      })

      const payment = await tx.payment.create({
        data: {
          donationId: donation.id,
          reference,
          amount,
          currency,
          provider: "IPAY",
          status: "PENDING",
        },
      })

      return { donation, payment }
    })

    await createIpayInvoice({ donor }, amount, currency, category, result.payment.id)
    revalidatePath("/donate")
    revalidatePath("/admin/sponsors")
    revalidatePath("/admin/donations")
    revalidatePath("/admin/payments")

    return {
      success: true,
      donation: {
        id: result.donation.id,
        category: result.donation.category,
        amount: Number(result.donation.amount),
        currency: result.donation.currency,
        status: result.donation.status,
      },
      payment: {
        id: result.payment.id,
        reference: result.payment.reference,
        amount: Number(result.payment.amount),
        currency: result.payment.currency,
        status: result.payment.status,
      },
      donor: donor
        ? {
          id: donor.id,
          name: `${donor.firstName} ${donor.lastName}`.trim(),
          email: donor.email,
        }
        : null,
    }
  } catch (error: any) {
    console.error("Error creating pending donation:", error)
    return { success: false, error: error.message || "Failed to initiate donation." }
  }
}

/**
 * Fetch all donations with donor and payment history for admin.
 */
export async function getDonationsList() {
  try {
    const donations = await prisma.donation.findMany({
      include: {
        donor: true,
        payments: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    })

    return donations.map((d) => ({
      id: d.id,
      amount: Number(d.amount),
      currency: d.currency,
      category: d.category,
      status: d.status,
      createdAt: d.createdAt.toISOString(),
      donor: d.donor
        ? {
          name: `${d.donor.firstName} ${d.donor.lastName}`.trim(),
          email: d.donor.email,
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
    }))
  } catch (error) {
    console.error("Error fetching donations list:", error)
    return []
  }
}
