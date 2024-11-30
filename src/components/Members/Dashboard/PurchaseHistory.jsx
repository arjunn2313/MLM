import React from "react";
import Heading from "../../Headings/Headings";

const PurchaseHistory = () => {
  return (
    <div className="p-4 bg-white rounded-xl border-2 h-full border-blue-400">
      <Heading text="Purchase History" />
      <table className="min-w-full border-collapse block md:table mt-4">
        <thead className="block md:table-header-group">
          <tr className="block md:table-row">
            <th className="p-2 text-left block md:table-cell">Sl. no.</th>
            <th className="p-2 text-left block md:table-cell">Purchase Date</th>
            <th className="p-2 text-left block md:table-cell">Amount</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group capitalize">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <tr key={index} className="border-t block md:table-row">
              <td className="p-2 block md:table-cell">{item}</td>
              <td className="p-2 block md:table-cell">07/12/2023</td>
              <td className="p-2 block md:table-cell">Rs. 200</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistory;
