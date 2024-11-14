import api from "./axiosInstance";

export const fetchMembers = async ({
  limit,
  page = 1,
  status = "All",
  search = "",
}) => {
  const response = await api.get("/api/admin/agent/list", {
    params: { limit, page, search, ...(status !== "All" && { status }) },
  });
  return response.data;
};
