"use client";

import { useState } from "react";
import CurrencyRow from "@/components/CurrencyRow";

interface Props {
  rates: Record<string, number>;
  amountAUD: number;
  onSelectCurrency: (currency: string) => void;
}

export default function CurrencyTable({
  rates,
  amountAUD,
  onSelectCurrency,
}: Props) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="px-4 py-3">Currency</th>
            <th className="px-4 py-3">Rate</th>
            <th className="px-4 py-3">Converted</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates).map(([currency, rate]) => (
            <CurrencyRow
              key={currency}
              currency={currency}
              rate={rate}
              amountAUD={amountAUD}
              onClick={() => onSelectCurrency(currency)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
