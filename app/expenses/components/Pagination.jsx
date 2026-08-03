"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="mt-10 flex justify-center items-center gap-4">
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-white/10 px-5 py-2.5 text-white backdrop-blur-xl transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft size={18} />
        Previous
      </button>

      <span className="text-white font-medium">
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-white/10 px-5 py-2.5 text-white backdrop-blur-xl transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Next
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;