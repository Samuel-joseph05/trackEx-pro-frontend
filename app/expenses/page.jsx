"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, IndianRupee, Tag } from "lucide-react";
import { getExpenses, deleteExpense, UpdateExpense } from "@/api/Expense";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const Page = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });
const router = useRouter();
  //
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (err) {
      console.log("Failed to fetch", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      // alert("Expense deleted successfully");
      toast.success("Expense deleted successfully");
      await fetchExpenses();
    } catch (err) {
      toast.error("Failed to delete expense");
      console.log("Failed to delete expense", err);
    }
  };

  const handleEdit = (expense) => {
    setEditingField(expense._id);

    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      date: expense.date.split("T")[0],
    });
  };

  const handleUpdate = async () => {
    try {
      await UpdateExpense(editingField, formData);
      // alert("Expense Updated Successfully");
      toast.success("Expense Updated Successfully");
      setEditingField(null);

      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    console.log("Fetching expenses");
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 py-12 px-6">
  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="mb-10 flex items-center justify-between">
      <div>
        <h1 className="text-5xl font-bold text-white">
          Expense Dashboard
        </h1>
        <p className="text-slate-400 mt-2">
          Manage your daily expenses efficiently.
        </p>
      </div>
      <div>
      <button
  onClick={() => router.push("/expenseForm")}
  className="w-full sm:w-auto rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
>
  Add Expense
</button>
      </div>
    </div>

    {expenses.length === 0 ? (
      <div className="rounded-3xl border border-slate-700 bg-slate-900/60 backdrop-blur-xl p-16 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No Expenses Found
        </h2>
        <p className="mt-2 text-slate-400">
          Add your first expense to start tracking.
        </p>
      </div>
    ) : (
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {expenses.map((expense) =>
          editingField === expense._id ? (
            <Card
              key={expense._id}
              className="rounded-3xl border border-slate-700 bg-slate-900/80 backdrop-blur-xl shadow-2xl"
            >
              <CardContent className="space-y-5 p-6">

                <h2 className="text-2xl font-bold text-white">
                  Edit Expense
                </h2>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Expense Title"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                />

                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-blue-500"
                />

                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger className="rounded-xl border-slate-700 bg-slate-800 text-white">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="Food">🍔 Food</SelectItem>
                    <SelectItem value="Transport">🚗 Transport</SelectItem>
                    <SelectItem value="Shopping">🛍 Shopping</SelectItem>
                    <SelectItem value="Bills">💡 Bills</SelectItem>
                    <SelectItem value="Health">🏥 Health</SelectItem>
                    <SelectItem value="Entertainment">
                      🎬 Entertainment
                    </SelectItem>
                    <SelectItem value="Other">
                      📦 Other
                    </SelectItem>
                  </SelectContent>
                </Select>

                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
                />

                <div className="flex gap-4">
                  <Button
                    onClick={handleUpdate}
                    className="flex-1 rounded-xl bg-emerald-600 hover:bg-emerald-700"
                  >
                    Save
                  </Button>

                  <Button
                    variant="secondary"
                    className="flex-1 rounded-xl"
                    onClick={() => setEditingField(null)}
                  >
                    Cancel
                  </Button>
                </div>

              </CardContent>
            </Card>
          ) : (
            <Card
              key={expense._id}
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

                  <Badge className="rounded-full bg-indigo-500 text-white px-4 py-1">
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

                <div className="space-y-4">

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
                      {new Date(
                        expense.date
                      ).toLocaleDateString()}
                    </span>
                  </div>

                </div>

                <div className="mt-8 flex gap-4">

                  <Button
                    variant="destructive"
                    className="flex-1 rounded-xl"
                    onClick={() => handleDelete(expense._id)}
                  >
                    Delete
                  </Button>

                  <Button
                    className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => handleEdit(expense)}
                  >
                    Edit
                  </Button>

                </div>

              </CardContent>
            </Card>
          )
        )}
      </div>
    )}
  </div>
</div>
  );
};
export default Page;
