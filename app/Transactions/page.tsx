"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

    if (!error && data) {
      setTransactions(data);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold">
        Transactions
      </h1>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="border-b border-slate-700">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Merchant</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Category</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-slate-800"
              >
                <td className="p-4">{tx.date}</td>
                <td className="p-4">{tx.merchant}</td>
                <td className="p-4">₹{tx.amount}</td>
                <td className="p-4">{tx.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}