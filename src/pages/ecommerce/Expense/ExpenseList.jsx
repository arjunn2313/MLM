import React, { useEffect, useState } from "react";
import { useCreateExpense, useExpenseCategory, useExpenses } from "../../../hooks/useExpense";
import FilterSelect from "../../../components/Filter/Select";
import SearchInput from "../../../components/Filter/Search";
import TablePlaceholder from "../../../components/loaders/TableSkelton";
import { expenseList } from "../../../constatnts/TableHeadings";
import Pagination from "../../../components/Pagination/Pagination";
import Heading from "../../../components/Headings/Headings";
import moment from "moment";
import ActionButton from "../../../components/Button/ActionButton";
import ExpenseForm from "../../../components/Expense/ExpenseForm";

export default function ExpenseList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { data, isLoading } = useExpenses(
    currentPage,
    searchQuery,
    category,
    fromDate,
    toDate
  );
  const { data: filter } = useExpenseCategory();
  const {mutate,isPending} = useCreateExpense()

  const totalPages = data?.totalPages || 1;

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    
  };

  const onSubmit = (data) => {
    mutate(data,{
        onSuccess:()=>handleCloseModal()
    })
  };

  return (
    <React.Fragment>
      <div className="container bg-white mx-auto p-4 ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center  gap-6">
            <Heading text="Expense" color="default" />

            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-0 border rounded-lg px-1 w-full lg:w-auto">
              <label htmlFor="from-date" className="text-gray-700">
                From:
              </label>
              <input
                type="date"
                id="from-date"
                className="border-0 focus:ring-0 rounded px-2 py-1"
                max={date}
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-2 lg:space-y-0 lg:space-x-0 border rounded-lg px-1 w-full lg:w-auto">
              <label htmlFor="to-date" className="text-gray-700">
                To:
              </label>
              <input
                type="date"
                id="to-date"
                className="border-0 focus:ring-0 rounded px-2 py-1"
                max={date}
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>

            <FilterSelect
              type="Category"
              options={["All", ...(filter || [])]}
              selectedValue={category}
              onChange={(category) => setCategory(category)}
            />
          </div>

          <div className="flex items-center justify-end space-x-5">
            <SearchInput
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <span onClick={() =>handleOpenModal()}>
              <ActionButton buttonText="Add Expense" />
            </span>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <TablePlaceholder />
        ) : data?.expenses?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No data available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-h-80">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {expenseList.map((header, index) => (
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
                {data?.expenses?.map((data, index) => (
                  <tr key={index} className="border-t block md:table-row">
                    <td className="p-2 py-4 block md:table-cell">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {" "}
                      {moment(new Date(data?.date)).format("DD-MM-YYYY")}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {data?.category}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {data?.subCategory}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {data?.spentFor}
                    </td>
                    <td className="p-2 block md:table-cell">{data?.amount}</td>

                    <td
                      className={`p-2 capitalize font-medium ${
                        data.status === "paid"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {data.status}
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

      <ExpenseForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={onSubmit}
        options={filter}
        loading={isPending}
      />
    </React.Fragment>
  );
}
