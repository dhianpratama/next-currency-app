import { OpenExchangeProvider } from "@/lib/exchangeProviders/openExchangeProvider";
import { IExchangeProvider } from "@/lib/exchangeProviders/types";

export function getExchangeProvider(): IExchangeProvider {
  return OpenExchangeProvider;
}
