import { API } from "./axios";



export const createExpense=async(expenseData)=>{
    const res=await API.post("/expenseRegister",expenseData)
    return res.data;
}

export const getExpenses=async()=>{
    const res=await API.get("/expenses")
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