import React from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../Headings/Headings";

const ExpenseHistory = ({ member }) => {
  const navigate = useNavigate();
  return (
    <div className="p-4 bg-white rounded-xl border-2 border-blue-400">
      <div className="flex items-center justify-between ">
        <Heading text="Earning History" />

        <button
          className="border-2 border-blue-400 p-1 px-3 rounded-lg text-md text-blue-500"
          onClick={() =>
            navigate(
              `?tab=MemberList&tree=history&memberId=${member?.memberId}`
            )
          }
        >
          View All
        </button>
      </div>
      <table className="min-w-full border-collapse block md:table mt-4">
      <thead className="block md:table-header-group">
      <tr className="block md:table-row">
            <th className="p-2 text-left block md:table-cell">Sl. no.</th>
            <th className="p-2 text-left block md:table-cell">Earning Date</th>
            <th className="p-2 text-left block md:table-cell">Earning Type</th>
            <th className="p-2 text-left block md:table-cell">Amount</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group capitalize">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <tr key={index} className="border-t block md:table-row">
              <td className="p-2 block md:table-cell">{item}</td>
              <td className="p-2 block md:table-cell">01/07/2024</td>
              <td className="p-2 block md:table-cell">Office Supplies</td>
              <td className="p-2 block md:table-cell">Rs. 100</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseHistory;
