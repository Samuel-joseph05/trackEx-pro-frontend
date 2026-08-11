"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getExpenses,
  deleteExpense,
  UpdateExpense,
} from "@/api/Expense";

export default function useExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [editingField, setEditingField] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses(
        search,
        category,
        sort,
        page
      );

      setExpenses(data.expenses);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);

      toast.success("Expense deleted successfully");

      fetchExpenses();
    } catch (err) {
      toast.error("Failed to delete expense");
      console.log(err);
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

      toast.success("Expense Updated Successfully");

      setEditingField(null);

      fetchExpenses();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [search, category, sort, page]);

  return {
    expenses,
    editingField,
    formData,
   
    search,
    category,
    sort,

    page,
    totalPages,

    setSearch,
    setCategory,
    setSort,

    setPage,

     setLoading,
     
    setFormData,
    setEditingField,

    handleDelete,
    handleEdit,
    handleUpdate,
    handleChange,
  };
}