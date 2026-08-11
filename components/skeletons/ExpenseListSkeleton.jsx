import { Skeleton } from "@/components/ui/skeleton";

export default function ExpenseListSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6">

      <div className="mx-auto max-w-7xl">

        <Skeleton className="mb-8 h-10 w-56 bg-slate-700" />

        {/* Search */}

        <Skeleton className="mb-6 h-12 w-full bg-slate-700" />

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {Array.from({ length: 6 }).map((_, index) => (

            <div
              key={index}
              className="rounded-3xl border border-slate-700 bg-white/10 p-6"
            >

              <Skeleton className="mb-4 h-6 w-40 bg-slate-700" />

              <Skeleton className="mb-5 h-9 w-28 bg-slate-700" />

              <Skeleton className="mb-3 h-4 w-24 bg-slate-700" />

              <Skeleton className="mb-6 h-4 w-36 bg-slate-700" />

              <div className="flex gap-3">

                <Skeleton className="h-10 flex-1 bg-slate-700" />

                <Skeleton className="h-10 flex-1 bg-slate-700" />

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}