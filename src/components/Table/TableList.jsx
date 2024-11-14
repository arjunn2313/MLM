import React from "react";
import { FaEye } from "react-icons/fa";

const TableList = ({ headers, data, getRowKey, renderRow, statusColors }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border-collapse block md:table">
      <thead className="block md:table-header-group">
        <tr className="block md:table-row">
          {headers.map((header, index) => (
            <th key={index} className="p-2 text-left block md:table-cell">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="block md:table-row-group">
        {data?.map((item, index) => (
          <tr key={getRowKey(item)} className="border-t block md:table-row">
            {renderRow(item, index, statusColors)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TableList;
