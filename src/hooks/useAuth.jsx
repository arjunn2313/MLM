import { useMutation } from "@tanstack/react-query";
import { postAdminLogin } from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAdminLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: postAdminLogin,
    onSuccess: (data) => {
      toast.success("Login Successfull!");
      localStorage.setItem("accessToken", data.accessToken);
      setTimeout(() => {
        navigate("/");
      }, 200);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};
