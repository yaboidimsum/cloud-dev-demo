"use client";

import { motion } from "framer-motion";

interface AvailabilityIndicatorProps {
  available?: boolean;
}

export default function AvailabilityIndicator({
  available = true,
}: AvailabilityIndicatorProps) {
  return (
    <motion.div
      className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium  transition-[transform,box-shadow,background-color,color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm ${
        available
          ? "bg-[oklch(0.95_0.03_140)] text-[oklch(0.25_0.04_140)] dark:bg-[oklch(0.25_0.04_140/0.2)] dark:text-[oklch(0.8_0.04_140)]"
          : "bg-[oklch(0.95_0.03_25)] text-[oklch(0.3_0.05_25)] dark:bg-[oklch(0.3_0.05_25/0.2)] dark:text-[oklch(0.8_0.05_25)]"
      }`}
    >
      <span className="relative mr-2 flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
            available
              ? "animate-ping bg-[oklch(0.6_0.15_140)] dark:bg-[oklch(0.7_0.12_140)]"
              : "bg-[oklch(0.6_0.15_25)] dark:bg-[oklch(0.7_0.12_25)]"
          }`}
        ></span>
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            available
              ? "bg-[oklch(0.6_0.15_140)] dark:bg-[oklch(0.7_0.12_140)]"
              : "bg-[oklch(0.6_0.15_25)] dark:bg-[oklch(0.7_0.12_25)]"
          }`}
        ></span>
      </span>
      {available ? "Available for Hire" : "Currently Unavailable"}
    </motion.div>
  );
}
