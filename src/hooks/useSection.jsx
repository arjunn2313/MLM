import { useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchCompleted,
  fetchDownline,
  fetchIncomplete,
  fetchIncompleteNodeTree,
  fetchNodeTree,
  fetchSection,
  fetchSectionDetails,
  fetchSponsor,
  fetchTreeMembers,
  postSectionHead,
} from "../api/sectionApi";
import toast from "react-hot-toast";

//GET ---- HOOK FOR FETCHING LIST OF ALL SECTION (----FILTERING QUERYS ARE ADDED-----)
export const useSectionList = (limit, page, search, districtId) => {
  return useQuery({
    queryKey: ["sections", limit, page, search, districtId],
    queryFn: () => fetchSection({ limit, page, search, districtId }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

//POST --- HOOK FOR CREATING NEW HEAD AND SECTION
export const useCreateHead = () => {
  return useMutation({
    mutationFn: postSectionHead,
    onSuccess: (data) => {
      toast.success("New section successfully created!");
    },
    onError: (error) => {
      console.error("Error creating section:", error);
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

//GET --- HOOK FOR GETING DETAILS OF SECTION
export const useSectionDetails = (treeId) => {
  return useQuery({
    queryKey: ["section-details", treeId],
    queryFn: () => fetchSectionDetails(treeId),
    refetchOnWindowFocus: false,
  });
};

//GET --- HOOK FOR GETING NODE TREE
export const useNodeTree = (headId) => {
  return useQuery({
    queryKey: ["node-tree", headId],
    queryFn: () => fetchNodeTree(headId),
    refetchOnWindowFocus: false,
  });
};

//GET --- HOOK FOR GETING INCOMPLETE NODE TREE
export const useIncompleteNodeTree = (memberId) => {
  return useQuery({
    queryKey: ["incompleteNode-tree", memberId],
    queryFn: () => fetchIncompleteNodeTree(memberId),
    refetchOnWindowFocus: false,
  });
};

//GET --- HOOK FOR GETING SPONSOR LIST
export const useSposorList = (page, search, treeName) => {
  return useQuery({
    queryKey: ["sponsor-list", page, search, treeName],
    queryFn: () => fetchSponsor({ page, search, treeName }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

//GET --- HOOK FOR GETING DOWNLINE LIST
export const useDownlineList = (page, search, treeName) => {
  return useQuery({
    queryKey: ["downline-list", page, search, treeName],
    queryFn: () => fetchDownline({ page, search, treeName }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

//GET --- HOOK FOR GETING ALL TREE MEMBERS LIST
export const useTreeMemebersList = (page, search, treeName) => {
  return useQuery({
    queryKey: ["treeMembers-list", page, search, treeName],
    queryFn: () => fetchTreeMembers({ page, search, treeName }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

//GET --- HOOK FOR GETING ALL INCOMPLETE MEMBERS LIST
export const useIncompleteList = (page, search, treeName) => {
  return useQuery({
    queryKey: ["incomplete-list", page, search, treeName],
    queryFn: () => fetchIncomplete({ page, search, treeName }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

//GET --- HOOK FOR GETING ALL COMPLETED MEMBERS LIST
export const useCompletedList = (page, search, treeName) => {
  return useQuery({
    queryKey: ["completed-list", page, search, treeName],
    queryFn: () => fetchCompleted({ page, search, treeName }),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
