import api from "./axiosInstance";

// GET ALL EXPENSES
export const fetchExpenses = async ({
  limit = 10,
  page = 1,
  search = "",
  category,
  fromDate,
  toDate,
}) => {
  const response = await api.get(`/api/admin/expense/getAll`, {
    params: {
      limit,
      page,
      search,
      ...(category !== "All" && { category }),
      fromDate,
      toDate,
    },
  });
  return response.data;
};

// GET EXPENSE CATEGORIES
export const fetchExpenseCategory = async () => {
  const response = await api.get(`/api/admin/expense/category`);
  return response.data;
};

// CREATE NEW EXPENSE
export const postExpense = async (data) => {
  const response = await api.post(`/api/admin/expense/create`, data);
  return response.data;
};
