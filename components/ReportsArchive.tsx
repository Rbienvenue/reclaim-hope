import { Download, FileText } from "lucide-react";

type Report = {
  id: string;
  title: string;
  fileUrl: string;
  createdAt: Date;
};

export default function ReportsArchive({ reports }: { reports: Report[] }) {
  return (
    <section id="reports-archive" className="bg-yellow-50 px-6 py-20 md:px-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-4xl font-bold text-gray-900">Reports</h2>
        {reports.length === 0 ? (
          <p className="text-gray-500">No reports are available yet.</p>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="divide-y divide-gray-100">
              {reports.map((report) => (
                <div key={report.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <FileText className="size-6 shrink-0 text-yellow-700" />
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-gray-900">{report.title}</h3>
                      <p className="text-xs text-gray-400">{report.createdAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                  <a href={report.fileUrl} download className="inline-flex items-center justify-center gap-2 rounded-full bg-[#001f3f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#003366] sm:shrink-0">
                    <Download className="size-4" />
                    Download report
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}