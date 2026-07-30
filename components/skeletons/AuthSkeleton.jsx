import { Skeleton } from "../ui/skeleton";


export default function AuthSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">

      <div className="w-full max-w-md rounded-3xl border border-slate-700 bg-white/10 p-8">

        <Skeleton className="mx-auto mb-6 h-16 w-16 rounded-full bg-slate-700" />

        <Skeleton className="mx-auto mb-3 h-8 w-52 bg-slate-700" />

        <Skeleton className="mx-auto mb-8 h-4 w-40 bg-slate-700" />

        {[1, 2].map((i) => (
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