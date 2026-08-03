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
    <div>
      <div className="flex justify-center items-center w-full py-6">
        <Input
          placeholder="Search expenses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 text-white placeholder:text-slate-400 px-4 lg:py-6 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-52 px-2 lg:py-6  m-2 text-white">
            <SelectValue />
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
          <SelectTrigger className="w-52 px-2 lg:py-6 text-white">
            <SelectValue />
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
  );
};

export default ExpenseFilters;
