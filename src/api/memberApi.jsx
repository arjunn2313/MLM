import api from "./axiosInstance";

// FETCH AGENTS
export const fetchMembers = async ({
  limit = 10,
  page = 1,
  search = "",
  districtName = "",
  sectionName = "",
  level = "",
}) => {
  const response = await api.get("/api/admin/agent/list", {
    params: {
      limit,
      page,
      search,
      ...(districtName !== "All" && { districtName }),
      ...(sectionName !== "All" && { sectionName }),
      ...(level !== "All" && { level }),
    },
  });
  return response.data;
};

// CREATE NEW MEMBER
export const postMemberData = async (memberData) => {
  const response = await api.post("/api/admin/agent/register", memberData);
  return response.data;
};

// GET A SINGLE AGENT DETAILS BY ID
export const fetchMember = async ({ memberId }) => {
  const response = await api.get(`/api/admin/agent/agent-preview/${memberId}`);
  return response.data;
};

// UPDATE AGENT DETAILS
export const updateMemberDetails = async ({ formData, memberId }) => {
  const response = await api.put(
    `/api/admin/agent/agent-update/${memberId}`,
    formData
  );
  return response.data;
};

// UPDATE AGENT STATUS
export const updateMemberStatus = async ({ data, memberId }) => {
  const response = await api.put(
    `/api/admin/agent/update-status/${memberId}`,
    data
  );
  return response.data;
};

// API function to check if the phone number exists
export const checkPhoneNumberExistence = async (phoneNumber) => {
  const response = await api.get(`/api/admin/agent/check-phone/${phoneNumber}`);
  return response.data;
};

// API function to check if the Sponsor exist
export const checkSponsor = async (sponsorId) => {
  const response = await api.get(
    `/api/admin/agent/sponsor-member/${sponsorId}`
  );
  return response.data;
};

// API function to check if the Placement exist
export const checkPlacement = async (placementId) => {
  const response = await api.get(
    `/api/admin/agent/placement-member/${placementId}`
  );
  return response.data;
};

// API function to fetch dashboard
export const fetchMemberDashboard = async (memberId) => {
  const response = await api.get(`/api/admin/agent/downline/${memberId}`);
  return response.data;
};
