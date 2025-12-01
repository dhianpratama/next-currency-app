"use client";

import CurrencyRow from "./CurrencyRow";

interface Props {
  rates: Record<string, number>;
  amountAUD: number;
  onSelectCurrency: (currency: string) => void;
}

export default function CurrencyList({
  rates,
  amountAUD,
  onSelectCurrency,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      {Object.entries(rates).map(([currency, rate]) => (
        <CurrencyRow
          key={currency}
          currency={currency}
          rate={rate}
          amountAUD={amountAUD}
          onClick={() => onSelectCurrency(currency)}
        />
      ))}
    </div>
  );
}
