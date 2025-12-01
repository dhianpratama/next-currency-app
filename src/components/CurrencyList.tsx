"use client";

import CurrencyRow from "./CurrencyRow";

interface Props {
  rates: Record<string, number>;
  baseCurrency: string;
  baseAmount: number;
  isLoading: boolean;
  onSelectCurrency: (currency: string) => void;
}

export default function CurrencyList({
  rates,
  baseAmount,
  baseCurrency,
  isLoading,
  onSelectCurrency,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      {Object.entries(rates).map(([currency, rate]) => (
        <CurrencyRow
          key={currency}
          currency={currency}
          rate={rate}
          baseCurrency={baseCurrency}
          baseAmount={baseAmount}
          isLoading={isLoading}
          onClick={() => onSelectCurrency(currency)}
        />
      ))}
    </div>
  );
}
