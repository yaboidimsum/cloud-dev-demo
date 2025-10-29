"use client";

import { motion } from "framer-motion";

export default function BatteryIndicator() {
  const batteryLevel: number = 20; // can be dynamic

  // Determine color and label
  // let color = "";
  let label = "";

  if (batteryLevel <= 20) {
    // color = "red-400";
    label = "Low Battery";
  } else if (batteryLevel <= 80) {
    // color = "yellow-400";
    label = "Battery Percentage";
  } else if (batteryLevel <= 90) {
    // color = "green-400";
    label = "Battery Percentage";
  } else {
    // color = "green-400";
    label = "Full Battery";
  }

  // Tube color logic
  const tubeClass = batteryLevel === 100 ? "bg-green-400" : "bg-white/20";

  // Safer Tailwind static mapping
  const textColor =
    batteryLevel <= 20
      ? "text-red-400"
      : batteryLevel <= 80
      ? "text-yellow-400"
      : "text-green-400";

  const fillColor =
    batteryLevel <= 20
      ? "bg-red-400"
      : batteryLevel <= 80
      ? "bg-yellow-400"
      : "bg-green-400";

  return (
    <div className="flex h-[40px] w-[280px] items-center justify-between rounded-full bg-black/80 px-4 text-white shadow-lg">
      {/* Left side text */}
      <motion.span
        initial={{ width: 0, opacity: 0, filter: "blur(4px)" }}
        animate={{
          width: 40,
          opacity: 1,
          filter: "blur(0px)",
        }}
        exit={{ width: 0, opacity: 0, filter: "blur(4px)" }}
        transition={{ type: "spring", bounce: 0.35 }}
        className="whitespace-nowrap text-sm font-medium"
      >
        {label}
      </motion.span>

      {/* Right side: percentage + battery */}
      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold ${textColor}`}>
          {batteryLevel}%
        </span>

        {/* Battery shape */}
        <div className="relative flex items-center">
          {/* Main body */}
          <div className="relative h-5 w-10 overflow-hidden rounded-md bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${batteryLevel}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={`absolute left-0 top-0 h-full ${fillColor}`}
            />
          </div>

          {/* Small right-side tube */}
          <div className={`ml-[1px] h-2 w-[2px] rounded-r-sm ${tubeClass}`} />
        </div>
      </div>
    </div>
  );
}
