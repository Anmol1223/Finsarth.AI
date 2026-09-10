export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Transactions
      </h1>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Merchant</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Category</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="p-4">08 Sep 2026</td>
              <td className="p-4">Amazon</td>
              <td className="p-4">₹1,800</td>
              <td className="p-4">Shopping</td>
            </tr>

            <tr>
              <td className="p-4">07 Sep 2026</td>
              <td className="p-4">Uber</td>
              <td className="p-4">₹220</td>
              <td className="p-4">Transport</td>
            </tr>

            <tr>
              <td className="p-4">06 Sep 2026</td>
              <td className="p-4">Starbucks</td>
              <td className="p-4">₹350</td>
              <td className="p-4">Food</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}