import axios from "axios";


export const API=axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true,
})


//request interceptor

API.interceptors.request.use(
    (config)=>{
const token =localStorage.getItem("token");
console.log("Token from localStorage:", token); // Debugging line

if(token){
    config.headers.Authorization =`Bearer ${token}`;
}
return config;
},

(error)=>{
    return Promise.reject(error)
})