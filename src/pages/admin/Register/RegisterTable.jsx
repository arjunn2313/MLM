import React, { useState } from "react";
import Heading from "../../../components/Headings/Headings";
import SearchInput from "../../../components/Filter/Search";
import ActionButton from "../../../components/Button/ActionButton";
import { useMemberList } from "../../../hooks/useMember";
import TablePlaceholder from "../../../components/loaders/TableSkelton";
import { registerdList } from "../../../constatnts/TableHeadings";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import moment from "moment";
import Pagination from "../../../components/Pagination/Pagination";

export default function RegisterTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const { data, isLoading, error } = useMemberList(
    limit,
    currentPage,
    searchQuery
  );

  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <div className="container bg-white mx-auto p-4 ">
        <div className="grid grid-cols-2 mb-4">
          <div className="flex items-center  gap-16">
            <Heading text="Registered Members" />
          </div>

          <div className="flex items-center justify-end space-x-5">
            <SearchInput
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <ActionButton buttonText="New Registration" to="form" />
          </div>
        </div>
        {/* TABLE */}
        {isLoading ? (
          <TablePlaceholder />
        ) : (
          <div className="overflow-x-auto min-h-80">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {registerdList.map((header, index) => (
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
                    <td className="p-2 block md:table-cell">
                      {data.phoneNumber}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {moment(new Date(data?.createdAt)).format("DD-MM-YYYY")}
                    </td>
                    {data.isHead ? (
                      <>
                        <td className="p-2 block md:table-cell">Tree Head</td>
                        <td className="p-2 block md:table-cell">Tree Head</td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 block md:table-cell">
                          {data?.sponsorId}
                        </td>
                        <td className="p-2 block md:table-cell">
                          {data?.placementId}
                        </td>
                      </>
                    )}
                    <td className="p-2 block md:table-cell">
                      {data.joiningFee}
                    </td>
                    <td
                      className={`p-2 block md:table-cell font-semibold ${
                        data?.status === "Un Approved"
                          ? "text-orange-500"
                          : "text-green-500"
                      }`}
                    >
                      {data.status}
                    </td>

                    <td className="p-2 block md:table-cell">
                      <Link
                        to={`preview/${data.memberId}`}
                        className="text-primary hover:text-blue-700"
                      >
                        <FaEye />
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
