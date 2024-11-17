import React from "react";
import { useSearchParams } from "react-router-dom";
import { useMemberDetails } from "../../../../../hooks/useMember";
import { useIncompleteNodeTree} from "../../../../../hooks/useSection";
import LoadingBox from "../../../../../components/Loaders/LoadingBox";
import IncompleteNodeTree from "../../../../../components/Tree/NodeTree/IncompleteTree";

export default function IncompleteTree() {
  const [searchParams, setSearchParams] = useSearchParams();
  const memberId = searchParams.get("memberId");
  const memberName = searchParams.get("memberName");
  const { data: member, isLoading: isMemberLoading } = useMemberDetails(memberId);
  const {
    data: treeData,
    isLoading: loading,
    refetch,
    isRefetching,
  } = useIncompleteNodeTree(memberId);

  if (loading || isMemberLoading) {
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
            <span className="text-custom-pink">
              {member?.applicantPlacementLevel}
            </span>
          </span>{" "}
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Total Downline members :</span>{" "}
            <span className="text-custom-pink">{member?.children?.length}</span>
          </span>
        </div>
      </div>

      <IncompleteNodeTree
        treeData={treeData}
        member={memberId}
        isLoading={isRefetching}
        refetch={refetch}
      />
    </>
  );
}
