import api from "./axiosInstance";

export const fetchLevelsAnalyzer = async ({
  limit = 10,
  page = 1,
  search = "",
  level,
}) => {
  const response = await api.get(`/api/admin/levels-tracker/${level}`, {
    params: { limit, page, search },
  });
  return response.data;
};
