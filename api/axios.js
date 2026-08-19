import axios from "axios";



export const API=axios.create({
    baseURL:process.env.NEXT_PUBLIC_API_URL,
    withCredentials:true,
})


//request interceptor

API.interceptors.request.use(
    (config)=>{
const token =localStorage.getItem("token");

if(token){
    config.headers.Authorization =`Bearer ${token}`;
}
return config;
},

(error)=>{
    return Promise.reject(error)
})

// API.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 400:
//           toast.error(error.response.data.message);
//           break;

//         case 401:
//           toast.error("Your session has expired. Please log in again.");
//           localStorage.removeItem("token");
//           window.location.href = "/login";
//           break;

//         case 403:
//           toast.error("Access denied.");
//           break;

//         case 404:
//           toast.error(error.response.data.message);
//           break;

//         case 409:
//           toast.error(error.response.data.message);
//           break;

//         case 500:
//           toast.error("Something went wrong. Please try again later.");
//           break;

//         default:
//           toast.error(error.response.data.message || "An unexpected error occurred.");
//       }
//     } else {
//       toast.error("Unable to connect to the server.");
//     }

//     return Promise.reject(error);
//   }
// );
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const message = error.response?.data?.message;

      if (
        message === "Invalid or expired token" ||
        message === "No Token provided"
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);