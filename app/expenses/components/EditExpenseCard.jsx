"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EditExpenseCard = ({
  formData,
  setFormData,
  handleChange,
  handleUpdate,
  setEditingField,
}) => {
  return (
    <Card className="rounded-3xl border border-slate-700 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
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
            <SelectItem value="Other">📦 Other</SelectItem>
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
  );
};

export default EditExpenseCard;