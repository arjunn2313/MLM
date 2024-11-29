import React, { useState } from "react";
import { useSubProductSales } from "../../../hooks/useProduct";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import FilterSelect from "../../Filter/Select";
import LoadingBox from "../../Loaders/LoadingBox";

const COLORS = ["#0078ff", "#a3d1ff", "#85e1ed"];

export default function DonutChart({ category }) {
  const [interval, setInterval] = useState("week");

  const { data,isLoading } = useSubProductSales({ category, interval });

  const handleChange = (selectedInterval) => {
    setInterval(selectedInterval);
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg border border-blue-500">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-primary text-xl font-bold">Revenue</h3>
        <div className="relative">
          <FilterSelect
            options={["week", "month", "year"]}
            selectedValue={interval}
            onChange={handleChange}
          />
        </div>
      </div>

      {isLoading ? (
        <LoadingBox width="w-full" height="h-64" rounded="rounded-md" />
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-1/2 flex justify-center items-center">
            <PieChart width={200} height={290}>
              <Pie
                data={data?.salesData}
                dataKey="totalSales"
                nameKey="productCategory"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                startAngle={90}
                endAngle={-270}
              >
                {data?.salesData?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="w-1/2 flex flex-col gap-6 text-sm">
            {data?.salesData?.map((entry, index) => (
              <div key={index} className="flex items-center mb-2">
                <div
                  className="w-6 h-6 mr-2 rounded-md"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <div className="flex flex-col ml-5 gap-2">
                  <span
                    className={`text-blue-${600 - index * 100} font-semibold`}
                  >
                    {entry.productCategory}
                  </span>
                  <span>Rs.{entry.totalSales.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
