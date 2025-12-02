import {
  IExchangeProvider,
  ExchangeRateData,
} from "@/lib/exchangeProviders/types";
import config from "@/lib/config";

const API_BASE = "https://api.exchangeratesapi.io";
const API_KEY = config.exchangeRateApiKey;

export const ExchangeRateApiProvider: IExchangeProvider = {
  async getLatestRates(
    base: string,
    currencies: string[]
  ): Promise<ExchangeRateData> {
    const targetCurrencies = currencies.filter((c) => c !== base);
    const url = `${API_BASE}/v1/latest?access_key=${API_KEY}&base=${base}&symbols=${targetCurrencies.join(
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

        const url = `${API_BASE}/v1/${iso}?access_key=${API_KEY}&base=${base}&symbols=${currency}`;
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
