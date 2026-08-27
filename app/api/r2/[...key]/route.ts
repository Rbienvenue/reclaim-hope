import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2, R2_BUCKET_NAME } from "@/lib/r2";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const { key } = await params;
  const objectKey = key.join("/");

  if (!objectKey || objectKey.includes("..")) {
    return new Response("Invalid object key", { status: 400 });
  }

  try {
    const object = await r2.send(
      new GetObjectCommand({ Bucket: R2_BUCKET_NAME, Key: objectKey }),
    );

    if (!object.Body) {
      return new Response("Object not found", { status: 404 });
    }

    return new Response(object.Body.transformToWebStream(), {
      headers: {
        "Content-Type": object.ContentType || "application/octet-stream",
        ...(object.ContentLength !== undefined
          ? { "Content-Length": String(object.ContentLength) }
          : {}),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("R2 object read error:", error);
    return new Response("Object not found", { status: 404 });
  }
}