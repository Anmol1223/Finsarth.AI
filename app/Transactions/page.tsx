"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TransactionsPage() {
  const [transactions, setTransactions] =
    useState<any[]>([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  async function fetchTransactions() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("date", {
        ascending: false,
      });

    setTransactions(data || []);
  }

  return (
    <main className="min-h-screen p-8 bg-slate-950 text-white">
      <h1 className="text-4xl font-bold mb-8">
        Transactions
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
  <tr className="border-b border-slate-700">
    <th className="p-3 text-left">Date</th>
    <th className="p-3 text-left">Merchant</th>
    <th className="p-3 text-left">Category</th>
    <th className="p-3 text-right">Credit</th>
    <th className="p-3 text-right">Debit</th>
    <th className="p-3 text-right">Balance</th>
  </tr>
</thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
  key={tx.id}
  className="border-b border-slate-800"
>
                <td className="p-3">{tx.date}</td>
                <td className="p-3">{tx.merchant}</td>
                <td className="p-3">{tx.category}</td>
                <td className="p-3 text-right text-green-400">
  ₹{Number(tx.deposit).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}
</td>

<td className="p-3 text-right text-red-400">
  ₹{Number(tx.withdrawal).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}
</td>
<td className="p-3 text-right">
  ₹{Number(tx.balance).toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}