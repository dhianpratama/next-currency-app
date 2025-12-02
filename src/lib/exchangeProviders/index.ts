import { OpenExchangeProvider } from "@/lib/exchangeProviders/openExchangeProvider";
import { IExchangeProvider } from "@/lib/exchangeProviders/types";
import config from "../config";
import { ExchangeRateApiProvider } from "./exchangeRateProvider";

export function getExchangeProvider(): IExchangeProvider {
  switch (config.exchangeApiProvider) {
    case "openexchangerates":
      return OpenExchangeProvider;
    case "exchangeratesapi":
      return ExchangeRateApiProvider;
    default:
      throw new Error("Invalid exchange API provider configured");
  }
}
