import React, { useState } from "react";
import { useSposorList } from "../../../../../hooks/useSection";
import { Link, useParams } from "react-router-dom";
import TablePlaceholder from "../../../../../components/loaders/TableSkelton";
import SearchInput from "../../../../../components/Filter/Search";
import Pagination from "../../../../../components/Pagination/Pagination";
import { sponsorList } from "../../../../../constatnts/TableHeadings";
import TreeImg from "../../../../../assets/Mask group.svg";

export default function SponsorList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { treeName } = useParams();
  const { data, isLoading, error } = useSposorList(
    currentPage,
    searchQuery,
    treeName
  );
  const totalPages = data?.totalPages || 1;

 
  

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <React.Fragment>
      <div className="container bg-white mx-auto p-4 ">
        <div className="flex items-center justify-end space-x-5 mb-4">
          <SearchInput
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* TABLE */}
        {isLoading ? (
          <TablePlaceholder />
        ) : data?.members?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No data available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-h-80">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {sponsorList.map((header, index) => (
                    <th
                      key={index}
                      className="p-2 text-left block md:table-cell"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="block md:table-row-group capitalize">
                {data?.members?.map((data, index) => (
                  <tr key={index} className="border-t block md:table-row">
                    <td className="p-2 py-4 block md:table-cell">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="p-2 block md:table-cell">{data.memberId}</td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.name}
                    </td>

                    {data.isHead ? (
                      <>
                        <td className="p-2 block md:table-cell">Tree Head</td>
                        <td className="p-2 block md:table-cell">NA</td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 block md:table-cell">
                          {data?.sponsorId}
                        </td>
                        <td className="p-2 block md:table-cell">
                          {data?.sponsorLevel}
                        </td>
                      </>
                    )}
                    <td className="p-2 block md:table-cell">
                      {data.placementId}
                    </td>

                    <td className="p-2 block md:table-cell">
                      <Link
                        to={`?tab=Sponsors&tree=sponsortree&memberId=${data?.memberId}&memberName=${data?.name}&sponsorId=${data?.sponsorId}&headName=${data?.sponsorName}`}
                        className="text-primary hover:text-blue-700"
                      >
                        <img
                          src={TreeImg}
                          alt="tree-icon"
                          className="bg-orange-50 p-1 rounded-lg"
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
}
