const config = {
  defaultBaseCurrency: process.env.NEXT_PUBLIC_DEFAULT_BASE_CURRENCY || "USD",
  defaultChartPeriod: process.env.NEXT_PUBLIC_DEFAULT_CHART_PERIOD || "14D",
  openExchangeApiKey: process.env.OPEN_EXCHANGE_API_KEY || "",
  availableCurrencies: process.env.NEXT_PUBLIC_AVAILABLE_CURRENCIES
    ? process.env.NEXT_PUBLIC_AVAILABLE_CURRENCIES.split(",")
    : ["AUD", "EUR", "JPY", "SGD", "GBP", "USD"],
};

console.log(
  "process.env.NEXT_PUBLIC_AVAILABLE_CURRENCIES ",
  process.env.NEXT_PUBLIC_AVAILABLE_CURRENCIES
);

export default config;
