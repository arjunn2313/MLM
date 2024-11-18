import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchDistrict,
  fetchDistrictHeads,
  fetchHeadsDetails,
  postDistrict,
  postDistrictHead,
} from "../api/districtApi";
import toast from "react-hot-toast";

//GET --- HOOK FOR GETING LIST OF DISTRICTS
export const useDistrictList = () => {
  return useQuery({
    queryKey: ["districts"],
    queryFn: fetchDistrict,
    refetchOnWindowFocus: false,
  });
};
//GET --- HOOK FOR GETING DETAILS OF DISTRICT HEADS
export const useDistrictHead = (id) => {
  return useQuery({
    queryKey: ["districts-head", id],
    queryFn: () => fetchHeadsDetails(id),
    refetchOnWindowFocus: false,
  });
};

//GET --- HOOK FOR GETING  ALL DISTRICT HEADS
export const useDistrictHeads = (page, districtName) => {
  return useQuery({
    queryKey: ["districts-heads", page, districtName],
    queryFn: () => fetchDistrictHeads({ page, districtName }),
    refetchOnWindowFocus: false,
  });
};

//POST --- HOOK FOR CREATING NEW DISTRICT
export const useCreateDistrict = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postDistrict,
    onSuccess: (data) => {
      toast.success("New district successfully created!");
      queryClient.invalidateQueries(["districts"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

// POST --- CREATE DISTRICT HEAD
export const useCreateDistrictHead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postDistrictHead,
    onSuccess: (data) => {
      toast.success("Successfully created!");
      queryClient.invalidateQueries(["districts-heads"]);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};
