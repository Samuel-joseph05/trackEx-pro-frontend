"use client";


import React from 'react'


const DashboardHeader = ({router}) => {
  return (
    <div>
       <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Heading */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Expenses 
            </h1>

            <p className="mt-2 text-sm sm:text-base text-slate-400">
              Manage your daily expenses efficiently.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={() => router.push("/expenseForm")}
              className="w-full sm:w-auto rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-700"
            >
              Add Expense
            </button>
          </div>
        
        </div>
    </div>
  )
}

export default DashboardHeader
