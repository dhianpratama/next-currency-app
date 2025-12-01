"use client";

import { useEffect, useState } from "react";
import CurrencyList from "@/components/CurrencyList";
import CurrencySelector from "@/components/CurrencySelector";

import { useRouter } from "next/navigation";
import config from "@/lib/config";

export default function HomePage() {
  const [amount, setAmount] = useState(100);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [baseCurrency, setBaseCurrency] = useState(config.defaultBaseCurrency);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/rates")
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  }, []);

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

      <CurrencyList
        rates={rates}
        baseAmount={amount}
        baseCurrency={baseCurrency}
        onSelectCurrency={(currency) => router.push(`/chart/${currency}`)}
      />
    </main>
  );
}
