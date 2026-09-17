"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function UploadPage() {
  const [rows, setRows] = useState<string[][]>([]);
  async function saveTransactions() {
  if (rows.length <= 1) return;

  const transactions = rows.slice(1).map((row) => ({
  date: row[0],
  description: row[1],
  deposit: Number(row[2] || 0),
  withdrawal: Number(row[3] || 0),
  balance: Number(row[4] || 0),
  merchant: row[1],
  amount:
    Number(row[2] || 0) +
    Number(row[3] || 0),
  category: "Other",
}));

  const { error } = await supabase
    .from("transactions")
    .insert(transactions);

  if (error) {
    alert(error.message);
  } else {
    alert("Transactions saved successfully!");
  }
}

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;

      const data = text
        .split("\n")
        .map((row) => row.split(","));

      setRows(data);
    };

    reader.readAsText(file);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Upload Statement
      </h1>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          className="w-full rounded-lg border border-slate-700 p-4"
        />
      </div>

      {rows.length > 0 && (
        <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-2xl font-bold">
            CSV Preview
          </h2>
          <button
  onClick={saveTransactions}
  className="mb-4 rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black"
>
  Save To Database
</button>

          <pre className="overflow-x-auto text-sm">
            {JSON.stringify(rows.slice(0, 10), null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}