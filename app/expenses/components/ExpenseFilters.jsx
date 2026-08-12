"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import React from "react";

const ExpenseFilters = ({  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,}) => {

  return (
   <div className="w-full py-6">
  <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
    {/* Search */}
    <Input
      placeholder="Search expenses..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-white placeholder:text-slate-400 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:max-w-md"
    />

    {/* Filters */}
    <div className="flex w-full gap-3 sm:w-auto">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="h-12 flex-1 text-white sm:w-44 sm:flex-none">
          <SelectValue placeholder="Category" />
        </SelectTrigger>

        <SelectContent className="bg-slate-700 text-white">
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Food">Food</SelectItem>
          <SelectItem value="Transport">Transport</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
          <SelectItem value="Bills">Bills</SelectItem>
          <SelectItem value="Health">Health</SelectItem>
          <SelectItem value="Entertainment">Entertainment</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className="h-12 flex-1 text-white sm:w-44 sm:flex-none">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>

        <SelectContent className="bg-slate-700 text-white">
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="highest">Highest Amount</SelectItem>
          <SelectItem value="lowest">Lowest Amount</SelectItem>
          <SelectItem value="az">A → Z</SelectItem>
          <SelectItem value="za">Z → A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</div>
  );
};

export default ExpenseFilters;
