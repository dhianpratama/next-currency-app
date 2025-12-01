import { NextResponse, type NextRequest } from "next/server";
import { getExchangeProvider } from "@/lib/exchangeProviders";
import config from "@/lib/config";

export const revalidate = 300; // Cache for 5 minutes

export async function GET(request: NextRequest) {
  const base = (request.nextUrl.searchParams.get("base") ||
    config.defaultBaseCurrency) as string;

  const provider = getExchangeProvider();

  try {
    const data = await provider.getLatestRates(
      base,
      config.availableCurrencies
    );

    return NextResponse.json({
      base: data.base,
      rates: data.rates,
      updatedAt: data.updatedAt,
    });
  } catch (error) {
    console.error("Failed to fetch latest rates:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch latest rates",
      },
      { status: 500 }
    );
  }
}
