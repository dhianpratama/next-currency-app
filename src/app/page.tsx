"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import CurrencyList from "@/components/CurrencyList";
import CurrencySelector from "@/components/CurrencySelector";

import { ExchangeRateData } from "@/lib/exchangeProviders/types";

import config from "@/lib/config";

export default function HomePage() {
  const [amount, setAmount] = useState(100);
  const [baseCurrency, setBaseCurrency] = useState(config.defaultBaseCurrency);

  console.log("baseCurrency ", baseCurrency);

  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["rates", baseCurrency],
    queryFn: async () => {
      const res = await fetch(`/api/rates?base=${baseCurrency}`);
      return res.json() as Promise<ExchangeRateData>;
    },
    placeholderData: (previousData) => previousData,
    refetchInterval: 60000,
    refetchOnWindowFocus: true,
  });

  console.log("data ", data);

  return (
    <main className="max-w-md mx-auto px-6 py-10">
      <h1 className="text-center text-2xl font-semibold mb-6">Convert</h1>

      {/* Input Card */}
      <div
        className="
          bg-white dark:bg-gray-800
          rounded-2xl 
          shadow-lg dark:shadow-none
          p-5 mb-6 
          border border-gray-100 dark:border-gray-700
        "
      >
        <div className="flex items-center justify-between">
          <CurrencySelector value={baseCurrency} onChange={setBaseCurrency} />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="
              text-right text-xl font-semibold 
              text-gray-900 dark:text-gray-100 
              bg-transparent outline-none w-40
            "
          />
        </div>
      </div>

      {isError ? (
        <p className="text-red-500">Failed to load data.</p>
      ) : isLoading && !data ? (
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      ) : data ? (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Last currency update: {new Date(data.updatedAt).toLocaleString()}
          </p>

          <CurrencyList
            rates={data.rates}
            baseAmount={amount}
            baseCurrency={baseCurrency}
            isLoading={isLoading}
            onSelectCurrency={(currency) =>
              router.push(`/chart/${currency}?base=${baseCurrency}`)
            }
          />
        </>
      ) : (
        <></>
      )}
    </main>
  );
}
