import { NextResponse } from "next/server";
import { getExchangeProvider } from "@/lib/exchangeProviders";

import type { NextApiRequest } from "next";
import config from "@/lib/config";

export const revalidate = 3600;
// Cache for 1 hour — historical data doesn't change frequently

export async function GET(request: NextApiRequest) {
  const provider = getExchangeProvider();

  const base = (request.query?.base as string) || config.defaultBaseCurrency;
  const symbol = (request.query?.symbol as string) || "";
  const days = parseInt((request.query?.days as string) || "14", 10);

  if (!base || !symbol) {
    return NextResponse.json(
      { error: "Missing 'base' or 'symbol' query parameter" },
      { status: 400 }
    );
  }

  try {
    const history = await provider.getHistoricalRates(base, symbol, days);

    return NextResponse.json({
      base,
      symbol,
      days,
      history,
      updatedAt: Date.now(),
      stale: false,
    });
  } catch (error) {
    console.error("Failed to fetch historical data:", error);

    return NextResponse.json(
      { error: "Failed to fetch historical data" },
      { status: 500 }
    );
  }
}
