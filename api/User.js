import { API } from "./axios"



export const  createUser=async(userData)=>{
    const res=await API.post("/register",userData)
    return res.data;
}


export const loginUser=async(userData)=>{
    const res=await API.post("/login",userData)
    return res.data;
}

export const logoutUser=()=>{
    localStorage.removeItem("token")
}

