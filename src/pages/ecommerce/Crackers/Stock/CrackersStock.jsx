import React, { useState } from "react";
import Heading from "../../../../components/Headings/Headings";
import FilterSelect from "../../../../components/Filter/Select";
import SearchInput from "../../../../components/Filter/Search";
import ActionButton from "../../../../components/Button/ActionButton";
import {
  useProductCategory,
  useProductLists,
} from "../../../../hooks/useProduct";
import { crackersStockList } from "../../../../constatnts/TableHeadings";
import TablePlaceholder from "../../../../components/loaders/TableSkelton";
import { Link } from "react-router-dom";
import moment from "moment";
import Pagination from "../../../../components/Pagination/Pagination";

export default function CrackersStock() {
  const [category, setCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: filter } = useProductCategory("Crackers");
  const { data, isLoading } = useProductLists(
    currentPage,
    searchQuery,
    "Crackers",
    category
  );
  const totalPages = data?.totalPages || 1;

  console.log(data);

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(data);

  return (
    <React.Fragment>
      <div className="container bg-white mx-auto p-4 ">
        <div className="grid grid-cols-2 mb-4">
          <div className="flex items-center gap-20">
            <Heading text="Stock" color="default" />
            <FilterSelect
              type="Category"
              options={["All", ...(filter?.categories || [])]}
              selectedValue={category}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="flex items-center justify-end space-x-5">
            <SearchInput
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ActionButton buttonText="New Product" to="new" />
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
                  {crackersStockList.map((header, index) => (
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
                  <tr key={index} className="border-t block md:table-row">
                    <td className="p-2 py-4 block md:table-cell">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="p-2 py-4 block md:table-cell">
                      {data?.productCode}
                    </td>
                    <td className="p-2 py-4 block md:table-cell">
                      {data?.productCategory}
                    </td>
                    <td className="p-2 py-4 block md:table-cell max-w-xs clamp-text">
                      {data?.productName}
                    </td>

                    <td className="p-2 py-4 block md:table-cell">
                      {data?.varient?.totalQuantity}{" "}
                      {data?.varient?.totalQuantityUnit}
                    </td>
                    {data.varient?.variants?.map((data,ind) => (
                      <td className="p-2 py-4 block md:table-cell" key={ind}>
                        {data?.value} {data?.unit}
                      </td>
                    ))}

                    <td className="p-2 py-4 block md:table-cell">
                      {" "}
                      {moment(new Date(data?.updatedAt)).format("DD-MM-YYYY")}
                    </td>

                    <td className="p-2 block md:table-cell">
                      <Link
                        to={`edit/${data?._id}`}
                        className="text-primary hover:text-blue-700 border p-2 rounded-md border-primary"
                      >
                        Add More
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
