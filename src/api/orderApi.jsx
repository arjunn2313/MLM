import api from "./axiosInstance";

// GET ALL ORDERS
export const fetchAllOrders = async ({
  limit = 10,
  page = 1,
  search = "",
  orderStatus,
  date,
  category,
}) => {
  const response = await api.get(`/api/admin/orders`, {
    params: { limit, page, search, orderStatus, date, category },
  });
  return response.data;
};
// POST DISPATCH ORDER
export const dispatchOrder = async ({ id, data }) => {
  const response = await api.put(`/api/admin/orders/dispatch/${id}`, data);
  return await response.data;
};
