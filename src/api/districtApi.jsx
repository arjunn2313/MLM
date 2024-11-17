import api from "./axiosInstance";

// GET DISTRICT LIST
export const fetchDistrict = async () => {
  const response = await api.get("/api/admin/district/list");
  return response.data;
};

// CREATE DISTRICT DISTRICT
export const postDistrict = async (data) => {
  const response = await api.post("/api/admin/district/create", data);
  return response.data;
};
