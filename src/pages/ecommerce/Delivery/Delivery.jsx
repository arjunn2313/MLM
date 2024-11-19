import React, { useState } from "react";
import BackButton from "../../../components/Button/BackButton";
import Heading from "../../../components/Headings/Headings";
import { useSearchParams } from "react-router-dom";
import { deliveryList } from "../../../constatnts/TableHeadings";
import TablePlaceholder from "../../../components/loaders/TableSkelton";
import { useFetchOrders, useOrderDispatch } from "../../../hooks/useOrder";
import SearchInput from "../../../components/Filter/Search";
import moment from "moment";
import Pagination from "../../../components/Pagination/Pagination";
import DeliveryForm from "../../../components/Delivery/DeliveryForm";

export default function Delivery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTab = searchParams.get("tab") || "Snacks";
  const [currentPage, setCurrentPage] = useState(1);
  const orderStatus = "Completed";
  const date = null;
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading } = useFetchOrders(
    currentPage,
    searchQuery,
    orderStatus,
    date,
    selectedTab
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const { mutate, isPending } = useOrderDispatch();

  const handleOpenModal = (data) => {
    setIsModalOpen(true);
    setSelectedData(data);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
  };

  const totalPages = data?.totalPages || 1;

  const onSubmit = (data) => {
    mutate(
      { id: selectedData._id, data },
      {
        onSuccess: () => handleCloseModal(),
      }
    );
  };

  return (
    <div className="container mx-auto ">
      <div className="flex items-center gap-5 mb-3">
        <BackButton path={-1} />
        <Heading text="Delivery Tracking" />
      </div>
      {/* TAB */}
      <div className="bg-white rounded-xl shadow-md px-5 ">
        <div className="flex flex-row sm:flex-row justify-between items-center">
          <ul className="flex flex-nowrap gap-4 sm:gap-10 text-gray-600 font-medium overflow-x-auto">
            {["Snacks", "Crackers"].map((tab, index) => (
              <li
                key={index}
                className={`p-4 cursor-pointer whitespace-nowrap text-sm sm:text-base md:text-md ${
                  selectedTab === tab
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : ""
                }`}
                onClick={() => handleTabChange(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Table */}
      <div className="container bg-white mx-auto p-4 mt-4 ">
        <div className="flex items-center justify-end space-x-5 mb-3">
          <SearchInput
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {isLoading ? (
          <TablePlaceholder />
        ) : data?.orders?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No data available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-h-80  ">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {deliveryList.map((header, index) => (
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
                {data?.orders?.map((data, index) => (
                  <tr key={index} className="border-t block md:table-row">
                    <td className="p-2 py-4 block md:table-cell">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {moment(new Date(data?.createdAt)).format("DD-MM-YYYY")}
                    </td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.orderId}
                    </td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.shippingAddress?.firstName}
                    </td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.shippingAddress?.city}
                    </td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.items?.length}
                    </td>
                    <td className="p-2 block md:table-cell truncate">
                      {data.totalAmount}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {data.trackingId || (
                        <button
                          className="text-blue-500 underline"
                          onClick={() => handleOpenModal(data)}
                        >
                          Enter Tracking Id
                        </button>
                      )}
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
        onPageChange={(page) => setCurrentPage(page)}
      />

      <DeliveryForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={onSubmit}
        data={selectedData}
        loading={isPending}
      />
    </div>
  );
}
