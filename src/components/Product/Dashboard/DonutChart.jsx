import React, { useState } from "react";
import { useSubProductSales } from "../../../hooks/useProduct";
import { PieChart, Pie, Cell, Tooltip } from "recharts";


const COLORS = ["#0078ff", "#a3d1ff", "#85e1ed"]; 

export default function DonutChart() {
  const { data } = useSubProductSales();
  const [timePeriod, setTimePeriod] = useState("Week")
  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);  
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg   border border-blue-500">
      {/* Header with Title and Dropdown */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-primary text-xl font-bold">Revenue</h3>
        <div className="relative">
          <button
            className="border rounded-md px-2 py-1 text-sm text-blue-600 border-blue-600 flex items-center"
            onClick={() =>
              handleTimePeriodChange(
                timePeriod === "Week"
                  ? "Month"
                  : timePeriod === "Month"
                  ? "Year"
                  : "Week"
              )
            }
          >
            {timePeriod}
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex items-center justify-center">
        {/* Donut Chart */}
        <div className="w-1/2 flex justify-center items-center">
          <PieChart width={200} height={290}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              startAngle={90}
              endAngle={-270}
            >
              {data?.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Legend Section */}
        <div className="w-1/2 flex flex-col gap-6 text-sm">
          {data?.map((entry, index) => (
            <div key={index} className="flex items-center mb-2">
              <div
                className="w-6 h-6 mr-2 rounded-md"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <div className="flex flex-col ml-5 gap-2">
                <span
                  className={`text-blue-${600 - index * 100} font-semibold`}
                >
                  {entry.name}
                </span>
                <span>Rs.{entry.value.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
