import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { verifyAdminSession } from "@/lib/auth"

export async function GET() {
  try {
    await verifyAdminSession()
    const reports = await prisma.report.findMany({
      select: { id: true, title: true, fileUrl: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(reports)
  } catch (error) {
    console.error("Error fetching reports:", error)
    return NextResponse.json({ error: "Failed to fetch reports." }, { status: 500 })
  }
}
