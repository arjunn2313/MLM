import React, { useState } from "react";
import Heading from "../../../components/Headings/Headings";
import FilterSelect from "../../../components/Filter/Select";
import SearchInput from "../../../components/Filter/Search";
import ActionButton from "../../../components/Button/ActionButton";
import { LeaveSettings } from "../../../constatnts/TableHeadings";

export default function LeaveList() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  return (
    <React.Fragment>
      <div className="container bg-white mx-auto p-4 ">
        <div className="grid grid-cols-2 mb-4">
          <div className="flex items-center  gap-16">
            <Heading text="Leave Settings" />
          </div>

          <div className="flex items-center justify-end space-x-5">
            <FilterSelect
              type="Status"
              options={["All", "active", "inactive", "partially filled"]}
              selectedValue={selectedStatus}
              onChange={handleStatusChange}
            />
            <SearchInput
              placeholder="Search employees..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <ActionButton buttonText="New Leave" to="create" />
          </div>
        </div>

        <div className="overflow-x-auto min-h-80">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {LeaveSettings.map((header, index) => (
                    <th
                      key={index}
                      className="p-2 text-left block md:table-cell"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              {/* <tbody className="block md:table-row-group capitalize">
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
              </tbody> */}
            </table>
          </div>
      </div>
    </React.Fragment>
  );
}
