import { useQuery } from "@tanstack/react-query";
import { fetchMembers } from "../api/memberApi";

//GET ---- HOOK FOR FETCHING LIST OF ALL MEMBERS (----FILTERING QUERYS ARE ADDED-----)
export const useMemberList = (limit, page, status, query) => {
  return useQuery({
    queryKey: ["members", limit, page, status, query],
    queryFn: () => fetchMembers({ limit, page, status, query }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};
