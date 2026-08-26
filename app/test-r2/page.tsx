"use client";

import { ImageDropzone } from "@/components/image-drop-area";
import { useState } from "react";

export default function TestR2Page() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  async function handleUpload() {
    if (!file) {
      setMessage("Select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setMessage("Uploading...");

    const response = await fetch("/api/test-r2", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error || "Upload failed");
      return;
    }

    setMessage(`Uploaded successfully: ${data.key}`);
  }

  return (
    <div className="p-10">
      <h1 className="mb-4 text-2xl font-bold">
        R2 Test Upload
      </h1>

      <ImageDropzone />

      <button
        onClick={handleUpload}
        className="mt-4 rounded bg-black px-4 py-2 text-white"
      >
        Upload
      </button>

      {message && (
        <p className="mt-4">
          {message}
        </p>
      )}
    </div>
  );
}