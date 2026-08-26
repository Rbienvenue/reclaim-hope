import { NewsletterManager } from "@/components/newsletter-manager"
import { prisma } from "@/lib/prisma"

export default async function NewslettersPage() {
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

  return <NewsletterManager initialNewsletters={newsletters} />
}
