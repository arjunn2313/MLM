import React, { useState } from "react";
import BackButton from "../../../components/Button/BackButton";
import Heading from "../../../components/Headings/Headings";
import { Link, useSearchParams } from "react-router-dom";
import { useLevel } from "../../../hooks/useLevel";
import TablePlaceholder from "../../../components/loaders/TableSkelton";
import { allMemberList } from "../../../constatnts/TableHeadings";
import SearchInput from "../../../components/Filter/Search";
import Pagination from "../../../components/Pagination/Pagination";
import { IoIosEye } from "react-icons/io";

export default function LevelsAnalyzer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("tab") || "new-members";

 

  const { data, isLoading } = useLevel(currentPage, searchQuery, selectedTab);

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="flex items-center gap-5 mb-4">
        <BackButton path={-1} />
        <Heading text="Levels" />
      </div>

      <div className="bg-white rounded-xl shadow-md px-5 ">
        <div className="flex flex-row sm:flex-row justify-between items-center">
          <ul className="flex flex-nowrap gap-4 sm:gap-10 text-gray-600 font-medium overflow-x-auto">
            {[
              "new-members",
              "level1-members",
              "level2-members",
              "level3-members",
              "level4-members",
              "level5-members",
              "level6-members",
            ].map((tab, index) => (
              <li
                key={index}
                className={`p-4 cursor-pointer whitespace-nowrap text-sm sm:text-base md:text-md ${
                  selectedTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : ""
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab === "new-members" ? "New" : `Level 0${index}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Table */}
      <div className="container bg-white mx-auto p-4 mt-4 ">
        <div className="flex items-center justify-end space-x-5 mb-3">
          <SearchInput
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {isLoading ? (
          <TablePlaceholder />
        ) : data?.members?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No data available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-h-80  ">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {allMemberList.map((header, index) => (
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
                    <td className="p-2 block md:table-cell truncate">
                      {data.level}
                    </td>

                    {data.sponsorId ? (
                      <>
                        <td className="p-2 block md:table-cell">
                          {data?.sponsorId}
                        </td>
                        <td className="p-2 block md:table-cell">
                          {data?.placementId}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 block md:table-cell">Head</td>
                        <td className="p-2 block md:table-cell">Head</td>
                      </>
                    )}

                    <td className="p-2 block md:table-cell">
                      <Link
                        to={`/register/preview/${data?.memberId}`}
                        className="text-primary hover:text-blue-700"
                      >
                        {" "}
                        <IoIosEye />
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
    </>
  );
}
