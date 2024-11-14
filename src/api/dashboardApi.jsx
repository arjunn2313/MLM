import api from "./axiosInstance";

export const fetchDashDetails = async () => {
    const response = await api.get(`/api/admin/dashboard/count-data`);
    return response.data;
  };