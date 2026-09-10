export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to Finsarth AI
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Monthly Spending</p>
          <h2 className="text-3xl font-bold">₹0</h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Transactions</p>
          <h2 className="text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800">
          <p className="text-slate-400">Top Category</p>
          <h2 className="text-3xl font-bold">N/A</h2>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-slate-900 p-6 border border-slate-800">
        <h2 className="text-2xl font-bold mb-3">
          AI Insight
        </h2>

        <p className="text-slate-400">
          Upload transactions to start receiving AI-powered spending insights.
        </p>
      </div>
    </main>
  );
}