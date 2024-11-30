import api from "./axiosInstance";

// FETCH DASHBOARD
export const fetchUserDashboard = async () => {
  const response = await api.get(`/api/agent/dashboard`);
  return response.data;
};

// FETCH EARNING HISTORY
export const fetchUserEarning = async () => {
  const response = await api.get(`/api/agent/earning`);
  return response.data;
};

// FETCH REE DATA
export const fetchUserTree = async () => {
  const response = await api.get(`/api/agent/tree`);
  return response.data;
};
