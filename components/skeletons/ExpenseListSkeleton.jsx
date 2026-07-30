import { Skeleton } from "@/components/ui/skeleton";

export default function ExpenseListSkeleton() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-slate-700 bg-white/10 p-6"
        >
          <Skeleton className="mb-4 h-6 w-40 bg-slate-700" />
          <Skeleton className="mb-4 h-10 w-32 bg-slate-700" />
          <Skeleton className="mb-3 h-4 w-28 bg-slate-700" />
          <Skeleton className="mb-6 h-4 w-36 bg-slate-700" />

          <div className="flex gap-3">
            <Skeleton className="h-10 flex-1 bg-slate-700" />
            <Skeleton className="h-10 flex-1 bg-slate-700" />
          </div>
        </div>
      ))}

    </div>
  );
}