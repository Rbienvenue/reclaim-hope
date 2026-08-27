import { prisma } from "@/lib/prisma";
import { getR2ObjectUrl } from "@/lib/r2";
import NewsletterArchive from "@/components/NewsletterArchive";
import ReportsArchive from "@/components/ReportsArchive";

export default async function MediaCenterPage() {
  const [newsletters, reports] = await Promise.all([
    prisma.newsletter.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        imageUrl: true,
        pdfUrl: true,
        summary: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.report.findMany({
      select: { id: true, title: true, fileUrl: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <>
      <NewsletterArchive
        newsletters={newsletters.map((newsletter) => ({
          ...newsletter,
          imageUrl: newsletter.imageUrl ? getR2ObjectUrl(newsletter.imageUrl) : null,
          pdfUrl: newsletter.pdfUrl ? getR2ObjectUrl(newsletter.pdfUrl) : null,
        }))}
      />
      <ReportsArchive
        reports={reports.map((report) => ({
          ...report,
          fileUrl: getR2ObjectUrl(report.fileUrl),
        }))}
      />
    </>
  );
}