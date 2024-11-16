import api from "./axiosInstance";

// GET JOINING FEE
export const fetchJoiningFee = async () => {
  const response = await api.get(`/api/admin/settings`);
  return response.data;
};
