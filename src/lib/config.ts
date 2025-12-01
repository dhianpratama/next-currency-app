const config = {
  defaultBaseCurrency: process.env.DEFAULT_BASE_CURRENCY || "AUD",
  openExchangeApiKey: process.env.OPEN_EXCHANGE_API_KEY || "",
  availableCurrencies: process.env.AVAILABLE_CURRENCIES
    ? process.env.AVAILABLE_CURRENCIES.split(",")
    : ["AUD", "EUR", "JPY", "SGD", "GBP", "USD"],
};

export default config;
