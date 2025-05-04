"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface AvailabilityIndicatorProps {
  available?: boolean;
}

export default function AvailabilityIndicator({
  available = true,
}: AvailabilityIndicatorProps) {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    if (available) {
      const interval = setInterval(() => {
        setIsBlinking((prev) => !prev);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [available]);

  return (
    <motion.button
      className={`flex items-center rounded-md px-4 py-2 text-sm ${
        available
          ? "dark-blue:bg-green-900/20 dark-blue:text-green-300 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
          : "dark-blue:bg-red-900/20 dark-blue:text-red-300 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      }`}
      whileHover={{
        y: -5,
        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 300, damping: 15 },
      }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative mr-2">
        <span
          className={`inline-block h-2 w-2 rounded-full ${
            available
              ? "bg-green-500 dark:bg-green-400"
              : "bg-red-500 dark:bg-red-400"
          }`}
        ></span>
        {available && (
          <span
            className={`absolute inset-0 top-1.5 h-2 w-2 animate-ping rounded-full bg-green-400 dark:bg-green-300 ${
              isBlinking ? "opacity-75" : "opacity-0"
            }`}
          ></span>
        )}
      </span>
      {available ? "Available for Hire" : "Currently Unavailable"}
    </motion.button>
  );
}
