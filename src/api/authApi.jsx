import api from "./axiosInstance";

//ADMIN LOGIN REQUEST
export const postAdminLogin = async (data) => {
  const response = await api.post(`/login/admin/login-request`, data);
  return response.data;
};

// USER
// CREATE ACCOUNT
export const createUserAccount = async (data) => {
  const response = await api.post("/login/user/create", data);
  return response.data;
};

// VALIDATE OTP
export const createUserOtpVerify = async (data) => {
  const response = await api.post("/login/user/validate-otp", data);
  return response.data;
};

// LOGIN USER ACCOUNT USING PHONENUMBER AND PASSWORD
export const loginUserByPassword = async (data) => {
  const response = await api.post("/login/user/login-by-password", data);
  return response.data;
};
// LOGIN USER ACCOUNT USING PHONENUMBER AND PASSWORD
export const loginUserByOtp = async (data) => {
  const response = await api.post("/login/user/login-otp-request", data);
  return response.data;
};

// LOGIN USER ACCOUNT USING PHONENUMBER AND OTP
export const loginUserByOtpValidate = async (data) => {
  const response = await api.post("/login/user/login-otp-validate", data);
  return response.data;
};

// FORGOT PASSWORD
export const userForgotPassword = async (data) => {
  const response = await api.post("/login/user/forget-password", data);
  return response.data;
};

// RESET PASSWORD
export const userResetPassword = async (data) => {
  const response = await api.post("/login/user/reset-password", data);
  return response.data;
};

