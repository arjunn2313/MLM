import React, { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Heading from "../Headings/Headings";
import FilterSelect from "../Filter/Select";
import { useMemberChart } from "../../hooks/useDashboard";
import LoadingBox from "../Loaders/LoadingBox";

export default function MembersJoined() {
  const [timePeriod, setTimePeriod] = useState("Week");
  const { data, isLoading, error } = useMemberChart(timePeriod);

  const handleChange = (period) => {
    setTimePeriod(period);
  };

  let dataKey, yDomain, chartTitle;
  if (timePeriod === "Week") {
    dataKey = "day";
    yDomain = [0, 50];
    chartTitle = "Weekly Members Joined";
  } else if (timePeriod === "Month") {
    dataKey = "week";
    yDomain = [0, 1000];
    chartTitle = "Monthly Members Joined";
  } else {
    dataKey = "month";
    yDomain = [0, 1500];
    chartTitle = "Yearly Members Joined";
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full   ">
      <div className="flex justify-between items-center">
        <Heading text={chartTitle} />
        <FilterSelect
          options={["Week", "Yearly"]}
          selectedValue={timePeriod}
          onChange={handleChange}
        />
      </div>
      <div className="mt-6 h-64">
        {isLoading ? (
          <div>
            <LoadingBox width="w-full" height="h-64" rounded="rounded-md" />
          </div>
        ) : error ? (
          <div>{error}</div>
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
                dataKey="count"
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
