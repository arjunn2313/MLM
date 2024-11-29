import { useMutation } from "@tanstack/react-query";
import {
  createUserAccount,
  createUserOtpVerify,
  loginUserByOtp,
  loginUserByOtpValidate,
  loginUserByPassword,
  postAdminLogin,
  userForgotPassword,
  userResetPassword,
} from "../api/authApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// ADMIN LOGIN
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

/////////////////////USER///////////////////

// CREATE ACCOUNT OTP REQUEST
export const useUserAccount = () => {
  return useMutation({
    mutationFn: createUserAccount,
    onSuccess: (data) => {
      toast.success("OTP SENT");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

// NEW ACCOUNT OTP VERIFICATION
export const useUserOtValidate = () => {
  return useMutation({
    mutationFn: createUserOtpVerify,
    onSuccess: (data) => {
      toast.success("Validated");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

// LOGIN USING PHONE NUMBER AND PASSWORD
export const useUserLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUserByPassword,
    onSuccess: (data) => {
      toast.success("Login Successfull!");
      localStorage.setItem("accessToken", data.accessToken);
      setTimeout(() => {
        navigate("/user");
      }, 200);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

// LOGIN USING PHONE NUMBER AND OTP Reqy
export const useUserLoginByOtp = () => {
  return useMutation({
    mutationFn: loginUserByOtp,
    onSuccess: (data) => {
      toast.success("OTP SENT");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};
// LOGIN USING PHONE NUMBER AND OTP
export const useUserLoginByOtpValidate = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUserByOtpValidate,
    onSuccess: (data) => {
      toast.success("Login Successfull!");
      localStorage.setItem("accessToken", data.accessToken);
      setTimeout(() => {
        navigate("/user");
      }, 200);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

// LOGIN USING PHONE NUMBER AND OTP
export const useUserForgotPassword = () => {
  return useMutation({
    mutationFn: userForgotPassword,
    onSuccess: (data) => {
      toast.success("OTP SENT");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

// LOGIN USING PHONE NUMBER AND OTP
export const useUserResetPassword = () => {
  return useMutation({
    mutationFn: userResetPassword,
    onSuccess: (data) => {
      toast.success("Verified");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};
