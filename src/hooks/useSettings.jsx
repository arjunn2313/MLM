import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCommision, fetchJoiningFee, updateSettings } from "../api/settingsApi";
import toast from "react-hot-toast";

//GET ---- GET JOINING FEE
export const useFetchJoiningFee = (limit, page, search) => {
  return useQuery({
    queryKey: ["joiningFee"],
    queryFn: () => fetchJoiningFee(),
    keepPreviousData: true,
    refetchOnWindowFocus: true,
  });
};

// Custom Hook for Delete Commission
export const useDeleteCommision = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCommision, 
    onSuccess: () => {
   
      queryClient.invalidateQueries(["joiningFee"]);
      toast.success("Successfully deleted");
    },
    onError: (error) => {
      console.error("Error deleting item: ", error);
      toast.error("Error deleting item");
    },
  });
};

// Custom Hook for updating settings
export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateSettings,  
    onSuccess: () => {
      queryClient.invalidateQueries(["joiningFee"]);
      toast.success("Settings updated successfully");
    },
    onError: (error) => {
      console.error("Error updating settings: ", error);
      toast.error("Failed to update settings.");
    },
  });
};
