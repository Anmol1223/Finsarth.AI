"use client";

import { useRouter } from "next/navigation";

export default function ImportDataPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-7xl">

        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold">
            Import Financial Data
          </h1>

          <p className="mx-auto max-w-3xl text-lg text-slate-400">
            Connect your financial world and unlock AI-powered insights.
            Upload statements from banks, credit cards, or UPI platforms
            to generate personalized financial intelligence.
          </p>
        </div>

        <div className="mb-10 overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-slate-900 to-slate-900 p-8 shadow-xl shadow-cyan-950/20">

  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

    <div>
      <div className="mb-3 inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-sm font-medium text-cyan-400">
  STEP 3 OF 4
</div>
      <h2 className="mb-4 text-4xl font-bold">
        Start Building Your Financial Profile
      </h2>

      <p className="max-w-2xl text-slate-300">
        Connect your financial data and let FinSarth AI analyse your spending,
        cash flow, financial habits and growth opportunities.
      </p>
      <div className="mt-6">
  <div className="mb-2 flex items-center justify-between text-sm">
    <span className="text-cyan-400">Onboarding Progress</span>
    <span className="text-slate-400">50%</span>
  </div>

  <div className="h-3 overflow-hidden rounded-full bg-slate-800">
   <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
     </div>

  <div className="mt-4 flex flex-wrap gap-3 text-sm">
    <div className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
      ✅ Account Created
    </div>

    <div className="rounded-full bg-green-500/20 px-3 py-1 text-green-400">
      ✅ Login Complete
    </div>

    <div className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-400">
      ⏳ Import Statement
    </div>

    <div className="rounded-full bg-slate-800 px-3 py-1 text-slate-400">
      📊 Dashboard Ready
    </div>
  </div>
</div>
    </div>

    <button
      onClick={() => router.push("/upload-pdf")}
      className="rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-black transition hover:bg-cyan-400"
    >
      Upload First Statement
    </button>

  </div>

  <div className="mt-8 grid gap-4 md:grid-cols-3">

    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <p className="mb-2 text-lg font-semibold">
        📊 Spending Analytics
      </p>
      <p className="text-sm text-slate-400">
        Understand where your money goes every month.
      </p>
    </div>

    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <p className="mb-2 text-lg font-semibold">
        🧠 AI Insights
      </p>
      <p className="text-sm text-slate-400">
        Receive personalized financial recommendations.
      </p>
    </div>

    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <p className="mb-2 text-lg font-semibold">
        ❤️ Financial Health
      </p>
      <p className="text-sm text-slate-400">
        Track financial wellness and improvement areas.
      </p>
    </div>
  </div>
</div>
<div className="mb-8 rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-3">
  <div className="flex flex-wrap items-center justify-center gap-4 text-sm">

    <span className="font-medium text-green-400">
      🔒 Secure & Private
    </span>

    <span className="flex items-center gap-1 text-slate-300">
      🛡️ Encrypted Storage
    </span>

    <span className="flex items-center gap-1 text-slate-300">
      🔑 Secure Authentication
    </span>

    <span className="flex items-center gap-1 text-slate-300">
      👤 Private Data
    </span>

    <span className="flex items-center gap-1 text-slate-300">
      🧠 AI Insights
    </span>

  </div>
</div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-3 text-2xl font-bold">
              🏦 Bank Statement
            </h2>

            <p className="mb-4 text-slate-400">
              Upload PDF statements from any bank.
            </p>

            <div className="mb-6 space-y-2 text-sm text-slate-300">
              <p>✅ Savings Accounts</p>
              <p>✅ Current Accounts</p>
              <p>✅ Salary Accounts</p>
              <p>✅ Joint Accounts</p>
              <p>✅ Most Indian Banks Supported</p>
            </div>

            <button
              onClick={() => router.push("/upload-pdf")}
              className="w-full rounded-xl bg-cyan-500 p-3 font-semibold text-black"
            >
              Connect Statement
            </button>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-3 text-2xl font-bold">
              💳 Credit Card Statement
            </h2>

            <p className="mb-4 text-slate-400">
              Upload statements from any credit card provider.
            </p>

            <div className="mb-6 space-y-2 text-sm text-slate-300">
              <p>✅ Visa Cards</p>
              <p>✅ Mastercard</p>
              <p>✅ RuPay Cards</p>
              <p>✅ American Express</p>
              <p>✅ Most Credit Cards Supported</p>
            </div>

            <button
              onClick={() => router.push("/upload-pdf")}
              className="w-full rounded-xl bg-cyan-500 p-3 font-semibold text-black"
            >
              Connect Statement
            </button>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-3 text-2xl font-bold">
              📱 UPI Statement
            </h2>

            <p className="mb-4 text-slate-400">
              Upload transaction history from any UPI platform.
            </p>

            <div className="mb-6 space-y-2 text-sm text-slate-300">
              <p>✅ UPI Payments</p>
              <p>✅ UPI Transfers</p>
              <p>✅ Merchant Payments</p>
              <p>✅ QR Transactions</p>
              <p>✅ Most UPI Platforms Supported</p>
            </div>

            <button
              onClick={() => router.push("/upload-pdf")}
              className="w-full rounded-xl bg-cyan-500 p-3 font-semibold text-black"
            >
              Connect Statement
            </button>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-3 text-2xl font-bold">
              📈 Investments
            </h2>

            <p className="mb-4 text-slate-400">
              Import investment reports and portfolio holdings.
            </p>

            <div className="rounded-xl bg-slate-800 p-3 text-center text-yellow-400">
              Coming Soon
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-3 text-2xl font-bold">
              💰 Loans
            </h2>

            <p className="mb-4 text-slate-400">
              Import loan statements and EMI schedules.
            </p>

            <div className="rounded-xl bg-slate-800 p-3 text-center text-yellow-400">
              Coming Soon
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-3 text-2xl font-bold">
              👛 Digital Wallets
            </h2>

            <p className="mb-4 text-slate-400">
              Import wallet transaction reports and balances.
            </p>

            <div className="rounded-xl bg-slate-800 p-3 text-center text-yellow-400">
              Coming Soon
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}