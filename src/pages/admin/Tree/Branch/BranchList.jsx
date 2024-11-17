import React, { useState } from "react";
import BackButton from "../../../../components/Button/BackButton";
import Heading from "../../../../components/Headings/Headings";
import { Link, useParams } from "react-router-dom";
import SearchInput from "../../../../components/Filter/Search";
import ActionButton from "../../../../components/Button/ActionButton";
import { sectionList } from "../../../../constatnts/TableHeadings";
import { useSectionList } from "../../../../hooks/useSection";
import TreeImg from "../../../../assets/Mask group.svg";
import TablePlaceholder from "../../../../components/loaders/TableSkelton";
import Pagination from "../../../../components/Pagination/Pagination";
export default function BranchList() {
  const { name, districtId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { data, isLoading,error } = useSectionList(
    limit,
    currentPage,
    searchQuery,
    districtId
  );
   
   
   
  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto">
      <BackButton path={-1} />
      <div className="bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <Heading text={name} />
          <div className="flex items-center justify-end space-x-5">
            <SearchInput
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <ActionButton buttonText="New Tree" to="new-tree" />
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <TablePlaceholder />
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No data available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-h-80">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {sectionList.map((header, index) => (
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
                {data?.sections?.map((data, index) => (
                  <tr key={index} className="border-t block md:table-row">
                    <td className="p-2 py-4 block md:table-cell">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="p-2 block md:table-cell">{data.treeName}</td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.headName}
                    </td>
                    <td className="p-2 block md:table-cell">{data.levels}</td>
                    <td className="p-2 block md:table-cell">
                      {data.totalMembers}
                    </td>
                    <td className="p-2 block md:table-cell">
                      <Link
                        to={`tree/${data.sectionId}/${data.memberId}/${data.treeName}`}
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
    </div>
  );
}
