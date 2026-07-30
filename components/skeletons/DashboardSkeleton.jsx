import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-8">

      <Skeleton className="mb-8 h-10 w-72 bg-slate-700" />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-slate-700 bg-white/10 p-6"
          >
            <Skeleton className="mb-5 h-5 w-24 bg-slate-700" />
            <Skeleton className="h-10 w-32 bg-slate-700" />
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-3xl border border-slate-700 bg-white/10 p-8">
        <Skeleton className="mb-6 h-8 w-56 bg-slate-700" />
        <Skeleton className="h-80 w-full bg-slate-700" />
      </div>

    </div>
  );
}