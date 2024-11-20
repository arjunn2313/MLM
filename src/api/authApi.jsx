import api from "./axiosInstance";

//ADMIN LOGIN REQUEST
export const postAdminLogin = async (data) => {
  const response = await api.post(`/login/admin/login-request`, data);
  return response.data;
};
