import React, { useState } from "react";
import Heading from "../../../components/Headings/Headings";
import SearchInput from "../../../components/Filter/Search";
import FilterSelect from "../../../components/Filter/Select";
import TablePlaceholder from "../../../components/loaders/TableSkelton";
import { allIncompleteList } from "../../../constatnts/TableHeadings";
import Pagination from "../../../components/Pagination/Pagination";
import { useAllIncompleteList, useFilter } from "../../../hooks/useSection";
import { Link } from "react-router-dom";
import TreeImg from "../../../assets/Mask group.svg";

export default function IncompletTable() {
  const levels = ["All", 0, 1, 2, 3, 4, 5];
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedTreeName, setSelectedTreeName] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const handleDistrictChange = (newValue) => {
    setSelectedDistrict(newValue);
  };

  const handleTreeNameChange = (newValue) => {
    setSelectedTreeName(newValue);
  };

  const handleLevelChange = (newValue) => {
    setSelectedLevel(newValue);
  };

  const { data,isLoading } = useAllIncompleteList(currentPage,searchQuery,selectedDistrict,selectedTreeName,selectedLevel);
  const { data: filter, error } = useFilter(selectedDistrict);

  console.log(filter);

  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };
  return (
    <React.Fragment>
      <div className="container bg-white mx-auto p-4 ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center  gap-6">
            <Heading text="Incomplete Trees" />
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
        ) : (
          <div className="overflow-x-auto min-h-80">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {allIncompleteList.map((header, index) => (
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
                    <td className="p-2 block md:table-cell">
                      {data.districtName}
                    </td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.treeName}
                    </td>
                    <td className="p-2 block md:table-cell">{data.memberId}</td>
                    <td className="p-2 block md:table-cell">{data?.name}</td>
                    <td className="p-2 block md:table-cell">{data?.level}</td>
                    {data.isHead ? (
                      <>
                        <td className="p-2 block md:table-cell">Head</td>
                      </>
                    ) : (
                      <>
                        <td className="p-2 block md:table-cell">
                          {data?.placementId}
                        </td>
                      </>
                    )}
                    <td className="p-2 block md:table-cell">
                      {data?.children?.length}
                    </td>

                    <td className="p-2 block md:table-cell">
                      <Link
                        to={`${data?.memberId}/tree-view`}
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
