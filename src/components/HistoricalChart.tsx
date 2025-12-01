"use client";

import {
  AreaChart,
  Area,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useState, useMemo } from "react";

interface Props {
  data: { date: string; rate: number }[];
  symbol: string;
}

const ranges = [
  { label: "7D", days: 7 },
  { label: "14D", days: 14 },
  { label: "1M", days: 30 },
  { label: "6M", days: 180 },
  { label: "1Y", days: 365 },
];

export default function HistoricalChart({ data, symbol }: Props) {
  const [range, setRange] = useState("14D");

  const filteredData = useMemo(() => {
    const days = ranges.find((r) => r.label === range)?.days as number;
    return data.slice(-days);
  }, [range, data]);

  return (
    <div className="w-full pt-2">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {symbol} exchange rate
      </h2>

      {/* Time Range Buttons */}
      <div className="flex gap-2 mb-2">
        {ranges.map((r) => (
          <button
            key={r.label}
            onClick={() => setRange(r.label)}
            className={`
              px-3 py-1 rounded-full text-sm 
              transition 
              ${
                range === r.label
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }
            `}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="w-full h-72 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={filteredData}>
            {/* Fix left space - Y axis narrow size */}
            <YAxis
              width={35}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "currentColor", fontSize: 12 }}
              domain={[
                (dataMin: number) => dataMin * 0.98,
                (dataMax: number) => dataMax * 1.02,
              ]}
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "currentColor", fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              minTickGap={20}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(20,20,20,0.85)",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              labelStyle={{ color: "#fff" }}
            />

            {/* Gradient fill */}
            <defs>
              <linearGradient id="colorFx" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#80fbb7" stopOpacity={0.3} />
                <stop offset="90%" stopColor="#80fbb7" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Area */}
            <Area
              type="monotone"
              dataKey="rate"
              fill="url(#colorFx)"
              stroke="none"
              animationDuration={1000}
              animationBegin={200}
            />

            {/* Line */}
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#80fbb7"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 6, fill: "#80fbb7" }}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
