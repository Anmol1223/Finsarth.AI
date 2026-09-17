"use client";

import { useState } from "react";

export default function UploadPdfPage() {
  const [fileName, setFileName] = useState("");
  const [pdfText, setPdfText] = useState("");
  

  async function handleFile(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];

  if (!file) return;

  setFileName(file.name);

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "/api/extract-pdf",
    {
      method: "POST",
      body: formData,
    }
  );
const result = await response.json();

console.log(result);
alert(JSON.stringify(result));


  console.log(result);
if (result.success) {
  alert(
    `${result.imported} transactions imported successfully`
  );
}
}

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Upload PDF Statement
      </h1>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFile}
      />

      <div className="mt-8">
        <p>{fileName}</p>
      </div>

      {pdfText && (
  <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
    <h2 className="mb-4 text-2xl font-bold">
      Extracted Text
    </h2>

    <pre className="whitespace-pre-wrap text-sm">
      {pdfText.slice(0, 3000)}
    </pre>
  </div>
)}
    </main>
  );
}