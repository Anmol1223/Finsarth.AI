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

  const [avgSpend, setAvgSpend] = useState(0);

const [netSavings, setNetSavings] = useState(0);

const [spendingRatio, setSpendingRatio] =
  useState(0);

const [savingsRate, setSavingsRate] =
  useState(0);


const [currentBalance, setCurrentBalance] =
  useState(0);

  const [selectedView, setSelectedView] =
  useState("Expense");

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
    const avg =
  data.length > 0
    ? debits / data.length
    : 0;

const savings =
  credits - debits;

const spendRatio =
  credits > 0
    ? (debits / credits) * 100
    : 0;

const saveRate =
  credits > 0
    ? (savings / credits) * 100
    : 0;

setAvgSpend(avg);
setNetSavings(savings);
setSpendingRatio(spendRatio);
setSavingsRate(saveRate);

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

  if (Number(tx.withdrawal || 0) > 0) {
    categories[category] =
      (categories[category] || 0) + 1;
  }
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
)
.filter(([, value]) => value > 0)
.map(([name, value]) => ({
  name,
  value,
}));

    setCategoryData(chartData);

   const avgSpend =
  data.length > 0
    ? debits / data.length
    : 0;


let insight = `
You spent ₹${debits.toLocaleString()} across ${data.length} transactions.

Average transaction value: ₹${avgSpend.toFixed(2)}.

Total income: ₹${credits.toLocaleString()}.

Current balance: ₹${latestTx?.balance || 0}.

Top spending category: ${top}.
`;

if (savings > 0) {
  insight += `
You saved ₹${savings.toLocaleString()} during this period.
`;
} else {
  insight += `
Your spending exceeded your income by ₹${Math.abs(savings).toLocaleString()}.
`;
}

setAiInsight(insight);
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

       <div
  className="
  mt-8
  rounded-3xl
  border
  border-cyan-500/20
  bg-gradient-to-br
  from-slate-900
  to-slate-950
  p-10
"
>

  <h2 className="text-4xl font-bold text-cyan-400 mb-8">
    AI Financial Copilot
  </h2>

  <div className="grid gap-6 md:grid-cols-2">

  
    <div className="rounded-2xl bg-slate-950/50 p-6">
      <p className="text-slate-400">
        Net Savings
      </p>

      <h3 className="mt-2 text-3xl font-bold text-cyan-400">
        ₹{netSavings.toLocaleString()}
      </h3>
    </div>

    <div className="rounded-2xl bg-slate-950/50 p-6">
      <p className="text-slate-400">
        Savings Rate
      </p>

      <h3 className="mt-2 text-3xl font-bold text-purple-400">
        {savingsRate.toFixed(1)}%
      </h3>
    </div>

  </div>

  <div className="mt-8 rounded-2xl bg-slate-950/50 p-8">

    <h3 className="text-xl font-bold mb-4">
      AI Recommendation
    </h3>

    <ul className="space-y-3 text-slate-300">

      <li>
        • Average spending per transaction:
        ₹{avgSpend.toFixed(2)}
      </li>

      <li>
        • Spending ratio:
        {spendingRatio.toFixed(1)}%
      </li>

      <li>
        • Current balance:
        ₹{currentBalance.toLocaleString()}
      </li>

      <li>
        • Top spending category:
        {topCategory}
      </li>

      <li>
        • Recommendation:
        Reduce monthly expenses by 5-10%
        to improve savings rate.
      </li>

    </ul>

  </div>

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
  `₹${monthlySpending.toLocaleString(
  undefined,
  {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
)}`
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
  `₹${totalCredits.toLocaleString(
    undefined,
  {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
)}`
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
  `₹${totalDebits.toLocaleString(
    undefined,
  {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
  )}`
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
  `₹${currentBalance.toLocaleString(
    undefined,
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  )}`
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
₹{item.value.toLocaleString(
  undefined,
  {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }
)}
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
      <div className="mb-6 flex items-center justify-between">

  <h2 className="text-3xl font-bold">
    Financial Analysis
  </h2>

  <select
    value={selectedView}
    onChange={(e) =>
      setSelectedView(e.target.value)
    }
    className="
      rounded-xl
      border
      border-slate-700
      bg-slate-900
      px-4
      py-2
      text-white
    "
  >
    <option value="Expense">Expense</option>
    <option value="Credit">Credit</option>
    <option value="Savings">Savings</option>
    <option value="Balance">Balance</option>
  </select>

</div>

<div className="mb-6 rounded-2xl border border-slate-800 p-6">

  <p className="text-slate-400">
    {selectedView}
  </p>

  <h2 className="mt-2 text-4xl font-bold text-cyan-400">

    {selectedView === "Expense"
      ? `₹${totalDebits.toLocaleString()}`
      : selectedView === "Credit"
      ? `₹${totalCredits.toLocaleString()}`
      : selectedView === "Savings"
      ? `₹${netSavings.toLocaleString()}`
      : `₹${currentBalance.toLocaleString()}`}

  </h2>

</div>
      
      <div className="grid gap-4 md:grid-cols-2">

  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
    <p className="text-sm text-slate-400">
      Average Transaction
    </p>

    <h3 className="mt-2 text-3xl font-bold text-cyan-400">
      ₹ {avgSpend.toLocaleString(undefined,{
        minimumFractionDigits:2,
        maximumFractionDigits:2
      })}
    </h3>
  </div>

  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
    <p className="text-sm text-slate-400">
      Net Savings
    </p>

    <h3 className="mt-2 text-3xl font-bold text-green-400">
      ₹ {netSavings.toLocaleString()}
    </h3>
  </div>

  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
    <p className="text-sm text-slate-400">
      Spending Ratio
    </p>

    <h3 className="mt-2 text-3xl font-bold text-orange-400">
      {spendingRatio.toFixed(1)}%
    </h3>
  </div>

  <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
    <p className="text-sm text-slate-400">
      Savings Rate
    </p>

    <h3 className="mt-2 text-3xl font-bold text-purple-400">
      {savingsRate.toFixed(1)}%
    </h3>
  </div>

</div>
    </div>

  </div>
</div>

    
    </main>
  );
}