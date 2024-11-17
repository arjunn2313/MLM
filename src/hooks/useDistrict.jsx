import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { fetchDistrict, postDistrict } from "../api/districtApi";
import toast from "react-hot-toast";

//GET --- HOOK FOR GETING LIST OF DISTRICTS
export const useDistrictList = () => {
  return useQuery({
    queryKey: ["districts"],
    queryFn: fetchDistrict,
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
