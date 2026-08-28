'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { INITIAL_CHILDREN } from "@/lib/initial-children"

export type SponsorshipFrequencyType = 'MONTHLY' | 'YEARLY'

export interface DonorInput {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  country?: string
  address?: string
}

export interface CreateSponsorshipInput {
  childId: string
  donor: DonorInput
  frequency: SponsorshipFrequencyType
}

function generateReference(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

/**
 * Ensures initial children are present in the database if the DB is connected but empty.
 */
export async function ensureChildrenSeeded() {
  try {
    const count = await prisma.child.count()
    if (count === 0) {
      for (const child of INITIAL_CHILDREN) {
        await prisma.child.create({
          data: {
            id: child.id,
            firstName: child.firstName,
            lastName: child.lastName,
            dateOfBirth: new Date(child.dateOfBirth),
            dream: child.dream,
            imageUrl: child.imageUrl,
            summary: child.summary,
            story: child.story,
          },
        })
      }
    }
  } catch (error) {
    console.error("Error checking or seeding children in DB:", error)
  }
}

/**
 * Fetch all children with their live sponsorship availability status.
 */
export async function getChildrenWithStatus() {
  try {
    await ensureChildrenSeeded()

    const dbChildren = await prisma.child.findMany({
      include: {
        sponsorships: {
          where: { status: "ACTIVE" },
          include: { donor: true },
        },
      },
      orderBy: { createdAt: "asc" },
    })

    if (dbChildren.length > 0) {
      return dbChildren.map((c) => {
        const activeSponsorship = c.sponsorships && c.sponsorships.length > 0 ? c.sponsorships[0] : null
        return {
          id: c.id,
          firstName: c.firstName,
          lastName: c.lastName,
          name: `${c.firstName} ${c.lastName}`.trim(),
          dateOfBirth: c.dateOfBirth.toISOString(),
          age: calculateAge(c.dateOfBirth),
          dream: c.dream,
          imageUrl: c.imageUrl || "/mentors_kids.jpg",
          summary: c.summary,
          story: c.story,
          isSponsored: !!activeSponsorship,
          sponsorName: activeSponsorship
            ? `${activeSponsorship.donor.firstName} ${activeSponsorship.donor.lastName}`.trim()
            : null,
          activeSponsorship: activeSponsorship
            ? {
                id: activeSponsorship.id,
                amount: Number(activeSponsorship.amount),
                frequency: activeSponsorship.frequency,
                startedAt: activeSponsorship.startedAt?.toISOString() || null,
              }
            : null,
        }
      })
    }
  } catch (error) {
    console.error("Database connection issue, falling back to initial data:", error)
  }

  // Fallback to initial children with default available state
  return INITIAL_CHILDREN.map((c) => ({
    id: c.id,
    firstName: c.firstName,
    lastName: c.lastName,
    name: `${c.firstName} ${c.lastName}`.trim(),
    dateOfBirth: c.dateOfBirth,
    age: calculateAge(new Date(c.dateOfBirth)),
    dream: c.dream,
    imageUrl: c.imageUrl,
    summary: c.summary,
    story: c.story,
    isSponsored: false,
    sponsorName: null,
    activeSponsorship: null,
  }))
}

function calculateAge(dateOfBirth: Date): number {
  const birthDate = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return Math.max(0, age)
}

/**
 * Check if a child is available for sponsorship.
 * Rule: One child can have only one active sponsor.
 */
export async function checkChildAvailability(childId: string) {
  try {
    const activeSponsorship = await prisma.sponsorship.findFirst({
      where: {
        childId,
        status: "ACTIVE",
      },
    })
    return { isAvailable: !activeSponsorship, activeSponsorship }
  } catch (error) {
    console.error("Error checking child availability:", error)
    return { isAvailable: true, activeSponsorship: null }
  }
}

/**
 * Step 1-6: Create Pending Sponsorship & Pending Payment
 */
export async function createPendingSponsorship(input: CreateSponsorshipInput) {
  try {
    const { childId, donor: donorInput, frequency } = input

    if (!donorInput.firstName || !donorInput.lastName || !donorInput.email) {
      return { success: false, error: "Please provide first name, last name, and a valid email address." }
    }

    // Check if child exists in DB, or create them from initial children
    let child = await prisma.child.findUnique({
      where: { id: childId },
    })

    if (!child) {
      // Find from initial list
      const initialMatch = INITIAL_CHILDREN.find((c) => c.id === childId)
      if (initialMatch) {
        child = await prisma.child.create({
          data: {
            id: initialMatch.id,
            firstName: initialMatch.firstName,
            lastName: initialMatch.lastName,
            dateOfBirth: new Date(initialMatch.dateOfBirth),
            dream: initialMatch.dream,
            imageUrl: initialMatch.imageUrl,
            summary: initialMatch.summary,
            story: initialMatch.story,
          },
        })
      } else {
        return { success: false, error: "Selected child was not found." }
      }
    }

    // Business Rule Check: One child can have only one active sponsor
    const existingActiveSponsorship = await prisma.sponsorship.findFirst({
      where: {
        childId: child.id,
        status: "ACTIVE",
      },
    })

    if (existingActiveSponsorship) {
      return {
        success: false,
        error: `${child.firstName} currently has an active sponsor and cannot be sponsored again at this time.`,
      }
    }

    // Business Rule: One donor can sponsor multiple children (upsert donor record)
    const cleanEmail = donorInput.email.trim().toLowerCase()
    const donor = await prisma.donor.upsert({
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

    // Pricing: Monthly = $78, Yearly = $936 ($78 * 12)
    const amount = frequency === 'YEARLY' ? 936 : 78
    const currency = "USD"
    const reference = generateReference("SPON")

    // Create Sponsorship = PENDING and Payment = PENDING in transaction
    const result = await prisma.$transaction(async (tx) => {
      const sponsorship = await tx.sponsorship.create({
        data: {
          donorId: donor.id,
          childId: child.id,
          amount,
          currency,
          frequency,
          status: "PENDING",
        },
      })

      const payment = await tx.payment.create({
        data: {
          sponsorshipId: sponsorship.id,
          reference,
          amount,
          currency,
          provider: "NOT_CONFIGURED",
          status: "PENDING",
        },
      })

      return { sponsorship, payment }
    })

    revalidatePath("/sponsor")
    revalidatePath("/admin/sponsors")

    return {
      success: true,
      sponsorship: {
        id: result.sponsorship.id,
        amount: Number(result.sponsorship.amount),
        currency: result.sponsorship.currency,
        frequency: result.sponsorship.frequency,
        status: result.sponsorship.status,
      },
      payment: {
        id: result.payment.id,
        reference: result.payment.reference,
        amount: Number(result.payment.amount),
        currency: result.payment.currency,
        status: result.payment.status,
      },
      child: {
        id: child.id,
        name: `${child.firstName} ${child.lastName}`.trim(),
        dream: child.dream,
        imageUrl: child.imageUrl,
      },
      donor: {
        id: donor.id,
        name: `${donor.firstName} ${donor.lastName}`.trim(),
        email: donor.email,
      },
    }
  } catch (error: any) {
    console.error("Error creating pending sponsorship:", error)
    return { success: false, error: error.message || "Failed to create sponsorship." }
  }
}

/**
 * Verify / Simulate Payment for Sponsorship or Donation
 * Transitions Payment: PENDING -> SUCCESSFUL
 * Transitions Sponsorship: PENDING -> ACTIVE (with startedAt)
 * Transitions Donation: PENDING -> COMPLETED
 */
export async function verifyPaymentAction(paymentId: string) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        sponsorship: {
          include: {
            child: true,
            donor: true,
          },
        },
        donation: {
          include: {
            donor: true,
          },
        },
      },
    })

    if (!payment) {
      return { success: false, error: "Payment record not found." }
    }

    const paidAt = new Date()
    const transactionId = `TXN-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`

    // Update payment to SUCCESSFUL and corresponding entity
    const updated = await prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: "SUCCESSFUL",
          paidAt,
          transactionId,
        },
      })

      if (payment.sponsorshipId) {
        // Activate sponsorship
        await tx.sponsorship.update({
          where: { id: payment.sponsorshipId },
          data: {
            status: "ACTIVE",
            startedAt: paidAt,
          },
        })
      }

      if (payment.donationId) {
        // Complete donation
        await tx.donation.update({
          where: { id: payment.donationId },
          data: {
            status: "COMPLETED",
          },
        })
      }

      return updatedPayment
    })

    revalidatePath("/sponsor")
    revalidatePath("/donate")
    revalidatePath("/admin/sponsors")
    revalidatePath("/admin/donations")
    revalidatePath("/admin/payments")
    revalidatePath("/admin/children")

    return {
      success: true,
      payment: {
        id: updated.id,
        reference: updated.reference,
        transactionId: updated.transactionId,
        amount: Number(updated.amount),
        currency: updated.currency,
        status: updated.status,
        paidAt: updated.paidAt?.toISOString(),
      },
      sponsorship: payment.sponsorship
        ? {
            id: payment.sponsorship.id,
            status: "ACTIVE",
            childName: `${payment.sponsorship.child.firstName} ${payment.sponsorship.child.lastName}`,
            donorName: `${payment.sponsorship.donor.firstName} ${payment.sponsorship.donor.lastName}`,
            frequency: payment.sponsorship.frequency,
          }
        : null,
      donation: payment.donation
        ? {
            id: payment.donation.id,
            category: payment.donation.category,
            status: "COMPLETED",
          }
        : null,
    }
  } catch (error: any) {
    console.error("Error verifying payment:", error)
    return { success: false, error: error.message || "Failed to verify payment." }
  }
}
