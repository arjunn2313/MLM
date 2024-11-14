import axios from "axios";
import api from "./axiosInstance";

// CREATE NEW EMPLOYEE INSTANCE BY ADDING PROFFESIONAL DETAILS
export const postEmployeeData = async (employeeData) => {
  const response = await api.post("/employee", employeeData);
  return response.data;
};

// GET ALL EMPLOYEES DETAILS
export const fetchEmployees = async ({
  page = 1,
  status = "All",
  search = "",
  limit,
}) => {
  const response = await api.get("/employee", {
    params: { limit, page, search, ...(status !== "All" && { status }) },
  });
  return response.data;
};

// GET A SINGLE EMPLOYEE DETAILS BY ID
export const fetchEmployee = async ({ id }) => {
  const response = await api.get(`/employee/${id}`);
  return response.data;
};
