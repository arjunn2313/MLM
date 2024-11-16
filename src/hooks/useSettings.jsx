import { useQuery } from "@tanstack/react-query";
import { fetchJoiningFee } from "../api/settingsApi";

//GET ---- GET JOINING FEE
export const useFetchJoiningFee = (limit, page, search) => {
    return useQuery({
      queryKey: ["joiningFee"],
      queryFn: () => fetchJoiningFee(),
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    });
  };