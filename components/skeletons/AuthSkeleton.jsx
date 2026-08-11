import { Skeleton } from "@/components/ui/skeleton";

export default function AuthSkeleton() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">

      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-white/10 p-8">

        <Skeleton className="mx-auto h-12 w-52 bg-slate-700" />

        <Skeleton className="mx-auto mt-3 h-4 w-40 bg-slate-700" />

        <div className="mt-10 space-y-5">

          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className="h-11 w-full bg-slate-700"
            />
          ))}

        </div>

        <Skeleton className="mt-8 h-11 w-full bg-slate-700" />

      </div>

    </main>
  );
}