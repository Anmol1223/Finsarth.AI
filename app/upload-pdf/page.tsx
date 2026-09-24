"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function UploadPdfPage() {
  const [fileName, setFileName] = useState("");
  const [pdfText, setPdfText] = useState("");
  const [statementType, setStatementType] =
  useState("bank");
  

  async function handleFile(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];

  if (!file) return;

  setFileName(file.name);

  const {
  data: { user },
} = await supabase.auth.getUser();

console.log("USER =", user);
console.log("USER ID =", user?.id);

if (!user) {
  alert("Please login again");
  return;
}

const formData = new FormData();

formData.append("file", file);
formData.append("type", statementType);
formData.append("user_id", user.id);
  const response = await fetch(
    "/api/extract-pdf",
    {
      method: "POST",
      body: formData,
    }
  );
const result = await response.json();
console.log(
  JSON.stringify(result, null, 2)
);

if (result.success) {
  setPdfText(result.text || "");

  alert(
  `${result.imported || 0} transactions imported successfully`
);

window.location.href = "/dashboard";
} else {
  alert(result.error);
}
}

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="mb-8 text-4xl font-bold">
  Upload PDF Statement
</h1>

<select
  value={statementType}
  onChange={(e) =>
    setStatementType(e.target.value)
  }
  className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-900 p-3"
>
  <option value="bank">
    Bank Statement
  </option>

  <option value="credit_card">
    Credit Card Statement
  </option>

  <option value="upi">
    UPI Statement
  </option>

  <option value="auto">
    Auto Detect (Recommended)
  </option>
</select>

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