import React from "react";
import { useUserMyTree } from "../../../hooks/useUser";
import LoadingBox from "../../../components/Loaders/LoadingBox";
import SearchInput from "../../../components/Filter/Search";
import Heading from "../../../components/Headings/Headings";
import NodeTree from "../../../components/Tree/NodeTree/NodeTree";

export default function MyTree() {
  const { data, isLoading,isRefetching,refetch } = useUserMyTree();

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <LoadingBox />
        <LoadingBox height="h-screen" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full  bg-white flex items-center justify-between p-3 py-5 rounded-md gap-4">
        <div className="flex items-center justify-center md:justify-start md:ps-10">
           <h2 className="text-primary font-bold text-2xl">Tree View</h2>
        </div>

        <div className="flex items-center justify-center md:justify-end">
          <SearchInput placeholder="Search..." />
        </div>
      </div>

      <NodeTree treeData={data} isLoading={isRefetching} refetch={refetch} sponsor={true}/>
    </>
  );
}
