import { useQuery } from "@tanstack/react-query";
import {
  fetchDashDetails,
  fetchDistrictHead,
  fetchMemberChart,
} from "../api/dashboardApi";

// HOOK FOR COUNTS
export const useDashCount = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: () => fetchDashDetails(),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// HOOK FOR COUNTS
export const useMemberChart = (period) => {
  return useQuery({
    queryKey: ["member-chart", period],
    queryFn: () => fetchMemberChart({ period }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

// FETCH DISTRICT HEAD
export const useDistrictHead = () => {
  return useQuery({
    queryKey: ["district-head"],
    queryFn: () => fetchDistrictHead(),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
