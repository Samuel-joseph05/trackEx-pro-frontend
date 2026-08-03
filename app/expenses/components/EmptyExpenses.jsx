"use client";


const EmptyExpenses = () => {
  return (
    <div>
        <div className="rounded-3xl border border-slate-700 bg-slate-900/60 backdrop-blur-xl p-16 text-center">
            <h2 className="text-2xl font-semibold text-white">
              No Expenses Found
            </h2>
            <p className="mt-2 text-slate-400">
              Add your first expense to start tracking.
            </p>
          </div>
    </div>
  )
}

export default EmptyExpenses;
