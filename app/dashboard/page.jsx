"use client";

import Link from "next/link";
import {
  Wallet,
  Calendar,
  Receipt,
  Tag,
  Plus,
  IndianRupee,
  LogOut,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { getDashboard, getMonthlySummary } from "@/api/Expense";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
const [monthlySummary, setMonthlySummary] = useState([]);
  const router=useRouter();


const chartData = monthlySummary.map((item) => ({
  month: `${item.month} ${item.year}`,
  total: item.total,
}));
  const cards = [
    {
      title: "Total Expenses",
      value: `₹${dashboard?.totalExpenses ?? 0}`,
      icon: Wallet,
      color: "bg-emerald-500/20 text-emerald-400",
    },
    {
      title: "This Month",
      value: `₹${dashboard?.thisMonthExpenses ?? 0}`,
      icon: Calendar,
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Transactions",
      value: dashboard?.totalTransaction ?? 0,
      icon: Receipt,
      color: "bg-orange-500/20 text-orange-400",
    },
    {
      title: "Categories",
      value: dashboard?.categories ?? 0,
      icon: Tag,
      color: "bg-pink-500/20 text-pink-400",
    },
  ];

 

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login"); // Redirect to login page after logout use replace to prevent going back to the previous page(protected page) using the back button
  };


//   const fetchMonthlySummary = async () => {
//   try {
//     const data = await getMonthlySummary();
//     console.log(data);

//     setMonthlySummary(data);
//   } catch (err) {
//     console.log(err);
//   }
// };


useEffect(() => {
  const load = async () => {
    try {
      const dashboard = await getDashboard();
      setDashboard(dashboard);

      const summary = await getMonthlySummary();
      setMonthlySummary(summary);
      console.log(summary);
    } catch (err) {
      console.error(err);
    }
  };

  load();
}, []);



   // Check if user is logged in, if not redirect to login page 
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    // toast.error("Login first");
    router.replace("/login");
  }
}, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Header */}

        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white">Expense Dashboard</h1>

            <p className="mt-2 text-slate-400">
              Track your spending and manage your finances.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link href="/expenses">
              <Button className="rounded-xl bg-indigo-600 px-6 py-6 text-base hover:bg-indigo-700">
                <Plus className="mr-2 h-5 w-5" />
                Add Expense
              </Button>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 font-semibold text-white transition hover:bg-red-700"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Cards */}

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Card
                key={card.title}
                className="rounded-3xl border border-slate-700 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(79,70,229,0.35)]"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400">{card.title}</p>

                      <h2 className="mt-3 text-3xl font-bold text-white">
                        {card.value}
                      </h2>
                    </div>

                    <div className={`rounded-2xl p-4 ${card.color}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

 <div className="mt-10 rounded-3xl border border-slate-700 bg-white/10 p-8 shadow-[0_20px_50px_rgba(79,70,229,0.25)] backdrop-blur-xl">

  {/* Header */}
  <div className="mb-8 flex items-center justify-between">

    <div>
      <h2 className="text-2xl font-bold text-white">
        Monthly Expense Analytics
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Track your monthly spending trends.
      </p>
    </div>

  </div>

  {/* Chart */}
  <div className="h-80">

    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>

        <CartesianGrid
          stroke="#475569"
          strokeDasharray="4 4"
        />

        <XAxis
          dataKey="month"
          tick={{ fill: "#cbd5e1", fontSize: 12 }}
          axisLine={{ stroke: "#64748b" }}
          tickLine={{ stroke: "#64748b" }}
        />

        <YAxis
          tick={{ fill: "#cbd5e1", fontSize: 12 }}
          axisLine={{ stroke: "#64748b" }}
          tickLine={{ stroke: "#64748b" }}
        />

        <Tooltip
          cursor={{ fill: "rgba(99,102,241,0.15)" }}
          contentStyle={{
            backgroundColor: "#0f172a",
            border: "1px solid #334155",
            borderRadius: "12px",
            color: "#fff",
          }}
          labelStyle={{
            color: "#fff",
            fontWeight: "bold",
          }}
          formatter={(value) => [`₹${value}`, "Expense"]}
        />

        <Bar
          dataKey="total"
          fill="#6366f1"
          radius={[10, 10, 0, 0]}
        />

      </BarChart>
    </ResponsiveContainer>

  </div>

</div>

 {/* Table */}
<div className="mt-8 rounded-xl  border border-slate-700 bg-white/10 backdrop-blur-xl p-6 shadow text-white">
  <h2 className="mb-4 text-xl font-semibold">
    Monthly Summary
  </h2>

  <table className="w-full">
    <thead>
      <tr className="border-b">
        <th className="py-3 text-left">
          Month
        </th>

        <th className="py-3 text-right">
          Total Expense
        </th>
      </tr>
    </thead>

    <tbody>
      {monthlySummary.map((item, index) => (
        <tr key={index} className="border-b hover:bg-slate-700 transition">
          <td className="py-3">
            {item.month} {item.year}
          </td>

          <td className="py-3 text-right font-bold text-blue-600">
            ₹{item.total}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
        {/* Quick Summary */}

        <Card className="mt-10 rounded-3xl border border-slate-700 bg-white/10 backdrop-blur-xl">
          <CardContent className="p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">
              Financial Overview
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-800/60 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-emerald-500/20 p-3">
                    <IndianRupee className="text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-slate-400">Total Spending</p>

                    <h3 className="text-3xl font-bold text-emerald-400">
                      ₹{dashboard?.totalExpenses ?? 0}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-800/60 p-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-indigo-500/20 p-3">
                    <Calendar className="text-indigo-400" />
                  </div>

                  <div>
                    <p className="text-slate-400">Monthly Spending</p>

                    <h3 className="text-3xl font-bold text-indigo-400">
                      ₹{dashboard?.thisMonthExpense ?? 0}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
