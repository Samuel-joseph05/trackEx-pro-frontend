"use client";

import { motion } from "motion/react";
import DashboardHeader from "./components/DashboardHeader";
import ExpenseFilters from "./components/ExpenseFilters";
import ExpenseGrid from "./components/ExpenseGrid";
import EmptyExpenses from "./components/EmptyExpenses";
import Pagination from "./components/Pagination";

import { useEffect } from "react";

import { useRouter } from "next/navigation";
import useExpenses from "./components/hooks/useExpenses";
import Loading from "./loading";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ExpenseGridSkeleton from "@/components/skeletons/ExpenseGridSkeleton";

const Page = () => {
  const {
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

    isInitialLoading,
    isFetching,

    setFormData,
    setEditingField,

    handleDelete,
    handleEdit,
    handleUpdate,
    handleChange,
  } = useExpenses();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  if (isInitialLoading) {
    return <Loading />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950  px-6 py-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="gap-2 text-slate-300 hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
        </div>
        <DashboardHeader router={router} />
        <ExpenseFilters
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
        />

        {isFetching ? (
          <ExpenseGridSkeleton />
        ) : expenses.length === 0 ? (
          <EmptyExpenses />
        ) : (
          <>
            <ExpenseGrid
              expenses={expenses}
              editingField={editingField}
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              handleUpdate={handleUpdate}
              setEditingField={setEditingField}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />

            <Pagination page={page} totalPages={totalPages} setPage={setPage} />
          </>
        )}
      </div>
    </motion.div>
  );
};
export default Page;
