import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  fetchEmployee,
  fetchEmployees,
  postEmployeeData,
} from "../api/employeeApi";


//POST --- HOOK FOR CREATING NEW EMPLOYEE
export const useCreateEmployee = () => {
  return useMutation({
    mutationFn: postEmployeeData,
    onSuccess: (data) => {
      console.log("Employee successfully created:", data);
      toast.success("Employee successfully created!");
    },
    onError: (error) => {
      console.error("Error creating employee:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

//GET ---- HOOK FOR FETCHING LIST OF ALL EMPLOYEES (----FILTERING QUERYS ARE ADDED-----)
export const useEmployeeList = (page, status, query) => {
  return useQuery({
    queryKey: ["employees", page, status, query],
    queryFn: () => fetchEmployees({ page, status, query }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

//GET --- HOOK FOR GETING DETAILS OF EMPLOYEE
export const useEmployeeDetails = (id) => {
  return useQuery({
    queryKey: ["employee", id],
    queryFn: () => fetchEmployee({ id }),
    refetchOnWindowFocus: false,
  });
};
