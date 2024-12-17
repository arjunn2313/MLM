import React from "react";
import reportImg from "../../../assets/report.png";

export default function Reports() {
  const report = [
    "Joining Fee Report",
    "Sales Report",
    "Canceled Orders Report",
    "E-wallet Report",
    "Referral Report",
    "Commission Report",
    "Expense Report",
  ];
  return (
    <div className="grid grid-cols-3 gap-4">
      {report.map((itm) => (
        <div className="border rounded-lg bg-white border-blue-500 grid grid-cols-3 p-5">
          <div className="flex justify-center items-center col-span-1"><img src={reportImg}/></div>
          <div className="text-blue-500 text-lg font-medium flex justify-start items-center col-span-2">{itm}</div>
          </div>
      ))}
    </div>
  );
}
