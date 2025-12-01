"use client";

import { FLAG_MAP } from "@/lib/utils";

interface Props {
  currency: string;
  rate: number;
  baseCurrency: string;
  baseAmount: number;
  isLoading: boolean;
  onClick: () => void;
}

export default function CurrencyRow({
  currency,
  rate,
  baseCurrency,
  baseAmount,
  isLoading,
  onClick,
}: Props) {
  const converted = baseAmount * rate;

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md dark:shadow-none
      border border-gray-100 dark:border-gray-700 p-5 cursor-pointer transition active:scale-[0.98]"
    >
      {/* TOP ROW */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{FLAG_MAP[currency]}</span>
          <span className="text-lg font-semibold">{currency}</span>
        </div>

        <span className="text-lg font-bold">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
          }).format(converted)}
        </span>
      </div>

      <p className="animate-pulse text-sm text-gray-500 dark:text-gray-400 mt-1">
        1 {baseCurrency} = {rate.toFixed(4)} {currency}
      </p>
    </div>
  );
}
