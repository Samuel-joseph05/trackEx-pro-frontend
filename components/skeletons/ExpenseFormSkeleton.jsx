import { Skeleton } from "@/components/ui/skeleton";

export default function ExpenseFormSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">

      <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-white/10 p-8">

        <Skeleton className="mx-auto mb-8 h-8 w-56 bg-slate-700" />

        {[1, 2, 3, 4].map((i) => (
          <Skeleton
            key={i}
            className="mb-5 h-12 w-full bg-slate-700"
          />
        ))}

        <Skeleton className="mt-6 h-12 w-full bg-slate-700" />

      </div>

    </div>
  );
}