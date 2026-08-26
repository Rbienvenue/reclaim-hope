import { ReportManager } from "@/components/report-manager"
import { prisma } from "@/lib/prisma"

export default async function ReportsPage() {
  const reports = await prisma.report.findMany({
    select: { id: true, title: true, fileUrl: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  })

  return <ReportManager initialReports={reports} />
}
