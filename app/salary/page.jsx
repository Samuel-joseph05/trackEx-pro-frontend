
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getSalary, saveSalary } from "@/api/Salary";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function SalarySettingsPage() {
  const router = useRouter();

  const today = new Date();

  const [month, setMonth] = useState(String(today.getMonth() + 1));
  const [year, setYear] = useState(String(today.getFullYear()));
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Redirect to login if the user is not logged in.
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/login");
    }
  }, [router]);

  // Load the salary whenever the selected month or year changes.
  useEffect(() => {
    let cancelled = false;

    const loadSalary = async () => {
      setLoading(true);
      setMessage("");
      setError("");
      setAmount("");

      try {
        const data = await getSalary(Number(month), Number(year));

        if (!cancelled) {
          setAmount(
            data.salary ? String(data.salary.amount) : ""
          );
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message ||
              "Unable to load salary. Check your connection and try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadSalary();

    return () => {
      cancelled = true;
    };
  }, [month, year]);

  const handleSave = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const numericYear = Number(year);
    const numericAmount = Number(amount);

    if (
      !Number.isInteger(numericYear) ||
      numericYear < 2000 ||
      numericYear > 9999
    ) {
      setError("Enter a valid year between 2000 and 9999.");
      return;
    }

    if (
      amount.trim() === "" ||
      !Number.isFinite(numericAmount) ||
      numericAmount < 0
    ) {
      setError("Enter a valid salary amount of ₹0 or more.");
      return;
    }

    setSaving(true);

    try {
      const data = await saveSalary(
        Number(month),
        numericYear,
        numericAmount
      );

      setAmount(String(data.salary.amount));
      setMessage("Salary saved successfully.");
      router.push("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to save salary. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 px-5 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/dashboard"
          className="mb-8 inline-flex items-center gap-2 text-slate-300 transition hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
            <Wallet size={28} />
          </div>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Monthly Salary Settings
          </h1>

          <p className="mt-3 text-slate-400">
            Set your salary for each month to track how much
            money remains after expenses.
          </p>
        </div>

        <section className="rounded-3xl border border-slate-700 bg-white/10 p-6 shadow-xl backdrop-blur-xl sm:p-8">
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="month"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Select Month
                </label>

                <select
                  id="month"
                  value={month}
                  onChange={(event) => setMonth(event.target.value)}
                  className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-indigo-400"
                >
                  {months.map((monthName, index) => (
                    <option key={monthName} value={index + 1}>
                      {monthName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="year"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Year
                </label>

                <input
                  id="year"
                  type="number"
                  min="2000"
                  max="9999"
                  step="1"
                  value={year}
                  onChange={(event) => setYear(event.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white outline-none focus:border-indigo-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="amount"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Monthly Salary (₹)
              </label>

              <input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="Enter monthly salary, e.g. 40000"
                required
                className="w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-4 text-lg text-white outline-none placeholder:text-slate-500 focus:border-indigo-400"
              />

              <p className="mt-2 text-sm text-slate-400">
                The salary is stored separately for each month and year.
              </p>
            </div>

            {loading && (
              <p className="text-sm text-slate-300">
                Loading saved salary...
              </p>
            )}

            {message && (
              <p
                role="status"
                className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-emerald-300"
              >
                {message}
              </p>
            )}

            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-300"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || saving}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={18} />
              {saving ? "Saving..." : "Save Monthly Salary"}
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/60 p-5">
            <p className="text-sm text-slate-400">
              Selected period
            </p>

            <h2 className="mt-1 text-xl font-semibold">
              {months[Number(month) - 1]} {year || ""}
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              After saving your salary, the next step is to
              display your remaining monthly budget on the dashboard.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
