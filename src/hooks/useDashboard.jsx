import { useQuery } from "@tanstack/react-query";
import { fetchDashDetails } from "../api/dashboardApi";

export const useDashCount = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashDetails(),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
