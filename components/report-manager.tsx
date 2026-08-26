"use client"

import { useState, useTransition } from "react"
import { Download, FileText, Pencil, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createReportAction, deleteReportAction, updateReportAction } from "@/app/actions/reports"

type Report = {
  id: string
  title: string
  fileUrl: string
  createdAt: Date | string
}

function getFileSrc(fileUrl: string) {
  if (/^(https?:|blob:|data:)/.test(fileUrl) || fileUrl.startsWith("/")) return fileUrl
  return `/${fileUrl}`
}

function ReportForm({ report, onSaved }: { report?: Report; onSaved: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, startSaving] = useTransition()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    startSaving(async () => {
      const response = report
        ? await updateReportAction(report.id, formData)
        : await createReportAction(formData)
      if (!response.success) {
        toast.error(response.error)
        return
      }
      toast.success(report ? "Report updated successfully." : "Report uploaded successfully.")
      setIsOpen(false)
      onSaved()
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {report ? (
          <Button type="button" variant="ghost" size="icon" aria-label={`Edit ${report.title}`}>
            <Pencil className="size-4" />
          </Button>
        ) : (
          <Button type="button" className="gap-2 bg-black text-white hover:bg-gray-800">
            <Plus className="size-4" />
            Add Report
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[90vw] sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{report ? "Edit Report" : "Add Report"}</DialogTitle>
            <DialogDescription>
              {report ? "Update the report title or replace its file." : "Upload a report with a clear title."}
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="my-4 grid gap-4">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" defaultValue={report?.title} placeholder="Annual report 2025" required />
            </Field>
            <Field>
              <Label htmlFor="file">Report File</Label>
              <Input id="file" name="file" type="file" required={!report} />
              {report && <p className="text-xs text-muted-foreground">Leave empty to keep the current file.</p>}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="outline">Cancel</Button></DialogClose>
            <Button type="submit" disabled={isSaving} className="bg-yellow-500 font-semibold text-white hover:bg-yellow-600">
              {isSaving ? "Saving..." : report ? "Save Changes" : "Upload Report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ReportManager({ initialReports }: { initialReports: Report[] }) {
  const [reports, setReports] = useState(initialReports)
  const [isDeleting, startDeleting] = useTransition()

  const refresh = async () => {
    const response = await fetch("/api/admin/reports", { cache: "no-store" })
    if (response.ok) setReports(await response.json())
  }

  const handleDelete = (report: Report) => {
    if (!window.confirm(`Delete "${report.title}"?`)) return
    startDeleting(async () => {
      const response = await deleteReportAction(report.id)
      if (!response.success) {
        toast.error(response.error)
        return
      }
      toast.success("Report deleted successfully.")
      setReports((current) => current.filter((item) => item.id !== report.id))
    })
  }

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Reports</h1>
          <p className="text-sm text-gray-500">Upload and maintain organization reports.</p>
        </div>
        <ReportForm onSaved={refresh} />
      </div>
      {reports.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">No reports have been uploaded yet.</div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="divide-y divide-gray-100">
            {reports.map((report) => (
              <div key={report.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-yellow-50 text-yellow-700"><FileText className="size-5" /></div>
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold text-gray-900">{report.title}</h2>
                    <p className="text-xs text-gray-400">{new Date(report.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:shrink-0">
                  <Button asChild variant="outline" size="sm" className="gap-2">
                    <a href={getFileSrc(report.fileUrl)} target="_blank" rel="noreferrer"><Download className="size-4" />Open file</a>
                  </Button>
                  <ReportForm report={report} onSaved={refresh} />
                  <Button type="button" variant="ghost" size="icon" aria-label={`Delete ${report.title}`} disabled={isDeleting} onClick={() => handleDelete(report)}>
                    <Trash2 className="size-4 text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
