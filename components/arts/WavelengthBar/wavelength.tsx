"use client";

import { motion } from "framer-motion";

export const Wavelength = () => {
  const bars = Array.from({ length: 12 }, (_, i) => ({
    delay: Math.random() * 0.5,
    isLeft: i < 6,
  }));

  return (
    <div className="flex h-6 items-center justify-center gap-[2px]">
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="w-[2px] rounded-full"
          animate={{
            height: [6, 22, 8],
            backgroundColor: bar.isLeft
              ? ["rgb(58,255,58)", "rgb(100,255,100)", "rgb(155,248,155)"]
              : ["rgb(253,141,118)", "rgb(255,100,70)", "rgb(252,62,24)"],
          }}
          transition={{
            duration: 0.6,
            delay: bar.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
