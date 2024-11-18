import React from "react";
import BackButton from "../../../components/Button/BackButton";
import Heading from "../../../components/Headings/Headings";
import HeadList from "../../../components/Members/Dashboard/HeadList";
import { useParams } from "react-router-dom";
import { useMemberDetails } from "../../../hooks/useMember";
import IncompleteNodeTree from "../../../components/Tree/NodeTree/IncompleteTree";
import { useIncompleteNodeTree } from "../../../hooks/useSection";
import LoadingBox from "../../../components/Loaders/LoadingBox";

export default function CompleteDashboard() {
  const { memberId } = useParams();
  const { data: member, isLoading } = useMemberDetails(memberId);
  const {
    data: treeData,
    isLoading: loading,
    refetch,
    isRefetching,
  } = useIncompleteNodeTree(memberId);

  if (isLoading) {
    return (
      <div className=" overflow-hidden flex flex-col gap-4">
        <LoadingBox />
        <LoadingBox />
        <LoadingBox height="h-screen"/>
      
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="flex items-center gap-5 mb-4">
        <BackButton path={-1} />
        <Heading text="Completed Tree"  />
      </div>

      <HeadList member={member} />

      <div className="bg-white w-full p-3 flex gap-10 rounded mt-3">
        <div className="flex flex-col px-10 space-y-3">
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Member ID :</span>{" "}
            <span className="text-custom-orange">{memberId}</span>
          </span>
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Member Name :</span>{" "}
            <span className="text-custom-orange">{member?.name}</span>
          </span>
        </div>

        <div className="flex flex-col px-10 border-l border-blue-500 space-y-3">
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Completed :</span>{" "}
            <span className="text-green-600">0{member?.children?.length} </span>
          </span>{" "}
          <span className="font-medium">
            {" "}
            <span className="text-blue-500">Incomplete :</span>{" "}
            <span className="text-custom-pink">
              0{5 - member?.children?.length}
            </span>
          </span>
        </div>
      </div>

      <IncompleteNodeTree
        treeData={treeData}
        member={memberId}
        isLoading={isRefetching}
        refetch={refetch}
      />
    </React.Fragment>
  );
}
