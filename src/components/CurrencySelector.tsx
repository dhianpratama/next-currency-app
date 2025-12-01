"use client";

import { useState, useRef, useEffect } from "react";
import config from "@/lib/config";
import { FLAG_MAP } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export default function CurrencySelector({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const currencies = config.availableCurrencies;

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      {/* CURRENT SELECTION BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="
            flex items-center gap-2 px-3 py-2 
            rounded-lg 
            border border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-800 
            text-gray-900 dark:text-gray-100
            active:scale-[0.98] transition
        "
      >
        <span className="text-2xl">{FLAG_MAP[value]}</span>
        <span className="font-semibold">{value}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="black"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* DROPDOWN MENU */}
      {open && (
        <div
          className="
                absolute mt-2 w-40 
                bg-white dark:bg-gray-800 
                border border-gray-200 dark:border-gray-700
                rounded-xl shadow-lg dark:shadow-none
                z-50 animate-fadeIn
                "
        >
          {currencies.map((cur) => (
            <button
              key={cur}
              onClick={() => {
                onChange(cur);
                setOpen(false);
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <span className="text-xl">{FLAG_MAP[cur]}</span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {cur}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
