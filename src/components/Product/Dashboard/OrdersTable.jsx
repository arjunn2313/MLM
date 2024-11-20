import React from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../Headings/Headings";
import TablePlaceholder from "../../loaders/TableSkelton";
import { ordersDash } from "../../../constatnts/TableHeadings";
import { useFetchOrders } from "../../../hooks/useOrder";

export default function OrdersTable() {
  const navigate = useNavigate();

  const category = "Snacks";

  const { data, isLoading } = useFetchOrders(category);

  console.log(data);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-primary">
      <div className="flex justify-between items-center mb-4">
        <Heading text="Orders" />
        <button
          className=" text-blue-500 border border-blue-500 py-2 px-4 rounded"
          onClick={() => navigate("/orders")}
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
                {ordersDash.map((header, index) => (
                  <th key={index} className="p-2 text-left block md:table-cell">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="block md:table-row-group capitalize truncate">
              {data?.orders?.map((data, index) => (
                <tr key={index} className="border-t block md:table-row">
                  <td className="p-2 py-4 block md:table-cell">{index + 1}</td>
                  <td className="p-2 block md:table-cell">
                    {data.shippingAddress?.firstName}
                  </td>
                  <td className="p-2 block md:table-cell truncate">
                    {data.shippingAddress?.district}
                  </td>
                  <td className="p-2 block md:table-cell truncate">
                    {data.shippingAddress?.phoneNumber}
                  </td>
                  {data.items?.map((itm) => (
                    <td className="p-2 block md:table-cell truncate">
                      {itm?.product?.productType}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
