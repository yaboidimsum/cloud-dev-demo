"use client";

import { motion } from "framer-motion";

export const Wavelength = () => {
  // alternate patterns per bar (no delay)
  const bars = Array.from({ length: 3 }, (_, i) => ({
    pattern: i % 2 === 0 ? "long-short-long" : "short-long-short",
  }));

  return (
    <div className="flex h-6  items-center justify-center gap-[2px] will-change-transform">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full will-change-transform"
          animate={{
            height:
              bar.pattern === "long-short-long" ? [5, 10, 5] : [10, 5, 10],
            backgroundColor:
              bar.pattern === "long-short-long"
                ? ["rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)"]
                : ["rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(0, 0, 0)"],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
