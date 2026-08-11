import ExpenseCardSkeleton from "./ExpenseCardSkeleton";

const ExpenseGridSkeleton = () => {
  return (
    <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <ExpenseCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ExpenseGridSkeleton;