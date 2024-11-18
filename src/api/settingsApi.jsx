import api from "./axiosInstance";

// GET JOINING FEE
export const fetchJoiningFee = async () => {
  const response = await api.get(`/api/admin/settings`);
  return response.data;
};

// DELETE LEVEL WISE COMMISION
export const deleteCommision = async (id) => {
  const response = await api.delete(`/api/admin/settings/delete/${id}`);
  return response.data;
};

// UPDATE SETTINGS
export const updateSettings = async ({ referralCommission, commissions }) => {
  const response = await api.post(`/api/admin/settings/update`, {
    joiningFee: Number(referralCommission),
    levelCommissions: commissions.map((c) => ({
      level: Number(c.level),
      amount: Number(c.amount),
    })),
  });
  return response.data;
};
