import { API } from "./axios"



export const  createUser=async(userData)=>{
    const res=await API.post("/register",userData)
    return res.data;
}

