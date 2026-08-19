import DashboardHeaderSkeleton from "@/components/skeletons/DashboardHeaderSkeleton";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";
import ExpenseCardSkeleton from "@/components/skeletons/ExpenseCardSkeleton";
import ExpenseFiltersSkeleton from "@/components/skeletons/ExpenseFiltersSkeleton";
import ExpenseGridSkeleton from "@/components/skeletons/ExpenseGridSkeleton";
import ExpenseListSkeleton from "@/components/skeletons/ExpenseListSkeleton";
import PaginationSkeleton from "@/components/skeletons/PaginationSkeleton";

const Loading = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeaderSkeleton />
        <ExpenseFiltersSkeleton />
        <ExpenseGridSkeleton />
        <PaginationSkeleton />
      </div>
    </div>
  );
};

export default Loading;