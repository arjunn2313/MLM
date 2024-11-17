import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNodeTree } from "../../../../../hooks/useSection";
import NodeTree from "../../../../../components/Tree/NodeTree/NodeTree";
import LoadingBox from "../../../../../components/Loaders/LoadingBox";

export default function DownlineTree() {
  const [searchParams, setSearchParams] = useSearchParams();
  const memberId = searchParams.get("memberId");
  const memberName = searchParams.get("memberName");
  const [totalMembers, setTotalMembers] = useState(0);
  const {
    data: treeData,
    isLoading: loading,
    refetch,
    isRefetching,
  } = useNodeTree(memberId);

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
            <span className="text-blue-500">Level :</span>{" "}
            <span className="text-custom-pink">{treeData?.level}</span>
          </span>{" "}
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Total Downline members :</span>{" "}
            <span className="text-custom-pink">{totalMembers} </span>
          </span>
        </div>
      </div>

      <NodeTree treeData={treeData} isLoading={isRefetching} refetch={refetch}/>
    </>
  );
}
