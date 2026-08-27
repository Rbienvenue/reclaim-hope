import Image from "next/image";
import { FileText } from "lucide-react";

type Newsletter = {
  id: string;
  title: string;
  imageUrl: string | null;
  pdfUrl: string | null;
  summary: string;
  createdAt: Date;
};

export default function NewsletterArchive({ newsletters }: { newsletters: Newsletter[] }) {
  return (
    <section id="newsletters" className="bg-white px-6 py-20 md:px-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-12 text-4xl font-bold text-gray-900">Newsletters</h1>
        {newsletters.length === 0 ? (
          <p className="text-gray-500">No newsletters are available yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {newsletters.map((newsletter) => (
              <article key={newsletter.id} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="relative aspect-[4/3] bg-gray-100">
                  {newsletter.imageUrl ? (
                    <Image src={newsletter.imageUrl} alt={newsletter.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400"><FileText className="size-12" /></div>
                  )}
                </div>
                <div className="space-y-4 p-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{newsletter.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{newsletter.summary}</p>
                  </div>
                  {newsletter.pdfUrl && (
                    <a href={newsletter.pdfUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#001f3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#003366]">
                      <FileText className="size-4" />
                      Open newsletter PDF
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}