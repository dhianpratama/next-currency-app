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
import config from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { HistoricalRate } from "@/lib/exchangeProviders/types";

interface Props {
  currency: string;
  base: string;
}

const ranges = [
  { label: "7D", days: 7 },
  { label: "14D", days: 14 },
  { label: "1M", days: 30 },
];

export default function HistoricalChart({ currency, base }: Props) {
  const [range, setRange] = useState(config.defaultChartPeriod);

  const days = useMemo(() => {
    return ranges.find((r) => r.label === range)?.days as number;
  }, [range]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["historical", currency, base, days],
    queryFn: async () => {
      const res = await fetch(
        `/api/historical?base=${base}&currency=${currency}`
      );
      return res.json() as Promise<HistoricalRate[]>;
    },
    placeholderData: (previousData) => previousData,
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
  });

  console.log("data ", data);
  return (
    <div className="w-full pt-2">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
        {currency} exchange rate
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
          <AreaChart data={data}>
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

            <defs>
              <linearGradient id="colorFx" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#80fbb7" stopOpacity={0.3} />
                <stop offset="90%" stopColor="#80fbb7" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="rate"
              fill="url(#colorFx)"
              stroke="none"
              animationDuration={1000}
              animationBegin={200}
            />

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
