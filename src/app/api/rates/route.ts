import { NextResponse } from "next/server";
import { getExchangeProvider } from "@/lib/exchangeProviders";
import { NextApiRequest } from "next";

export const revalidate = 300; // Cache for 5 minutes

const TARGET_CURRENCIES = ["AUD", "EUR", "JPY", "SGD", "GBP"];

export async function GET(request: NextApiRequest) {
  const base = (request.query?.base || "AUD") as string;

  const provider = getExchangeProvider();

  try {
    const data = await provider.getLatestRates(base, TARGET_CURRENCIES);

    return NextResponse.json({
      base: data.base,
      rates: data.rates,
      updatedAt: data.updatedAt,
      stale: false,
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
