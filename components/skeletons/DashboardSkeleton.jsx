import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-6">

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div>
            <Skeleton className="h-10 w-72 bg-slate-700" />
            <Skeleton className="mt-3 h-4 w-52 bg-slate-700" />
          </div>
          <div className="flex gap-4">
          <Skeleton className="h-12 w-35 rounded-xl bg-slate-700" />
          <Skeleton className="h-12 w-35 rounded-xl bg-slate-700" />
</div>
        </div>

        {/* Dashboard Cards */}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-700 bg-white/10 p-6"
            >
              <Skeleton className="mb-4 h-5 w-28 bg-slate-700" />
              <Skeleton className="h-8 w-32 bg-slate-700" />
            </div>
          ))}

        </div>

        {/* Chart */}

        <div className="mt-10 rounded-3xl border border-slate-700 bg-white/10 p-8">

          <Skeleton className="mb-6 h-7 w-60 bg-slate-700" />

          <Skeleton className="h-80 w-full bg-slate-700" />

        </div>

      </div>

    </main>
  );
}