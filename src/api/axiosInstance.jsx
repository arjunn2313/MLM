import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response) {
//       const { status } = error.response;

//       if (status === 401) {
//         localStorage.removeItem("accessToken");
//         toast.error("Your session has expired. Please log in again.");
//         setTimeout(() => {
//           window.location.href = "/admin-login";
//         }, 1000);
//       } else if (status === 403) {
//         toast.error("Your session has expired. Please log in again.");
//         localStorage.removeItem("accessToken")
//         setTimeout(() => {
//           window.location.href ="/";
//         }, 2000);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        localStorage.removeItem("accessToken");
        toast.error("Your session has expired. Please log in again.");
        setTimeout(() => {
          window.location.href = "/admin-login";
        }, 1000);
      } else if (status === 403) {
        localStorage.removeItem("accessToken");
        toast.error("Access denied. Please log in again.");
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else if (status === 500) {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } else {  
      toast.error("A network error occurred. Please check your internet connection.");
    }

    return Promise.reject(error);
  }
);


export default api;
