"use client";

import { useState } from "react";
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

export default function ExpenseForm() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const [errors, setErrors] = useState({});

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
      alert("Expense added");
      setForm({
        title: "",
        amount: "",
        category: "",
        date: "",
      });
    } catch (error) {
      console.error(error);
      console.log(error.response?.data);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center p-5">
      <Card className="w-full max-w-lg rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center">Add Expense</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}

            <div>
              <Label>Title</Label>

              <Input
                name="title"
                placeholder="Petrol"
                value={form.title}
                onChange={handleChange}
              />

              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            </div>

            {/* Amount */}

            <div>
              <Label>Amount</Label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-3 top-3 text-gray-500"
                />

                <Input
                  type="number"
                  name="amount"
                  placeholder="500"
                  value={form.amount}
                  onChange={handleChange}
                  className="pl-9"
                />
              </div>

              <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
            </div>

            {/* Category */}

            <div>
              <Label>Category</Label>

              <Select
                value={form.category}
                onValueChange={(value) => setForm({ ...form, category: value })}
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

              <p className="text-red-500 text-sm mt-1">{errors.category}</p>
            </div>

            {/* Date */}

            <div>
              <Label>Date</Label>

              <Input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />

              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            </div>

            <Button type="submit" className="w-full h-11 rounded-xl">
              Add Expense
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
