import api from "./axiosInstance";

// FETCH DASHBOARD
export const fetchUserDashboard = async () => {
  const response = await api.get(`/api/agent/dashboard`);
  return response.data;
};

// FETCH EARNING HISTORY
export const fetchUserEarning = async () => {
  const response = await api.get(`/api/agent/earning`);
  return response.data;
};

// FETCH REE DATA
export const fetchUserTree = async () => {
  const response = await api.get(`/api/agent/tree`);
  return response.data;
};

// CHECK PHONE NUMBER
export const checkUserPhoneNumber = async (phoneNumber) => {
  const response = await api.get(`/api/agent/check-phone/${phoneNumber}`);
  return response.data;
};

// CHECK SPONSOR MEMBER
export const checkSponsorMember = async (phoneNumber) => {
  const response = await api.get(`/api/agent/sponsor-member/${phoneNumber}`);
  return response.data;
};

// CHECK DOWNLINE MEMBER
export const checkDownlineMember = async (memberId) => {
  const response = await api.get(`/api/agent/placement-member/${memberId}`);
  return response.data;
};

// FETCH JOINING FEEE
export const fetchJoiningFee = async () => {
  const response = await api.get(`/api/agent/joiningFee`);
  return response.data;
};

// CREATE NEW MEMBER
export const postUserMemberData = async (memberData) => {
  const response = await api.post("/api/agent/create", memberData);
  return response.data;
};