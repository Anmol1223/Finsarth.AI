export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">

        <p className="mb-4 text-cyan-400">
          🚀 Finsarth AI Launching Soon
        </p>

        <h1 className="text-5xl font-bold md:text-7xl">
          Financial Intelligence.
          <br />
          Reimagined.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-400">
          Upload transactions. Understand spending habits.
          Get AI-powered financial insights.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-xl bg-cyan-500 px-8 py-4 font-semibold text-black">
            Join Waitlist
          </button>

          <button className="rounded-xl border border-slate-700 px-8 py-4 font-semibold">
            Login
          </button>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-2 text-xl font-bold">
              Smart Analytics
            </h3>

            <p className="text-slate-400">
              Discover where your money goes.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-2 text-xl font-bold">
              AI Insights
            </h3>

            <p className="text-slate-400">
              Receive personalized financial insights.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="mb-2 text-xl font-bold">
              Financial Health
            </h3>

            <p className="text-slate-400">
              Improve financial decision making.
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}