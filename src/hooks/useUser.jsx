import { useMutation, useQuery } from "@tanstack/react-query";
import {fetchUserDashboard, fetchUserEarning, fetchUserTree } from "../api/userApi";
import toast from "react-hot-toast";

// GET --- HOOK USER DASHBOARD
export const useUserDashboard = () => {
  return useQuery({
    queryKey: ["user-dashboard"],
    queryFn: () => fetchUserDashboard(),
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// GET --- HOOK USER  MY TREE
export const useUserMyTree = () => {
  return useQuery({
    queryKey: ["user-tree"],
    queryFn: () => fetchUserTree(),
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// GET --- HOOK USER  EARNING
export const useUserEarning = () => {
  return useQuery({
    queryKey: ["user-earning"],
    queryFn: () => fetchUserEarning(),
    refetchOnWindowFocus: false,
    retry: 2,
  });
};