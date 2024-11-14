import api from "./axiosInstance";

//---FETCH COUNT OF DISTRICT,TREE,MEMBERS ETC
export const fetchDashDetails = async () => {
  const response = await api.get(`/api/admin/dashboard/count-data`);
  return response.data;
};
// ---FETCH RECENTY JOINED MEMBERS CHART
export const fetchMemberChart = async ({period}) => {
  const response = await api.get(`/api/admin/dashboard/chart-data?period=${period}`);
  return response.data;
};

// ---FETCH DISTRICT HEADS
export const fetchDistrictHead = async () => {
  const response = await api.get(`/api/admin/dashboard/district-head?limit=2`);
  return response.data;
};
