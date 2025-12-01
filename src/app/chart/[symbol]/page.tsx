"use client";

import React, { useEffect, useState } from "react";
import HistoricalChart from "@/components/HistoricalChart";
import Link from "next/link";

export default function ChartPage({
  params,
}: {
  params: Promise<{ symbol: string }>;
}) {
  const { symbol } = React.use(params);
  const [historyData, setHistoryData] = useState<
    { date: string; rate: number }[]
  >([]);

  useEffect(() => {
    fetch(`/api/historical?symbol=${symbol}`)
      .then((res) => res.json())
      .then((data) => setHistoryData(data.history));
  }, [symbol]);

  return (
    <main className="max-w-md mx-auto px-6 py-6">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mb-4"
      >
        ← Back
      </Link>

      <HistoricalChart data={historyData} symbol={symbol} />
    </main>
  );
}
