import {
  IExchangeProvider,
  ExchangeRateData,
} from "@/lib/exchangeProviders/types";

const API_BASE = "https://openexchangerates.org/api";
const API_KEY = process.env.OPEN_EXCHANGE_API_KEY;

console.log("Using OpenExchange API Key:", API_KEY);

export const OpenExchangeProvider: IExchangeProvider = {
  async getLatestRates(
    base: string,
    symbols: string[]
  ): Promise<ExchangeRateData> {
    const url = `${API_BASE}/latest.json?app_id=${API_KEY}&base=${base}&symbols=${symbols.join(
      ","
    )}`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch latest rates");

    const data = await res.json();

    return {
      base: data.base,
      rates: data.rates,
      updatedAt: Date.now(),
    };
  },

  async getHistoricalRates(base, symbol, days) {
    const results: { date: string; rate: number }[] = [];

    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const iso = date.toISOString().split("T")[0];

      const url = `${API_BASE}/historical/${iso}.json?app_id=${API_KEY}&base=${base}&symbols=${symbol}`;
      const res = await fetch(url);
      const data = await res.json();

      results.push({
        date: iso,
        rate: data.rates[symbol],
      });
    }

    return results.reverse();
  },
};
