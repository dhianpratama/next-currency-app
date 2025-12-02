import { NextResponse, type NextRequest } from "next/server";

import { getExchangeProvider } from "@/lib/exchangeProviders";
import config from "@/lib/config";

export const revalidate = 3600; // Cache for 1 hour, as historical data changes less frequently

export async function GET(request: NextRequest) {
  const base =
    request.nextUrl.searchParams.get("base") || config.defaultBaseCurrency;
  const currency = request.nextUrl.searchParams.get("currency") || "";
  const days = parseInt(request.nextUrl.searchParams.get("days") || "14", 10);

  const provider = getExchangeProvider();

  if (!base || !currency) {
    return NextResponse.json(
      { error: "Missing 'base' or 'currency' query parameter" },
      { status: 400 }
    );
  }

  try {
    const history = await provider.getHistoricalRates(base, currency, days);

    return NextResponse.json({
      base,
      currency,
      days,
      history,
      updatedAt: Date.now(),
    });
  } catch (error) {
    console.error("Failed to fetch historical data:", error);

    return NextResponse.json(
      { error: "Failed to fetch historical data" },
      { status: 500 }
    );
  }
}
