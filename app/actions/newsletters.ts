'use server'

import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { verifyAdminSession } from "@/lib/auth"
import { r2, R2_BUCKET_NAME } from "@/lib/r2"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"]
const MAX_IMAGE_SIZE = 10 * 1024 * 1024
const MAX_PDF_SIZE = 25 * 1024 * 1024

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "newsletter"
}

function getStorageKey(fileUrl: string | null) {
  if (!fileUrl) return null
  const publicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "")
  if (publicUrl && fileUrl.startsWith(`${publicUrl}/`)) {
    return fileUrl.slice(publicUrl.length + 1)
  }
  return fileUrl.startsWith("newsletters/") ? fileUrl : null
}

async function uploadImage(image: File) {
  if (!ACCEPTED_IMAGE_TYPES.includes(image.type) || image.size > MAX_IMAGE_SIZE) {
    return { error: "Image must be JPG, PNG, WebP, or AVIF and no larger than 10 MB." }
  }

  const safeName = image.name.replace(/[^a-zA-Z0-9._-]/g, "-")
  const key = `newsletters/${Date.now()}-${safeName}`
  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: Buffer.from(await image.arrayBuffer()),
      ContentType: image.type,
    })
  )

  return {
    url: process.env.R2_PUBLIC_URL
      ? `${process.env.R2_PUBLIC_URL.replace(/\/$/, "")}/${key}`
      : key,
  }
}

async function uploadPdf(pdf: File) {
  if (pdf.type !== "application/pdf" || pdf.size > MAX_PDF_SIZE) {
    return { error: "PDF must be a valid PDF file no larger than 25 MB." }
  }

  const safeName = pdf.name.replace(/[^a-zA-Z0-9._-]/g, "-")
  const key = `newsletters/${Date.now()}-${safeName}`
  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: key,
      Body: Buffer.from(await pdf.arrayBuffer()),
      ContentType: pdf.type,
    })
  )

  return {
    url: process.env.R2_PUBLIC_URL
      ? `${process.env.R2_PUBLIC_URL.replace(/\/$/, "")}/${key}`
      : key,
  }
}

async function deleteFile(fileUrl: string | null) {
  const key = getStorageKey(fileUrl)
  if (!key) return
  await r2.send(new DeleteObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key }))
}

function getFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    summary: String(formData.get("summary") ?? "").trim(),
    image: formData.get("image"),
    pdf: formData.get("pdf"),
  }
}

export async function createNewsletterAction(formData: FormData) {
  try {
    await verifyAdminSession()
    const { title, summary, image, pdf } = getFields(formData)

    if (!title || !summary) {
      return { success: false, error: "Title and summary are required." }
    }
    if (!(image instanceof File)) {
      return { success: false, error: "A newsletter image is required." }
    }
    if (!(pdf instanceof File)) {
      return { success: false, error: "A newsletter PDF is required." }
    }

    const uploaded = await uploadImage(image)
    if (uploaded.error) return { success: false, error: uploaded.error }
    const uploadedPdf = await uploadPdf(pdf)
    if (uploadedPdf.error) return { success: false, error: uploadedPdf.error }

    const slug = `${slugify(title)}-${Date.now()}`
    await prisma.newsletter.create({
      data: {
        title,
        slug,
        category: "Newsletter",
        date: new Date().toISOString().slice(0, 10),
        imageUrl: uploaded.url,
        pdfUrl: uploadedPdf.url,
        summary,
        content: summary,
        highlights: [],
      },
    })

    revalidatePath("/admin/newsletters")
    return { success: true }
  } catch (error) {
    console.error("Error creating newsletter:", error)
    return { success: false, error: "Failed to create newsletter." }
  }
}

export async function updateNewsletterAction(id: string, formData: FormData) {
  try {
    await verifyAdminSession()
    const { title, summary, image, pdf } = getFields(formData)

    if (!title || !summary) {
      return { success: false, error: "Title and summary are required." }
    }

    const newsletter = await prisma.newsletter.findUnique({ where: { id } })
    if (!newsletter) return { success: false, error: "Newsletter not found." }

    let imageUrl = newsletter.imageUrl
    if (image instanceof File && image.size > 0) {
      const uploaded = await uploadImage(image)
      if (uploaded.error) return { success: false, error: uploaded.error }
      imageUrl = uploaded.url ?? imageUrl
      await deleteFile(newsletter.imageUrl)
    }

    let pdfUrl = newsletter.pdfUrl
    if (pdf instanceof File && pdf.size > 0) {
      const uploadedPdf = await uploadPdf(pdf)
      if (uploadedPdf.error) return { success: false, error: uploadedPdf.error }
      pdfUrl = uploadedPdf.url ?? pdfUrl
      await deleteFile(newsletter.pdfUrl)
    }

    await prisma.newsletter.update({
      where: { id },
      data: {
        title,
        summary,
        content: summary,
        imageUrl,
        pdfUrl,
      },
    })

    revalidatePath("/admin/newsletters")
    return { success: true }
  } catch (error) {
    console.error("Error updating newsletter:", error)
    return { success: false, error: "Failed to update newsletter." }
  }
}

export async function deleteNewsletterAction(id: string) {
  try {
    await verifyAdminSession()
    const newsletter = await prisma.newsletter.findUnique({
      where: { id },
      select: { imageUrl: true, pdfUrl: true },
    })
    if (!newsletter) return { success: false, error: "Newsletter not found." }

    await prisma.newsletter.delete({ where: { id } })
    await deleteFile(newsletter.imageUrl)
    await deleteFile(newsletter.pdfUrl)
    revalidatePath("/admin/newsletters")
    return { success: true }
  } catch (error) {
    console.error("Error deleting newsletter:", error)
    return { success: false, error: "Failed to delete newsletter." }
  }
}