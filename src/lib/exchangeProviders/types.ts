export interface ExchangeRateData {
  base: string;
  rates: Record<string, number>;
  updatedAt: number;
}

export interface ExchangeRatesResponse {
  base: string;
  currency: string;
  days: number;
  history: HistoricalRate[];
  updatedAt: number;
}

export interface HistoricalRate {
  date: string;
  rate: number;
}

export interface IExchangeProvider {
  getLatestRates(base: string, symbols: string[]): Promise<ExchangeRateData>;
  getHistoricalRates(
    base: string,
    currency: string,
    days: number
  ): Promise<HistoricalRate[]>;
}
