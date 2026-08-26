import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2, R2_BUCKET_NAME } from "@/lib/r2";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return Response.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const key = `test/${Date.now()}-${file.name}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return Response.json({
      success: true,
      key,
      filename: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error("R2 upload error:", error);

    return Response.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}