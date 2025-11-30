import { NextResponse } from "next/server";
import { getExchangeProvider } from "@/lib/exchangeProviders";

export const revalidate = 3600;
// Cache for 1 hour — historical data doesn't change frequently

export async function GET(request: Request) {
  const provider = getExchangeProvider();
  const { searchParams } = new URL(request.url);

  const base = "USD";
  const symbol = searchParams.get("symbol");
  const days = parseInt(searchParams.get("days") || "14", 10);

  if (!symbol) {
    return NextResponse.json(
      { error: "Missing 'symbol' query parameter" },
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
