import React from "react";
import Heading from "../../../../../components/Headings/Headings";
import SearchInput from "../../../../../components/Filter/Search";
import NodeTree from "../../../../../components/Tree/NodeTree/NodeTree";
import { useSearchParams } from "react-router-dom";
import { useNodeTree } from "../../../../../hooks/useSection";
import LoadingBox from "../../../../../components/Loaders/LoadingBox";
import SponsorNodeTree from "../../../../../components/Tree/NodeTree/SponsorTree";

export default function SponsorTree() {
  const [searchParams, setSearchParams] = useSearchParams();
  const memberId = searchParams.get("memberId");
  const memberName = searchParams.get("memberName");
  const sponsorId = searchParams.get("sponsorId");
  const headName = searchParams.get("headName");
  const {
    data: treeData,
    isLoading: loading,
    refetch,
    isRefetching,
  } = useNodeTree(sponsorId);

  if (loading) {
    return (
      <div className="flex flex-col gap-3">
        <LoadingBox />
        <LoadingBox height="h-screen" />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white w-full p-3 flex gap-10 rounded">
        <div className="flex flex-col px-10 space-y-3">
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Member ID :</span>{" "}
            <span className="text-custom-orange">{memberId}</span>
          </span>
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Member Name :</span>{" "}
            <span className="text-custom-orange">{memberName}</span>
          </span>
        </div>

        <div className="flex flex-col px-10 border-l border-blue-500 space-y-3">
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Sponsor ID :</span>{" "}
            <span className="text-custom-pink">{sponsorId}</span>
          </span>{" "}
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Member Name :</span>{" "}
            <span className="text-custom-pink">{headName}</span>
          </span>
        </div>
      </div>

      <SponsorNodeTree
        treeData={treeData}
        head={sponsorId}
        member={memberId}
        isLoading={isRefetching}
        refetch={refetch}
      />
    </>
  );
}
