import { Skeleton } from "../ui/skeleton";

const PaginationSkeleton = () => {
  return (
    <div className="mt-10 flex justify-center items-center gap-5">
      <Skeleton className="h-10 w-28 rounded-xl bg-slate-700" />
      <Skeleton className="h-6 w-16 bg-slate-700" />
      <Skeleton className="h-10 w-28 rounded-xl bg-slate-700" />
    </div>
  );
};

export default PaginationSkeleton;