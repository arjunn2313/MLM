import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkDownlineMember,
  checkSponsorMember,
  checkUserPhoneNumber,
  fetchJoiningFee,
  fetchUserDashboard,
  fetchUserEarning,
  fetchUserTree,
  postUserMemberData,
} from "../api/userApi";
import toast from "react-hot-toast";

// GET --- HOOK USER DASHBOARD
export const useUserDashboard = () => {
  return useQuery({
    queryKey: ["user-dashboard"],
    queryFn: () => fetchUserDashboard(),
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// GET --- HOOK USER  MY TREE
export const useUserMyTree = () => {
  return useQuery({
    queryKey: ["user-tree"],
    queryFn: () => fetchUserTree(),
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// GET --- HOOK USER  EARNING
export const useUserEarning = () => {
  return useQuery({
    queryKey: ["user-earning"],
    queryFn: () => fetchUserEarning(),
    refetchOnWindowFocus: false,
    retry: 2,
  });
};

// GET --- HOOK TO CHECK PHONENUMBEr
export const useUserPhoneNumber = (phoneNumber) => {
  return useQuery({
    queryKey: ["user-phoneNumber", phoneNumber],
    queryFn: () => checkUserPhoneNumber(phoneNumber),
    enabled: !!phoneNumber && phoneNumber.length >= 13,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
 
// GET --- HOOK TO SPONSOR
export const useUserSponsor = (sponsorId) => {
  return useQuery({
    queryKey: ["user-sponsor",sponsorId],
    queryFn: () => checkSponsorMember(sponsorId),
    enabled: !!sponsorId && sponsorId.length >= 3,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
// GET --- HOOK TO CHECK  PLACEMENT
export const useUserPlacement = (placementId) => {
  return useQuery({
    queryKey: ["user-placement",placementId],
    queryFn: () => checkDownlineMember(placementId),
    enabled: !!placementId && placementId.length >= 3,
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

 
// GET --- HOOK TO FETCH JOINING FEE
export const useUserJoiningfee = () => {
  return useQuery({
    queryKey: ["user-joiningfees"],
    queryFn: () => fetchJoiningFee(),
    refetchOnWindowFocus: false,
    retry: 2,
  });
};



//POST --- HOOK FOR CREATING NEW Member
export const useUserCreateMember = () => {
  return useMutation({
    mutationFn: postUserMemberData,
    onSuccess: (data) => {
      toast.success("Member successfully created!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });
}