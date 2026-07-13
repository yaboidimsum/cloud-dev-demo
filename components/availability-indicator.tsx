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
      className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-medium tracking-tight transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
        available
          ? "bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-300"
          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      }`}
    >
      <span className="relative mr-2 flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
            available
              ? "animate-ping bg-green-500 dark:bg-green-400"
              : "bg-red-500 dark:bg-red-400"
          }`}
        ></span>
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            available
              ? "bg-green-500 dark:bg-green-400"
              : "bg-red-500 dark:bg-red-400"
          }`}
        ></span>
      </span>
      {available ? "Available for Hire" : "Currently Unavailable"}
    </motion.div>
  );
}
