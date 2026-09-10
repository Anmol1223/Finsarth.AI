export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="mb-8 text-4xl font-bold">
        AI Insights
      </h1>

      <div className="space-y-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="font-bold">
            Spending Trend
          </h2>

          <p>
            You spent 18% more on dining this month.
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="font-bold">
            Savings Opportunity
          </h2>

          <p>
            Reducing dining expenses by 15% could save
            approximately ₹3,500 per month.
          </p>
        </div>
      </div>
    </main>
  );
}