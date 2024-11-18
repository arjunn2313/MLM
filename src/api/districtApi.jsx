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

// CREATE DISTRICT HEAD PREVIEW
export const fetchHeadsDetails = async (id) => {
  const response = await api.get(`/api/admin/district-head/head-preview/${id}`);
  return response.data;
};


// FETCH DISTRICT HEAD LIST
export const fetchDistrictHeads = async ({
  limit = 10,
  page = 1,
  districtName = "",
}) => {
  const response = await api.get("/api/admin/district-head/list", {
    params: {
      limit,
      page,
      ...(districtName !== "All" && { districtName }),
    },
  });
  return response.data;
};


// CREATE DISTRICT HEAD
export const postDistrictHead = async(data) =>{
  const response = await api.post("/api/admin/district-head/register/",data);
  return response.data;
}