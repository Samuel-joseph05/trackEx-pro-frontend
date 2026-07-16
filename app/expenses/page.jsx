"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, IndianRupee, Tag } from "lucide-react";
import { getExpenses } from '@/api/Expense'
import { useEffect, useState } from "react";

const Page = () => {
const [expenses, setExpenses] = useState([]);



  const fetchExpenses=async()=>{
    try{
      const data=await getExpenses();
      setExpenses(data);
    }
    catch(err){
       console.log("Failed to fetch", err);
    }  
}
   useEffect(()=>{
      console.log("Fetching expenses")
      fetchExpenses();
    }, [])

    
  return (
 <div className="max-w-6xl mx-auto p-6">
  <h1 className="text-3xl font-bold mb-6">Expenses</h1>

  {expenses.length === 0 ? (
    <div className="text-center text-gray-500 mt-10">
      No expenses found.
    </div>
  ) : (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {expenses.map((expense) => (
        <Card
          key={expense._id}
          className="hover:shadow-xl transition-all duration-300 rounded-2xl"
        >
          <CardContent className="p-5 space-y-4">
            {/* Title */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {expense.title}
              </h2>

              <Badge variant="secondary">
                {expense.category}
              </Badge>
            </div>

            {/* Amount */}
            <div className="flex items-center gap-2 text-green-600 font-bold text-2xl">
              <IndianRupee size={20} />
              {expense.amount}
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 text-gray-600">
              <Tag size={16} />
              <span>{expense.category}</span>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-gray-500">
              <Calendar size={16} />
              <span>
                {new Date(expense.date).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )}
</div>

  )


}
export default Page;