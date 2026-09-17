"use client";

export default function AddTransaction() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Add Transaction
      </h1>

      <form className="max-w-lg space-y-4">

        <input
          type="date"
          className="w-full rounded-lg p-3 text-black"
        />

        <input
          placeholder="Merchant"
          className="w-full rounded-lg p-3 text-black"
        />

        <input
          placeholder="Amount"
          type="number"
          className="w-full rounded-lg p-3 text-black"
        />

        <select
          className="w-full rounded-lg p-3 text-black"
        >
          <option>Food</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        <button
          className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-black"
        >
          Add Transaction
        </button>

      </form>
    </main>
  );
}