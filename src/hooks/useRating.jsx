import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchReview, updateReview } from "../api/ratingsApi";
import toast from "react-hot-toast";

// HOOK TO GET ALL RATING AND REVIEW
export const useReview = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => fetchReview(),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry:2
  });
};

// HOOK TO (APPROVE OR REJECT) REVIEWS
export const useUpdateReview = () => {
    return useMutation({
      mutationFn: updateReview,
      onSuccess: (data) => {
        toast.success("Review successfully created!");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      },
    });
  };
