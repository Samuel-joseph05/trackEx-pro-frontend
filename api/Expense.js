import { API } from "./axios";



export const createExpense=async(expenseData)=>{
    const res=await API.post("/expense",expenseData)
    return res.data;
}

export const getExpenses=async(search ="",category="All", sort = "newest",page=1)=>{
    const res=await API.get("/expenses",{params:{search,category,sort,page},})
    return res.data;
}
export const UpdateExpense=async(id,expenseData)=>{
    const res=await API.put(`/expense/${id}`,expenseData)
    return res.data;
}

export const deleteExpense=async(id)=>{
    const res=await API.delete(`/expense/${id}`)
    return res.data;
}
export const getDashboard =async()=>{
    const res=await  API.get("/dashboard")
    return res.data;
}
export const getMonthlySummary=async()=>{
    const res= await API.get("/monthly-summary")
    return res.data;
}