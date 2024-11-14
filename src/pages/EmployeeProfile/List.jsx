import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import FilterSelect from "../../components/Filter/Select";
import SearchInput from "../../components/Filter/Search";
import ActionButton from "../../components/Button/ActionButton";
import { EmployeeHeaders as headers } from "../../constatnts/TableHeadings";
import Heading from "../../components/Headings/Headings";
import { useEmployeeList } from "../../hooks/useEmployee";
import Pagination from "../../components/Pagination/Pagination";

import LoadingPlaceholder from "../../components/loaders/TableSkelton";

export default function List() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useEmployeeList(
    currentPage,
    selectedStatus,
    searchQuery
  );

  const totalPages = data?.totalPages || 1;

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const statusColors = {
    active: "text-green-600",
    inactive: "text-red-600",
    "partially filled": "text-yellow-500",
  };

  return (
    <React.Fragment>
      <div className="container bg-white mx-auto p-4 ">
        {/* HEADER SECTION */}
        <div className="grid grid-cols-2 mb-4">
          <div className="flex items-center  gap-16">
            <Heading text="Employee List" />
            <FilterSelect
              type="Status"
              options={["All", "active", "inactive", "partially filled"]}
              selectedValue={selectedStatus}
              onChange={handleStatusChange}
            />
          </div>

          <div className="flex items-center justify-end space-x-5">
            <SearchInput
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <ActionButton buttonText="New Employee" to="create" />
          </div>
        </div>

        {/* TABLE */}
        {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <div className="overflow-x-auto min-h-80">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {headers.map((header, index) => (
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
                {data?.data?.map((data, index) => (
                  <tr key={index} className="border-t block md:table-row">
                    <td className="p-2 py-4 block md:table-cell">
                      {index + 1}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {data.employeeCode}
                    </td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.name}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {data.designation}
                    </td>
                    <td
                      className={`p-2 block md:table-cell ${
                        statusColors[data.status] || ""
                      }`}
                    >
                      {data.status}
                    </td>
                    <td className="p-2 block md:table-cell">
                      <Link
                        to={`preview/${data._id}`}
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

      {/* PAGINATION */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
}
