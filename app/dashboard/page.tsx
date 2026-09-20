"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {
  const router = useRouter();

  const [monthlySpending, setMonthlySpending] = useState(0);
  const [totalCredits, setTotalCredits] =
  useState(0);

const [totalDebits, setTotalDebits] =
  useState(0);

const [currentBalance, setCurrentBalance] =
  useState(0);

  const [transactionCount, setTransactionCount] = useState(0);
  const [topCategory, setTopCategory] = useState("N/A");
  const [aiInsight, setAiInsight] = useState("");
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<
  { name: string; value: number }[]
>([]);
 const chartData = categoryData;

const COLORS = [
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];
  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    const {
  data: { user },
} = await supabase.auth.getUser();

if (!user) {
  router.push("/login");
  return;
}
  try {
    const { data, error } = await supabase
  .from("transactions")
  .select("*")
  .eq("user_id", user.id);

    console.log("DATA =", data);
    console.log("ERROR =", error);

    if (error || !data) {
      return;
    }
    if (data.length === 0) {
  setTransactionCount(0);
  setMonthlySpending(0);
  setTotalCredits(0);
  setTotalDebits(0);
  setCurrentBalance(0);
  setTopCategory("No Data");

  setAiInsight(
    "Upload your first bank statement to generate AI-powered insights."
  );

  setLoading(false);
  return;
}
    setTransactionCount(data.length);

    const credits = data.reduce(
      (sum, tx) =>
        sum + Number(tx.deposit || 0),
      0
    );

    const debits = data.reduce(
      (sum, tx) =>
        sum + Number(tx.withdrawal || 0),
      0
    );

    setTotalCredits(credits);
    setTotalDebits(debits);
    setMonthlySpending(debits);

    const latestTx = [...data].sort(
      (a, b) =>
        new Date(b.date).getTime() -
        new Date(a.date).getTime()
    )[0];

    setCurrentBalance(
      Number(latestTx?.balance || 0)
    );

    const categories: Record<string, number> = {};

    data.forEach((tx) => {
      const category =
        tx.category || "Other";

      categories[category] =
        (categories[category] || 0) + 1;
    });

    const top =
      Object.keys(categories).length > 0
        ? Object.keys(categories).reduce(
            (a, b) =>
              categories[a] >
              categories[b]
                ? a
                : b
          )
        : "N/A";

    setTopCategory(top);

    const categoryTotals: Record<
      string,
      number
    > = {};

    data.forEach((tx) => {
      const category =
        tx.category || "Other";

      categoryTotals[category] =
        (categoryTotals[category] || 0) +
        Number(tx.withdrawal || 0);
    });

    const chartData = Object.entries(
      categoryTotals
    ).map(([name, value]) => ({
      name,
      value,
    }));

    setCategoryData(chartData);

    setAiInsight(
      "Top spending category: " +
        top +
        ". Review this category for savings opportunities."
    );
  } catch (err) {
    console.error(
      "Dashboard Error:",
      err
    );
  } finally {
    setLoading(false);
  }
}

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          Welcome to Finsarth AI
        </h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

  <div
    className="
    rounded-3xl
    border
    border-slate-800
    bg-slate-900/80
    backdrop-blur-md
    p-6
    shadow-lg
    shadow-cyan-950/20
    hover:border-cyan-500/30
    hover:shadow-cyan-900/30
    transition-all
    duration-300
  "
  >
    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
      Total Spending
    </p>

    <h2 className="mt-3 text-4xl font-bold">
      {loading ? (
  <div className="h-10 w-36 animate-pulse rounded bg-slate-800" />
) : (
  `₹${monthlySpending.toLocaleString()}`
)}
    </h2>

    <p className="mt-2 text-sm text-slate-400">
      Total withdrawals tracked
    </p>
  </div>

  <div
    className="
    rounded-3xl
    border
    border-slate-800
    bg-slate-900/80
    backdrop-blur-md
    p-6
    shadow-lg
    shadow-cyan-950/20
    hover:border-cyan-500/30
    hover:shadow-cyan-900/30
    transition-all
    duration-300
  "
  >
    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
      Transactions
    </p>

    <h2 className="mt-3 text-4xl font-bold">
      {loading ? (
  <div className="h-10 w-24 animate-pulse rounded bg-slate-800" />
) : (
  transactionCount
)}
    </h2>

    <p className="mt-2 text-sm text-slate-400">
      Imported and categorized
    </p>
  </div>

  <div
    className="
    rounded-3xl
    border
    border-slate-800
    bg-slate-900/80
    backdrop-blur-md
    p-6
    shadow-lg
    shadow-cyan-950/20
    hover:border-cyan-500/30
    hover:shadow-cyan-900/30
    transition-all
    duration-300
  "
  >
    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
      Top Category
    </p>

    <h2 className="mt-3 text-4xl font-bold">
      {loading ? (
  <div className="h-10 w-24 animate-pulse rounded bg-slate-800" />
) : (
  topCategory
)}
    </h2>

    <p className="mt-2 text-sm text-slate-400">
      Highest spending segment
    </p>
  </div>

  <div
    className="
    rounded-3xl
    border
    border-slate-800
    bg-slate-900/80
    backdrop-blur-md
    p-6
    shadow-lg
    shadow-green-950/20
    hover:border-green-500/30
    transition-all
    duration-300
  "
  >
    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
      Total Credits
    </p>

    <h2 className="mt-3 text-4xl font-bold text-green-400">
      {loading ? (
  <div className="h-10 w-24 animate-pulse rounded bg-slate-800" />
) : (
  totalCredits
)}
    </h2>

    <p className="mt-2 text-sm text-green-400">
      Money received
    </p>
  </div>

  <div
    className="
    rounded-3xl
    border
    border-slate-800
    bg-slate-900/80
    backdrop-blur-md
    p-6
    shadow-lg
    shadow-red-950/20
    hover:border-red-500/30
    transition-all
    duration-300
  "
  >
    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
      Total Debits
    </p>

    <h2 className="mt-3 text-4xl font-bold text-red-400">
     {loading ? (
  <div className="h-10 w-24 animate-pulse rounded bg-slate-800" />
) : (
  totalDebits
  )}
    </h2>

    <p className="mt-2 text-sm text-red-400">
      Money spent
    </p>
  </div>

  <div
    className="
    rounded-3xl
    border
    border-slate-800
    bg-slate-900/80
    backdrop-blur-md
    p-6
    shadow-lg
    shadow-cyan-950/20
    hover:border-cyan-500/30
    transition-all
    duration-300
  "
  >
    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
      Current Balance
    </p>

    <h2 className="mt-3 text-4xl font-bold text-cyan-400">
      {loading ? (
  <div className="h-10 w-24 animate-pulse rounded bg-slate-800" />
) : (
  currentBalance
)}
    </h2>

    <p className="mt-2 text-sm text-cyan-400">
      Latest statement balance
    </p>
  </div>

</div>

      <div
  className="
  mt-8
  rounded-3xl
  border
  border-slate-800
  bg-slate-900/80
  backdrop-blur-md
  p-8
  shadow-lg
  shadow-cyan-950/20
"
>
  <div className="mb-6">
    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
      Analytics
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      Spending Breakdown
    </h2>
  </div>

  <div className="grid gap-8 lg:grid-cols-2">

    <div>
      {categoryData.map((item) => (
        <div
          key={item.name}
          className="mb-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 p-4"
        >
          <span className="font-medium">
            {item.name}
          </span>

          <span className="text-cyan-400 font-bold">
            ₹{item.value.toLocaleString()}
          </span>
        </div>
      ))}
    </div>

    <div
      style={{
        width: "100%",
        height: 320,
      }}
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            outerRadius={120}
            label
          >
            {chartData.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                        COLORS.length
                    ]
                  }
                />
              )
            )}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

  </div>
</div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-3 text-2xl font-bold">
          AI Insight
        </h2>

        <p className="text-slate-400">
          {aiInsight}
        </p>
      </div>

    </main>
  );
}