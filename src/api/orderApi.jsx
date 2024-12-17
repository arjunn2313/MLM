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
export const dispatchOrder = async (data) => {
  const response = await api.put(`/api/admin/orders/update-item-tracking`, data);
  return await response.data;
};

// GET ORDER DETAILS
export const fetchOrderDetails = async (id) => {
  const response = await api.get(`/api/admin/orders/details/${id}`);
  return await response.data;
};