export interface ExchangeRateData {
  base: string;
  rates: Record<string, number>;
  updatedAt: number;
}

export interface IExchangeProvider {
  getLatestRates(base: string, symbols: string[]): Promise<ExchangeRateData>;
  getHistoricalRates(
    base: string,
    symbol: string,
    days: number
  ): Promise<{ date: string; rate: number }[]>;
}
