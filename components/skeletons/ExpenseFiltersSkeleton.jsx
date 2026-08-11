import { Skeleton } from "../ui/skeleton";

const ExpenseFiltersSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3 py-6">
      <Skeleton className="h-12 w-full max-w-md rounded-xl bg-slate-700" />
      <Skeleton className="h-12 w-52 rounded-xl bg-slate-700" />
      <Skeleton className="h-12 w-52 rounded-xl bg-slate-700" />
    </div>
  );
};

export default ExpenseFiltersSkeleton;