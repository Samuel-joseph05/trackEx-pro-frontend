import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";


const ExpenseCardSkeleton = () => {
  return (
    <Card className="rounded-3xl border border-slate-700 bg-white/10 backdrop-blur-xl">
      <CardContent className="space-y-5 p-6">
        <div className="flex justify-between">
          <div>
            <Skeleton className="h-7 w-36 bg-slate-700" />
            <Skeleton className="mt-3 h-4 w-24 bg-slate-700" />
          </div>

          <Skeleton className="h-7 w-20 rounded-full bg-slate-700" />
        </div>

        <Skeleton className="h-12 w-40 bg-slate-700" />

        <Skeleton className="h-12 rounded-xl bg-slate-700" />
        <Skeleton className="h-12 rounded-xl bg-slate-700" />

        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-11 rounded-xl bg-slate-700" />
          <Skeleton className="h-11 rounded-xl bg-slate-700" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseCardSkeleton;