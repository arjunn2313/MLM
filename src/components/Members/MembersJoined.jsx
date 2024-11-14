import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function MembersJoined() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-3/4 mr-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-blue-600">{chartTitle}</h2>
        <select
          className="p-2 border rounded"
          onChange={handleChange}
          value={timePeriod}
        >
          <option value="Week">Week</option>
          {/* <option value="Month">Month</option> */}
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <div className="mt-6 h-64">
        {loading ? (
          <div>
            <Spinners />
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
