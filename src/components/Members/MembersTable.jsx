import React from "react";
import Heading from "../Headings/Headings";
import { useNavigate } from "react-router-dom";
import { useMemberList } from "../../hooks/useMember";
import { memberList } from "../../constatnts/TableHeadings";
import TablePlaceholder from "../loaders/TableSkelton";

export default function MembersTable() {
  const navigate = useNavigate();
  const limit = 5;
  const { data, isLoading, error } = useMemberList(limit);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-5">
      <div className="flex justify-between items-center mb-4">
        <Heading text="Member List" />
        <button
          className=" text-blue-500 border border-blue-500 py-2 px-4 rounded"
          onClick={() => navigate("/members")}
        >
          View All
        </button>
      </div>
      {isLoading ? (
        <TablePlaceholder />
      ) : (
        <div className="overflow-x-auto min-h-80">
          <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
              <tr className="block md:table-row">
                {memberList.map((header, index) => (
                  <th key={index} className="p-2 text-left block md:table-cell">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="block md:table-row-group capitalize truncate">
              {data?.members?.map((data, index) => (
                <tr key={index} className="border-t block md:table-row">
                  <td className="p-2 py-4 block md:table-cell">{index + 1}</td>
                  <td className="p-2 block md:table-cell">
                    {data.districtName}
                  </td>
                  <td className="p-2 block md:table-cell truncate">
                    {data.treeName}
                  </td>
                  <td className="p-2 block md:table-cell">{data.memberId}</td>
                  <td className="p-2 block md:table-cell truncate">
                    {data.name}
                  </td>
                  <td className="p-2 block md:table-cell">{data.level}</td>
                  <td className="p-2 block md:table-cell">{data.sponsorId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
