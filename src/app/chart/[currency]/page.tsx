"use client";

import React, { useEffect, useState } from "react";
import HistoricalChart from "@/components/HistoricalChart";
import Link from "next/link";
import config from "@/lib/config";

export default function ChartPage({
  params,
  searchParams,
}: {
  params: Promise<{ currency: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { currency } = React.use(params);
  const { base = config.defaultBaseCurrency as string } =
    React.use(searchParams);

  return (
    <main className="max-w-md mx-auto px-6 py-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium mb-4"
      >
        ← Back
      </Link>

      <HistoricalChart currency={currency} base={base as string} />
    </main>
  );
}
