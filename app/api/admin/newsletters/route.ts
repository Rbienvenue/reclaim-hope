import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyAdminSession } from "@/lib/auth"

export async function GET() {
  try {
    await verifyAdminSession()
    const newsletters = await prisma.newsletter.findMany({
      select: {
        id: true,
        title: true,
        summary: true,
        imageUrl: true,
        pdfUrl: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(newsletters)
  } catch (error) {
    console.error("Error fetching newsletters:", error)
    return NextResponse.json({ error: "Failed to fetch newsletters." }, { status: 500 })
  }
}
