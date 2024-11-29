import React, { useState } from "react";
import { useFilter } from "../../../hooks/useSection";
import { useDistrictHeads } from "../../../hooks/useDistrict";
import Heading from "../../../components/Headings/Headings";
import ActionButton from "../../../components/Button/ActionButton";
import FilterSelect from "../../../components/Filter/Select";
import TablePlaceholder from "../../../components/loaders/TableSkelton";
import { districtHead } from "../../../constatnts/TableHeadings";
import { Link } from "react-router-dom";
import TreeImg from "../../../assets/Mask group.svg";
import { FaEye } from "react-icons/fa";
import Pagination from "../../../components/Pagination/Pagination";
export default function HeadsList() {
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const handleDistrictChange = (newValue) => {
    setSelectedDistrict(newValue);
  };
  const { data, isLoading, isError } = useDistrictHeads(
    currentPage,
    selectedDistrict
  );
 
  const { data: filter, error } = useFilter(selectedDistrict);

  const totalPages = data?.totalPages || 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <div className="container bg-white mx-auto p-4 ">
        <div className="grid grid-cols-2 mb-4">
          <div className="flex items-center  gap-16">
            <Heading text="District Head" color="default" />
            <FilterSelect
              type="Tree District"
              options={["All", ...(filter?.districtNames || [])]}
              selectedValue={selectedDistrict}
              onChange={handleDistrictChange}
            />
          </div>

          <div className="flex items-center justify-end space-x-5">
            <ActionButton
              buttonText="Register District Head "
              to="registration"
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
          ) :(
          <div className="overflow-x-auto min-h-80">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {districtHead.map((header, index) => (
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
                      {data.name}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {data?.districtSection?.length}
                    </td>

                    <td className="p-2 block md:table-cell ">
                        <div className="flex items-center gap-3">
                      <Link
                        to={`/tree/district/${data.districtName}/${data.districtId._id}`}
                        className="text-primary hover:text-blue-700"
                      >
                        <img
                          src={TreeImg}
                          alt="tree-icon"
                          className="bg-orange-50 p-1 rounded-lg"
                        />
                      </Link>
                      <Link to={`preview/${data?._id}`} className="text-primary hover:text-blue-700">
                      <FaEye />
                      </Link>
                      </div>
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
