import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useProductCategory,
  useProductLists,
} from "../../../../hooks/useProduct";
import Heading from "../../../../components/Headings/Headings";
import FilterSelect from "../../../../components/Filter/Select";
import SearchInput from "../../../../components/Filter/Search";
import ActionButton from "../../../../components/Button/ActionButton";
import Pagination from "../../../../components/Pagination/Pagination";
import TablePlaceholder from "../../../../components/loaders/TableSkelton";
import { crackersList, snacksList } from "../../../../constatnts/TableHeadings";
import moment from "moment";

export default function CrackersList() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: filter } = useProductCategory("Crackers");
  const { data, isLoading } = useProductLists(
    currentPage,
    searchQuery,
    "Crackers",
    category,
    status
  );

  console.log(data);

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
                  {crackersList.map((header, index) => (
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
                  <tr
                    key={index}
                    className="border-t block md:table-row cursor-pointer"
                    onClick={() =>
                      navigate(`/crackers/list/preview/${data?._id}`)
                    }
                  >
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
                    {data?.varient?.variants?.map((itm,indx) => (
                      <React.Fragment key={indx}>
                        <td className="p-2 py-4 block md:table-cell">
                          {itm?.value} {itm?.unit}
                        </td>
                        <td className="p-2 py-4 block md:table-cell">
                          {itm?.pieces}
                        </td>{" "}
                        <td className="p-2 py-4 block md:table-cell">
                          {itm?.price} Rs
                        </td>{" "}
                        <td className="p-2 py-4 block md:table-cell">
                          {data?.gst} %
                        </td>{" "}
                        <td className="p-2 py-4 block md:table-cell">
                          {itm?.mlmDiscount}%
                        </td>{" "}
                        <td className="p-2 py-4 block md:table-cell">
                          {itm?.referralDiscount}%
                        </td>
                        <td className="p-2 py-4 block md:table-cell">
                          {itm?.normalDiscount}%
                        </td>
                      </React.Fragment>
                    ))}

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
