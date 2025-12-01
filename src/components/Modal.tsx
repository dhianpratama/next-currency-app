"use client";

import { ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white dark:bg-gray-800 
          text-gray-900 dark:text-gray-100
          rounded-2xl p-6 
          w-full max-w-lg 
          shadow-xl dark:shadow-none
        "
      >
        {children}
      </div>
    </div>
  );
}
