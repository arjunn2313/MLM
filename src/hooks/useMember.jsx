import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkPhoneNumberExistence,
  checkPlacement,
  checkSponsor,
  fetchMember,
  fetchMemberDashboard,
  fetchMembers,
  postMemberData,
  updateMemberDetails,
  updateMemberStatus,
} from "../api/memberApi";
import toast from "react-hot-toast";

//GET ---- HOOK FOR FETCHING LIST OF ALL MEMBERS (----FILTERING QUERYS ARE ADDED-----)
export const useMemberList = (limit, page, search) => {
  return useQuery({
    queryKey: ["members", limit, page, search],
    queryFn: () => fetchMembers({ limit, page, search }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

//POST --- HOOK FOR CREATING NEW Member
export const useCreateMember = () => {
  return useMutation({
    mutationFn: postMemberData,
    onSuccess: (data) => {
      toast.success("Member successfully created!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

//GET --- HOOK FOR GETING DETAILS OF AGENT
export const useMemberDetails = (memberId) => {
  return useQuery({
    queryKey: ["member-details", memberId],
    queryFn: () => fetchMember({ memberId }),
    refetchOnWindowFocus: false,
  });
};

//PUT --- HOOK FOR UPDATING AGENT DETAILS
export const useUpdateMemberDetails = () => {
  return useMutation({
    mutationFn: updateMemberDetails,
    onSuccess: (data) => {
      toast.success("Member details successfully updated!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

//PUT --- HOOK FOR UPDATING AGENT STATUS
export const useUpdateMemberStatus = () => {
  return useMutation({
    mutationFn: updateMemberStatus,
    onSuccess: (data) => {
      toast.success("Member status successfully updated!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
};

// Hook to check phone number existence
export const useCheckPhoneNumber = (phoneNumber) => {
  return useQuery({
    queryKey: ["checkPhoneNumber", phoneNumber],
    queryFn: () => checkPhoneNumberExistence(phoneNumber),
    enabled: !!phoneNumber && phoneNumber.length >= 13,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

// Hook to check Sponsor existence
export const useCheckSponsor = (sponsorId) => {
  return useQuery({
    queryKey: ["checkSponsor", sponsorId],
    queryFn: () => checkSponsor(sponsorId),
    enabled: !!sponsorId && sponsorId.length >= 3,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

// Hook to check Sponsor existence
export const useCheckPlacement = (placementId) => {
  return useQuery({
    queryKey: ["checkPlacement", placementId],
    queryFn: () => checkPlacement(placementId),
    enabled: !!placementId && placementId.length >= 3,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

// Hook to check Sponsor existence
export const useMemberDash = (memberId) => {
  return useQuery({
    queryKey: ["member-dashboard", memberId],
    queryFn: () => fetchMemberDashboard(memberId),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
