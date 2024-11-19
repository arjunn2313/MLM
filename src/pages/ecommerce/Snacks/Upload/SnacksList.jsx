import React, { useState } from "react";
import {
  useProductCategory,
  useProductLists,
} from "../../../../hooks/useProduct";
import Heading from "../../../../components/Headings/Headings";
import FilterSelect from "../../../../components/Filter/Select";
import SearchInput from "../../../../components/Filter/Search";
import ActionButton from "../../../../components/Button/ActionButton";
import { snacksList } from "../../../../constatnts/TableHeadings";
import TablePlaceholder from "../../../../components/loaders/TableSkelton";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "../../../../components/Pagination/Pagination";

export default function SnacksList() {
  const navigate = useNavigate()
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: filter } = useProductCategory("Snacks");
  const { data, isLoading } = useProductLists(
    currentPage,
    searchQuery,
    "Snacks",
    category,
    status
  );

  const totalPages = data?.totalPages || 1;

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleStatusChange = (status) => {
    setStatus(status);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <div className="container bg-white mx-auto p-4  ">
        <div className="grid grid-cols-2 mb-4">
          <div className="flex items-center gap-8">
            <Heading text="Product Details" color="default" />
            <FilterSelect
              type="Category"
              options={["All", ...(filter?.categories || [])]}
              selectedValue={category}
              onChange={handleCategoryChange}
            />
            <FilterSelect
              type="Status"
              options={["All", "active", "inactive", "out of delivery"]}
              selectedValue={status}
              onChange={handleStatusChange}
            />
          </div>

          <div className="flex items-center justify-end space-x-5">
            <SearchInput
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ActionButton buttonText="New Product" to="add" />
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <TablePlaceholder />
        ) : data?.products?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No data available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-h-80">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {snacksList.map((header, index) => (
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
                {data?.products?.map((data, index) => (
                  <tr key={index} className="border-t block md:table-row cursor-pointer" onClick={()=>navigate(`/snacks/list/preview/${data?._id}`)}>
                    <td className="p-2 py-4 block md:table-cell">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="p-2 py-4 block md:table-cell">
                      {moment(new Date(data?.createdAt)).format("DD-MM-YYYY")}
                    </td>
                    <td className="p-2 py-4 block md:table-cell">
                      {data?.productCode}
                    </td>
                    <td className="p-2 py-4 block md:table-cell">
                      {data?.productCategory}
                    </td>
                    <td className="p-2 py-4 block md:table-cell">
                      {data?.productName}
                    </td>
                    <td className="p-2 py-4 block md:table-cell">
                      {data?.weight.map((itm, idx) => (
                        <div key={idx}>
                          {itm.value} {itm.unit}
                        </div>
                      ))}
                    </td>

                    <td className="p-2 py-4 block md:table-cell">
                      {data?.weight.map((itm, idx) => (
                        <div key={idx}>{itm.price} Rs</div>
                      ))}
                    </td>

                    <td className="p-2 py-4 block md:table-cell">
                      {data?.gst}
                    </td>

                    <td className="p-2 block md:table-cell">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          data.status === "active"
                            ? "bg-green-100 text-green-800"
                            : data?.status === "inactive"
                            ? "bg-yellow-100 text-red-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {data.status}
                      </span>
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
