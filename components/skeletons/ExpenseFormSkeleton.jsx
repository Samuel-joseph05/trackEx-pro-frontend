import { Skeleton } from "@/components/ui/skeleton";

export default function ExpenseFormSkeleton() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-5">

      <div className="w-full max-w-lg rounded-3xl border border-slate-700 bg-white/10 p-8">

        <Skeleton className="mx-auto mb-8 h-8 w-48 bg-slate-700" />

        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="mb-5">

            <Skeleton className="mb-2 h-4 w-24 bg-slate-700" />

            <Skeleton className="h-11 w-full bg-slate-700" />

          </div>
        ))}

        <Skeleton className="mt-8 h-12 w-full bg-slate-700" />

      </div>

    </main>
  );
}