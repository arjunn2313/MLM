import React, { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useProductSales } from "../../../hooks/useProduct";
import FilterSelect from "../../Filter/Select";
import LoadingBox from "../../Loaders/LoadingBox";

export default function SalesChart({ category }) {
  const [interval, setInterval] = useState("week");
  const { data, isLoading } = useProductSales({ category, interval });
  const [yDomain, setYDomain] = useState([0, 300]);
  const handleChange = (interval) => {
    setInterval(interval);
  };

  let dataKey;
  if (interval === "Week") {
    dataKey = "day";
  } else if (interval === "Month") {
    dataKey = "week";
  } else {
    dataKey = "month";
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full h-full mr-6 border border-blue-500">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-primary">Sale's Graph</h2>
        <FilterSelect
          options={["week", "month", "yearly"]}
          selectedValue={interval}
          onChange={handleChange}
        />
      </div>
      <div className="mt-6 h-64">
        {isLoading ? (
          <LoadingBox width="w-full" height="h-64" rounded="rounded-md" />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey={dataKey} axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#A9A9A9", fontSize: 12 }}
                domain={yDomain}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#FFA500"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
