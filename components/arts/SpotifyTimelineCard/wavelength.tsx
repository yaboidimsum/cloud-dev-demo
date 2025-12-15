"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const Wavelength = ({ instanceId }: { instanceId: string }) => {
  const [bars, setBars] = useState<number[]>(new Array(4).fill(40));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(bars.map(() => Math.random() * 80 + 20));
    }, 200);
    return () => clearInterval(interval);
  }, [bars]);

  return (
    <div className="flex h-5 items-end gap-[2px]">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          layoutId={`bar-${instanceId}-${i}`} // 🧩 keeps identity same across static & animated
          layout
          animate={{ height: `${height}%` }}
          transition={{
            layout: { type: "spring", damping: 25, stiffness: 200 },
            duration: 0.25,
            ease: "easeInOut",
          }}
          className="w-[4px] rounded-full bg-green-300"
        />
      ))}
    </div>
  );
};
