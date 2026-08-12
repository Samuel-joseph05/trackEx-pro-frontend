"use client"

import Link from "next/link";
import { ArrowRight, PieChart, ShieldCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("token");
  setIsLoggedIn(!!token);
}, []);


  return (
    <main className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background */}

      <div className="absolute inset-0 -z-10 bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900" />

      <div className="absolute -top-44 left-0 h-96 w-96 rounded-full bg-blue-500/30 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/30 blur-[160px]" />

      {/* Hero */}

      <section className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pb-16 pt-20 text-center md:pt-28">
        <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300">
          Personal Finance Made Simple
        </span>

        <h1 className="mt-8 max-w-4xl text-5xl font-extrabold leading-tight text-white md:text-7xl">
          Control Every
          <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {" "}
            Rupee{" "}
          </span>
          You Spend
        </h1>
        <p className="mt-6 max-w-2xl px-2 text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Track your daily expenses, organize spending by category, visualize
          your financial habits, and stay in control with a clean, modern
          dashboard.
        </p>

        <div className="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          {isLoggedIn ? (
            <Link href="/dashboard">
              <Button
                size="lg"
                className="w-full rounded-xl bg-blue-600 px-8 hover:bg-blue-700 sm:w-auto"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full rounded-xl bg-blue-600 px-8 hover:bg-blue-700 sm:w-auto"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-xl border-slate-600 bg-transparent px-8 text-white hover:bg-white/10 sm:w-auto"
                >
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </section>

      {/* Feature Cards */}

      <section className="relative z-20 mx-auto mt-16 grid max-w-6xl gap-8 px-6 pb-20 md:grid-cols-3">
        <Card className="rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20">
              <TrendingUp className="text-cyan-400" />
            </div>

            <h3 className="text-xl font-semibold text-white">
              Expense Insights
            </h3>

            <p className="mt-3 text-slate-400">
              Understand where your money goes with categorized spending and
              monthly summaries.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20">
              <PieChart className="text-violet-400" />
            </div>

            <h3 className="text-xl font-semibold text-white">
              Category Tracking
            </h3>

            <p className="mt-3 text-slate-400">
              Organize expenses by Food, Shopping, Bills, Transport and much
              more.
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20">
              <ShieldCheck className="text-emerald-400" />
            </div>

            <h3 className="text-xl font-semibold text-white">Secure Account</h3>

            <p className="mt-3 text-slate-400">
              JWT-based authentication helps protect your account and personal
              expense data.
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
