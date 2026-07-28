"use client";

import { useEffect, useState } from "react";
import { IndianRupee } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createExpense } from "@/api/Expense";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function ExpenseForm() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const router= useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!form.amount) {
      newErrors.amount = "Amount is required";
    } else if (Number(form.amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
    }

    if (!form.category) {
      newErrors.category = "Select a category";
    }

    if (!form.date) {
      newErrors.date = "Select a date";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    console.log(form);

    try {
      const data = await createExpense(form);
      console.log(data);
      // alert("Expense added");
      toast.success("Expense added successfully");
      setForm({
        title: "",
        amount: "",
        category: "",
        date: "",
      });
      router.push("/expenses");
    } catch (error) {
      console.error(error);
      console.log(error.response?.data);
    }
  };


  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      router.replace("/login")// if user is not logged in, redirect to login page
    }//replace is used instead of push to prevent user from going back to the previous page using the back button
  },[router])// it will run only once when the component mounts, and it will not run again unless the router changes. This is useful for checking if the user is authenticated when they first visit the page.


  return (
   <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center px-6 py-10">
  <Card className="w-full max-w-xl rounded-3xl border border-slate-700 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(79,70,229,0.35)]">
    <CardHeader className="space-y-3 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/20">
        <IndianRupee className="h-8 w-8 text-indigo-400" />
      </div>

      <CardTitle className="text-4xl font-bold text-white">
        Add Expense
      </CardTitle>

      <p className="text-slate-400">
        Keep track of every rupee you spend.
      </p>
    </CardHeader>

    <CardContent>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Title */}
        <div className="space-y-2">
          <Label className="text-slate-300">Title</Label>

          <Input
            name="title"
            placeholder="Petrol"
            value={form.title}
            onChange={handleChange}
            className="h-12 rounded-xl border-slate-700 bg-slate-900/70 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500"
          />

          {errors.title && (
            <p className="text-sm text-red-400">{errors.title}</p>
          )}
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label className="text-slate-300">Amount</Label>

          <div className="relative">
            <IndianRupee
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400"
            />

            <Input
              type="number"
              name="amount"
              placeholder="500"
              value={form.amount}
              onChange={handleChange}
              className="h-12 rounded-xl border-slate-700 bg-slate-900/70 pl-10 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
          </div>

          {errors.amount && (
            <p className="text-sm text-red-400">{errors.amount}</p>
          )}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-slate-300">Category</Label>

          <Select
            value={form.category}
            onValueChange={(value) =>
              setForm({ ...form, category: value })
            }
          >
            <SelectTrigger className="h-12 rounded-xl border-slate-700 bg-slate-900/70 text-white">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>

            <SelectContent className="border-slate-700 bg-slate-900 text-white">
              <SelectItem value="Food">🍔 Food</SelectItem>
              <SelectItem value="Transport">🚗 Transport</SelectItem>
              <SelectItem value="Shopping">🛍 Shopping</SelectItem>
              <SelectItem value="Bills">💡 Bills</SelectItem>
              <SelectItem value="Health">🏥 Health</SelectItem>
              <SelectItem value="Entertainment">
                🎬 Entertainment
              </SelectItem>
              <SelectItem value="Other">📦 Other</SelectItem>
            </SelectContent>
          </Select>

          {errors.category && (
            <p className="text-sm text-red-400">{errors.category}</p>
          )}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label className="text-slate-300">Date</Label>

          <Input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="h-12 rounded-xl border-slate-700 bg-slate-900/70 text-white focus-visible:ring-2 focus-visible:ring-indigo-500"
          />

          {errors.date && (
            <p className="text-sm text-red-400">{errors.date}</p>
          )}
        </div>

     <div className="space-y-4">
  <Button
    type="submit"
    className="h-12 w-full rounded-xl bg-indigo-600 text-lg font-semibold transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95"
  >
    Add Expense
  </Button>

  <Link
    href="/expenses"
    className="flex h-12 w-full items-center justify-center rounded-xl border border-green-600 text-lg font-semibold text-indigo-600 transition-all duration-300 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95"
  >
    Show Expenses
  </Link>
</div>
      </form>
    </CardContent>
  </Card>
</main>
  );
}
