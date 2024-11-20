import { useMutation, useQuery } from "@tanstack/react-query";
import {
  dispatchOrder,
  fetchAllOrders,
  fetchOrderDetails,
} from "../api/orderApi";
import toast from "react-hot-toast";

// GET --- HOOK TO FETCH ALL ORDERS
export const useFetchOrders = (page, search, orderStatus, date, category) => {
  return useQuery({
    queryKey: ["orders", page, search, orderStatus, date, category],
    queryFn: () =>
      fetchAllOrders({ page, search, orderStatus, date, category }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
// HOOK TO DISPATCH ORDER (LIKE ADDING TRANKING LINK)
export const useOrderDispatch = () => {
  return useMutation({
    mutationFn: dispatchOrder,
    onSuccess: (data) => {
      toast.success("Tracking link added successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};
// HOOK TO FETCH ORDER DETAILS
export const useFetchOrderDetails = (id) => {
  return useQuery({
    queryKey: ["order-details",id],
    queryFn: () => fetchOrderDetails(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
