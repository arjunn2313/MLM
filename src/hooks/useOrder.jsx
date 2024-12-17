import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  dispatchOrder,
  fetchAllOrders,
  fetchOrderDetails,
} from "../api/orderApi";
import toast from "react-hot-toast";

// GET --- HOOK TO FETCH ALL ORDERS
export const useFetchOrders = (category, page, search, orderStatus, date) => {
  return useQuery({
    queryKey: ["orders", category, page, search, orderStatus, date],
    queryFn: () =>
      fetchAllOrders({ category, page, search, orderStatus, date }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
// HOOK TO DISPATCH ORDER (LIKE ADDING TRANKING LINK)
// export const useOrderDispatch = () => {
//   return useMutation({
//     mutationFn: dispatchOrder,
//     onSuccess: (data) => {
//       toast.success("Tracking link added successfully!");
//     },
//     onError: (error) => {
//       toast.error(error?.response?.data?.message || "Something went wrong!");
//     },
//   });
// };
export const useOrderDispatch = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dispatchOrder,
    onSuccess: (data) => {
      toast.success("Tracking link added successfully!");

      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};
// HOOK TO FETCH ORDER DETAILS
export const useFetchOrderDetails = (id) => {
  return useQuery({
    queryKey: ["order-details", id],
    queryFn: () => fetchOrderDetails(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
