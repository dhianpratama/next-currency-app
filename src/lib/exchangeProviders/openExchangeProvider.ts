import {
  IExchangeProvider,
  ExchangeRateData,
} from "@/lib/exchangeProviders/types";
import config from "@/lib/config";

const API_BASE = "https://openexchangerates.org/api";
const API_KEY = config.openExchangeApiKey;

export const OpenExchangeProvider: IExchangeProvider = {
  async getLatestRates(
    base: string,
    currencies: string[]
  ): Promise<ExchangeRateData> {
    const targetCurrencies = currencies.filter((c) => c !== base);
    const url = `${API_BASE}/latest.json?app_id=${API_KEY}&base=${base}&symbols=${targetCurrencies.join(
      ","
    )}`;

    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Failed to fetch latest rates");

    const data = await res.json();

    return {
      base: data.base,
      rates: data.rates,
      updatedAt: Date.now(),
    };
  },

  async getHistoricalRates(base, currency, days) {
    const results = await Promise.all(
      Array.from({ length: days }).map(async (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const iso = date.toISOString().split("T")[0];

        const url = `${API_BASE}/historical/${iso}.json?app_id=${API_KEY}&base=${base}&symbols=${currency}`;
        const res = await fetch(url, { next: { revalidate: 3600 * 24 } });
        const data = await res.json();

        return {
          date: iso,
          rate: data.rates[currency],
        };
      })
    );

    return results.reverse();
  },
};
