"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Calendar,
  IndianRupee,
  Tag,
} from "lucide-react";

import DeleteExpenseDialog from "./DeleteExpenseDialog";

const ExpenseCard = ({
  expense,
  handleEdit,
  handleDelete,
}) => {
  return (
    <Card
      className="group overflow-hidden rounded-3xl border border-slate-700 bg-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500 hover:shadow-[0_20px_60px_rgba(79,70,229,0.35)]"
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {expense.title}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Expense Record
            </p>
          </div>

          <Badge className="rounded-full bg-indigo-500 text-white px-4 py-2 text-sm font-semibold">
            {expense.category}
          </Badge>
        </div>

        <div className="my-8 flex items-center gap-3">
          <div className="rounded-xl bg-emerald-500/20 p-3">
            <IndianRupee
              size={22}
              className="text-emerald-400"
            />
          </div>

          <span className="text-4xl font-bold text-emerald-400">
            {expense.amount}
          </span>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-slate-800/60 p-3">
            <Tag
              size={18}
              className="text-blue-400"
            />

            <span className="text-slate-300">
              {expense.category}
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-slate-800/60 p-3">
            <Calendar
              size={18}
              className="text-pink-400"
            />

            <span className="text-slate-300">
              {new Date(expense.date).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <DeleteExpenseDialog
            expense={expense}
            handleDelete={handleDelete}
          />

          <Button
            className="h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700"
            onClick={() => handleEdit(expense)}
          >
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCard;