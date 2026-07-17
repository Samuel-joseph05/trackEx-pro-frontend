"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, IndianRupee, Tag } from "lucide-react";
import { getExpenses, deleteExpense, UpdateExpense } from "@/api/Expense";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Page = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

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
      alert("Expense deleted successfully");
      await fetchExpenses();
    } catch (err) {
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
      alert("Expense Updated Successfull");
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Expenses</h1>

      {expenses.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No expenses found.
        </div>
      ) : (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {expenses.map((expense) =>
            editingField === expense._id ? (
              <Card key={expense._id}>
                <CardContent className="space-y-4 p-5">
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />

                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />

                  <Label>Category</Label>

                  <Select
                    value={form.category}
                    onValueChange={(value) =>
                      setForm({ ...form, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
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
                      <SelectItem value="Other">📦 Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingField(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card
                key={expense._id}
                className="hover:shadow-xl transition-all duration-300 rounded-2xl"
              >
                <CardContent className="p-5 space-y-4">
                  {/* Title */}
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">{expense.title}</h2>

                    <Badge variant="secondary">{expense.category}</Badge>
                  </div>

                  {/* Amount */}
                  <div className="flex items-center gap-2 text-green-600 font-bold text-2xl">
                    <IndianRupee size={20} />
                    {expense.amount}
                  </div>

                  {/* Category */}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Tag size={16} />
                    <span>{expense.category}</span>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar size={16} />
                    <span>{new Date(expense.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => handleDelete(expense._id)}
                      className="rounded-lg bg-red-600 px-5 py-2.5 text-white font-medium shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg active:scale-95"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleEdit(expense)}
                      className="rounded-lg bg-blue-600 px-5 py-2.5 text-white"
                    >
                      Edit
                    </button>
                  </div>
                </CardContent>
              </Card>
            ),
          )}
        </div>
      )}
    </div>
  );
};
export default Page;
