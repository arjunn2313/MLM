import React, { useEffect, useState } from "react";
import Heading from "../../../components/Headings/Headings";
import FilterSelect from "../../../components/Filter/Select";
import SearchInput from "../../../components/Filter/Search";
import { useUserEarning } from "../../../hooks/useUser";
import TablePlaceholder from "../../../components/loaders/TableSkelton";
import { userearningHistory } from "../../../constatnts/TableHeadings";
import moment from "moment";

export default function EarningHistory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [fromDate, setFromDate] = useState("");
  const [category, setCategory] = useState();
  const [toDate, setToDate] = useState("");
  const { data, isLoading } = useUserEarning();

  console.log(data);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  return (
    <React.Fragment>
      <div className="container bg-white mx-auto p-4 ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center  gap-6">
            <Heading text="Earnings History" />

            <FilterSelect
              type="Earnings Type "
              options={["All"]}
              selectedValue={category}
              onChange={(category) => setCategory(category)}
            />

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
        ) : data?.commissionHistory?.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No data available.</p>
          </div>
        ) : (
          <div className="overflow-x-auto min-h-80">
            <table className="min-w-full border-collapse block md:table">
              <thead className="block md:table-header-group">
                <tr className="block md:table-row">
                  {userearningHistory.map((header, index) => (
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
                {data?.commissionHistory?.map((data, index) => (
                  <tr key={index} className="border-t block md:table-row">
                    <td className="p-2 py-4 block md:table-cell">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {" "}
                      {moment(new Date(data?.date)).format("DD-MM-YYYY")}
                    </td>
                    <td className="p-2 block md:table-cell">
                      {data?.description}
                    </td>
                    <td className="p-2 block md:table-cell">{data?.amount} Rs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
