import { Skeleton } from "../ui/skeleton";



const DashboardHeaderSkeleton = () => {
  return (
    <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <Skeleton className="h-10 w-72 rounded-lg bg-slate-700" />
        <Skeleton className="mt-3 h-5 w-56 rounded-lg bg-slate-700" />
      </div>

      <Skeleton className="h-11 w-40 rounded-xl bg-slate-700" />
    </div>
  );
};

export default DashboardHeaderSkeleton;