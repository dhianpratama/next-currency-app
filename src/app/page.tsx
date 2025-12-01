"use client";

import { useEffect, useState } from "react";
import CurrencyTable from "@/components/CurrencyTable";
import Modal from "@/components/Modal";
import HistoricalChart from "@/components/HistoricalChart";
import CurrencyList from "@/components/CurrencyList";
import CurrencySelector from "@/components/CurrencySelector";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const [amountAUD, setAmountAUD] = useState(100);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [historyData, setHistoryData] = useState<
    { date: string; rate: number }[]
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [baseCurrency, setBaseCurrency] = useState("AUD");

  const router = useRouter();

  console.log("baseCurrency", baseCurrency);

  useEffect(() => {
    fetch("/api/rates")
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  }, []);

  const openCurrencyModal = async (currency: string) => {
    setSelectedCurrency(currency);
    setModalOpen(true);

    const res = await fetch(`/api/historical?symbol=${currency}`);
    const json = await res.json();

    setHistoryData(json.history);
  };

  return (
    <main className="max-w-md mx-auto px-6 py-10">
      <h1 className="text-center text-2xl font-semibold mb-6">Convert</h1>

      {/* Input Card */}
      <div
        className="
          bg-white dark:bg-gray-800
          rounded-2xl 
          shadow-lg dark:shadow-none
          p-5 mb-6 
          border border-gray-100 dark:border-gray-700
        "
      >
        <div className="flex items-center justify-between">
          <CurrencySelector value={baseCurrency} onChange={setBaseCurrency} />
          <input
            type="number"
            value={amountAUD}
            onChange={(e) => setAmountAUD(Number(e.target.value))}
            className="
              text-right text-xl font-semibold 
              text-gray-900 dark:text-gray-100 
              bg-transparent outline-none w-40
            "
          />
        </div>
      </div>

      <CurrencyList
        rates={rates}
        amountAUD={amountAUD}
        onSelectCurrency={(currency) => router.push(`/chart/${currency}`)}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedCurrency && (
          <HistoricalChart data={historyData} symbol={selectedCurrency} />
        )}
      </Modal>
    </main>
  );
}
