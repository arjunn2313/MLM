import { useQuery } from "@tanstack/react-query";
import { fetchLevelsAnalyzer } from "../api/levelsApi";

export const useLevel = (page, search, level) => {
  return useQuery({
    queryKey: ["level", page, search, level],
    queryFn: () => fetchLevelsAnalyzer({ page, search, level }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
