const config = {
  defaultBaseCurrency: process.env.DEFAULT_BASE_CURRENCY || "USD",
  defaultChartPeriod: process.env.DEFAULT_CHART_PERIOD || "14D",
  openExchangeApiKey: process.env.OPEN_EXCHANGE_API_KEY || "",
  availableCurrencies: process.env.AVAILABLE_CURRENCIES
    ? process.env.AVAILABLE_CURRENCIES.split(",")
    : ["AUD", "EUR", "JPY", "SGD", "GBP", "USD"],
};

export default config;
