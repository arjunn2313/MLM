import api from "./axiosInstance";

// GET ALL PRODUCT REVIEWS
export const fetchReview = async () => {
  const response = await api.get(`/api/admin/orders/review`);
  return response.data;
};
// UPDATE STATUS OF PRODUCT REVIEW
export const updateReview = async ({ id, status }) => {
  const response = await api.put(`/api/admin/orders/review/${id}`, { status });
  return response.data;
};
