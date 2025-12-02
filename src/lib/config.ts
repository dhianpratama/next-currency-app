const config = {
  openExchangeApiKey: process.env.OPEN_EXCHANGE_API_KEY || "",
  exchangeRateApiKey: process.env.EXCHANGE_RATE_API_KEY || "",
  exchangeApiProvider: process.env.EXCHANGE_API_PROVIDER || "openExchange",

  defaultBaseCurrency: process.env.NEXT_PUBLIC_DEFAULT_BASE_CURRENCY || "USD",
  defaultChartPeriod: process.env.NEXT_PUBLIC_DEFAULT_CHART_PERIOD || "14D",
  availableCurrencies: process.env.NEXT_PUBLIC_AVAILABLE_CURRENCIES
    ? process.env.NEXT_PUBLIC_AVAILABLE_CURRENCIES.split(",")
    : ["AUD", "EUR", "JPY", "SGD", "GBP", "USD"],
};

export default config;
