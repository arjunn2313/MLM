import React from "react";

const TablePlaceholder = () => {
  return (
    <div className="animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse block md:table">
          <thead className="block md:table-header-group">
            <tr className="block md:table-row">
              {[...Array(5)].map((_, index) => (
                <th key={index} className="p-2 text-left block md:table-cell">
                  <div className="h-6 bg-gray-300 rounded w-24"></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {[...Array(5)].map((_, rowIndex) => (
              <tr key={rowIndex} className="border-t block md:table-row">
                {[...Array(5)].map((_, colIndex) => (
                  <td key={colIndex} className="p-2 block md:table-cell">
                    <div className="h-6 bg-gray-300 rounded w-full"></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablePlaceholder;
