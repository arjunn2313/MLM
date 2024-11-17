import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import SearchInput from "../../../../../components/Filter/Search";
import {
  useNodeTree,
  useSectionDetails,
} from "../../../../../hooks/useSection";
import { useParams } from "react-router-dom";
import Heading from "../../../../../components/Headings/Headings";
import LoadingBox from "../../../../../components/Loaders/LoadingBox";
import NodeTree from "../../../../../components/Tree/NodeTree/NodeTree";

export default function TreeView() {
  const { treeId, headId } = useParams();
  const { data: sectionData, isLoading } = useSectionDetails(treeId);
  const { data: treeData, isLoading: loading,refetch,isRefetching } = useNodeTree(headId);

  if (isLoading || loading ) {
    return (
      <div className="flex flex-col gap-3">
        <LoadingBox />
        <LoadingBox height="h-screen" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full  bg-white grid grid-cols-1 md:grid-cols-4 p-3 rounded-md gap-4">
        <div className="flex items-center justify-center md:justify-start md:ps-10">
          <Heading text={sectionData?.treeName} />
        </div>

        <div className="flex flex-col items-center md:items-start gap-3 border-t md:border-t-0 md:border-l md:ps-5 border-blue-500 pt-3 md:pt-0">
          <span className="text-amber-800 font-semibold text-lg">
            {sectionData?.totalMembers}
          </span>
          <span className="text-blue-500 font-medium text-lg">
            Total Members
          </span>
        </div>

        <div className="flex flex-col items-center md:items-start gap-3 border-t md:border-t-0 md:border-l md:ps-5 border-blue-500 pt-3 md:pt-0">
          <span className="text-amber-800 font-semibold text-lg">
            {sectionData?.levels}
          </span>
          <span className="text-blue-500 font-medium text-lg">
            Total Levels
          </span>
        </div>

        <div className="flex items-center justify-center md:justify-end">
          <SearchInput placeholder="Search..." />
        </div>
      </div>

      <NodeTree treeData={treeData} isLoading={isRefetching} refetch={refetch}/>
    </>
  );
}
