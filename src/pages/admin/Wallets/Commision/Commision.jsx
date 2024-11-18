import React, { useState } from "react";
import { useFilter } from "../../../../hooks/useSection";
import FilterSelect from "../../../../components/Filter/Select";
import Heading from "../../../../components/Headings/Headings";
import TablePlaceholder from "../../../../components/loaders/TableSkelton";
import { Link } from "react-router-dom";
import SearchInput from "../../../../components/Filter/Search";
import { useMemberList } from "../../../../hooks/useMember";
import { allMemberList } from "../../../../constatnts/TableHeadings";
import Pagination from "../../../../components/Pagination/Pagination";

export default function Commision() {
  const levels = ["All", 0, 1, 2, 3, 4, 5];
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedTreeName, setSelectedTreeName] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const { data: filter, error } = useFilter(selectedDistrict);
  const { data, isLoading } = useMemberList(
    currentPage,
    searchQuery,
    selectedDistrict,
    selectedTreeName,
    selectedLevel
  );
  const totalPages = data?.totalPages || 1;
  const handleDistrictChange = (newValue) => {
    setSelectedDistrict(newValue);
  };

  const handleTreeNameChange = (newValue) => {
    setSelectedTreeName(newValue);
  };

  const handleLevelChange = (newValue) => {
    setSelectedLevel(newValue);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <div className="container bg-white mx-auto p-4 ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center  gap-6">
            <Heading text="Commission" color="default" />
            <FilterSelect
              type="Tree District"
              options={["All", ...(filter?.districtNames || [])]}
              selectedValue={selectedDistrict}
              onChange={handleDistrictChange}
            />
            <FilterSelect
              type="Tree Name"
              options={["All", ...(filter?.sectionNames || [])]}
              selectedValue={selectedTreeName}
              onChange={handleTreeNameChange}
            />
            <FilterSelect
              type="Levels"
              options={levels}
              selectedValue={selectedLevel}
              onChange={handleLevelChange}
            />
          </div>

          <div className="flex items-center justify-end space-x-5">
            <SearchInput
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
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
                    <td className="p-2 block md:table-cell">{data.level}</td>

                    {data.isHead ? (
                      <>
                        <td className="p-2 block md:table-cell">Head</td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 block md:table-cell">
                          {data?.sponsorId}
                        </td>
                      </>
                    )}
                    <td className="p-2 block md:table-cell">
                      {data?.walletBalance}
                    </td>

                    <td className="p-2 block md:table-cell">
                      <Link className="text-blue-500 cursor-pointer border px-3 border-blue-500 rounded-md">
                        Pay
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
