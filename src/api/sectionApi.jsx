import api from "./axiosInstance";

// FETCH SECTION DATA
export const fetchSection = async ({
  limit,
  page = 1,
  search = "",
  districtId,
}) => {
  const response = await api.get(`/api/admin/section/list/${districtId}`, {
    params: { limit, page, search },
  });
  return response.data;
};

// FETCH SINGLE SECTION DETAILS
export const fetchSectionDetails = async (treeId) => {
  const response = await api.get(`/api/admin/section/single-tree/${treeId}`);
  return response.data;
};

// CREATE SECTION HEAD
export const postSectionHead = async ({ districtId, formData }) => {
  const response = await api.post(
    `/api/admin/section/create-head/${districtId}`,
    formData
  );
  return response.data;
};

// GET NODE TREE DATA
export const fetchNodeTree = async (headId) => {
  const response = await api.get(`/api/admin/section/tree-node-tree/${headId}`);
  return response.data;
};

// GET INCOMPLETE NODE TREE DATA
export const fetchIncompleteNodeTree = async (memberId) => {
  const response = await api.get(
    `/api/admin/section/incomplete-tree/${memberId}`
  );
  return response.data;
};

// GET SPONSOR  MEMBERS
export const fetchSponsor = async ({
  limit = 10,
  page = 1,
  search = "",
  treeName,
}) => {
  const response = await api.get(
    `/api/admin/section/sponsor-downline-members/${treeName}`,
    { params: { limit, page, search } }
  );
  return response.data;
};

// GET DOWNLINE  MEMBERS
export const fetchDownline = async ({
  limit = 10,
  page = 1,
  search = "",
  treeName,
}) => {
  const response = await api.get(
    `/api/admin/section/downline-members/${treeName}`,
    { params: { limit, page, search } }
  );
  return response.data;
};

// GET LIST OF ALL TREE  MEMBERS
export const fetchTreeMembers = async ({
  limit = 10,
  page = 1,
  search = "",
  treeName,
}) => {
  const response = await api.get(
    `/api/admin/section/all-tree-members/${treeName}`,
    { params: { limit, page, search } }
  );
  return response.data;
};

// GET LIST OF ALL INCOMPLETE   MEMBERS
export const fetchAllIncomplete = async ({
  limit = 10,
  page = 1,
  search = "",
  districtName = "",
  sectionName = "",
  level = "",
}) => {
  const response = await api.get(`/api/admin/section/all-incomplete-members`, {
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

// GET LIST OF INCOMPLETE TREE  MEMBERS
export const fetchIncomplete = async ({
  limit = 10,
  page = 1,
  search = "",
  treeName,
}) => {
  const response = await api.get(
    `/api/admin/section/incomplete-members/${treeName}`,
    { params: { limit, page, search } }
  );
  return response.data;
};

// GET LIST OF COMPLETE TREE  MEMBERS
export const fetchCompleted = async ({
  limit = 10,
  page = 1,
  search = "",
  treeName,
}) => {
  const response = await api.get(
    `/api/admin/section/completed-members/${treeName}`,
    { params: { limit, page, search } }
  );
  return response.data;
};

// GET LIST OF ALL COMPLETE   MEMBERS
export const fetchAllComplete = async ({
  limit = 10,
  page = 1,
  search = "",
  districtName = "",
  sectionName = "",
  level = "",
}) => {
  const response = await api.get(`/api/admin/section/all-complete-members`, {
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

// GET LIST OF FILTER CATEGORY
export const fetchFilters = async (districtName = "") => {
  const response = await api.get(`/api/admin/section/incomplete-filter`, {
    params: { ...(districtName !== "All" && { districtName }) },
  });
  return response.data;
};
