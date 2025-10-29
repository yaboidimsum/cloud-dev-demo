"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Ring } from "./ring";
import { Timer } from "./timer";
import AppleMusicBar from "./apple-music-bar";
import BatteryPercentage from "./battery-percentage";
import PhoneCall from "./phone-call";
import PhoneCallIncoming from "./phone-call-incoming";

// Add TypeScript index signatures to allow for any string key
// and ensure the component compiles without error when using variantKey.

interface VariantsMap {
  [key: string]: any;
}

// 1. FIX: Define BOUNCE_VARIANTS with an index signature
const BOUNCE_VARIANTS: VariantsMap = {
  // --- CORE IDLE & RING ---
  idle: 0.5,
  "idle-ring": 0.5,
  "ring-idle": 0.5,

  // --- IDLE & TIMER ---
  "idle-timer": 0.3,
  "timer-idle": 0.3,

  // --- RING & TIMER ---
  "ring-timer": 0.35,
  "timer-ring": 0.35,

  // --- IDLE & MUSIC ---
  "idle-music": 0.35,
  "music-idle": 0.35,

  // --- RING & MUSIC ---
  "ring-music": 0.35,
  "music-ring": 0.25,

  // --- TIMER & MUSIC ---
  "timer-music": 0.4,
  "music-timer": 0.35,

  // --- IDLE & BATTERY ---
  "idle-battery": 0.3,
  "battery-idle": 0.3,

  // --- RING & BATTERY ---
  "ring-battery": 0.35,
  "battery-ring": 0.3,

  // --- TIMER & BATTERY ---
  "timer-battery": 0.3,
  "battery-timer": 0.3,

  // --- MUSIC & BATTERY ---
  "music-battery": 0.3,
  "battery-music": 0.35,

  // --- CORE CALL (Call1) ---
  "idle-call": 0.3,
  "call-idle": 0.3,
  "ring-call": 0.3,
  "call-ring": 0.3,
  "timer-call": 0.35,
  "call-timer": 0.3,
  "music-call": 0.35,
  "call-music": 0.3,
  "battery-call": 0.3,
  "call-battery": 0.35,
  "call-incoming": 0.3, // Internal call state transition

  // --- CORE CALL2 (New Call State) ---
  "idle-call2": 0.3,
  "call2-idle": 0.3,
  "ring-call2": 0.3,
  "call2-ring": 0.3,
  "timer-call2": 0.35,
  "call2-timer": 0.3,
  "music-call2": 0.35,
  "call2-music": 0.3,
  "battery-call2": 0.3,
  "call2-battery": 0.35,

  // --- CALL1 <-> CALL2 TRANSITIONS ---
  "call-call2": 0.2,
  "call2-call": 0.2,
};

// 2. FIX: Define ANIMATION_VARIANTS with an index signature
const ANIMATION_VARIANTS: VariantsMap = {
  "ring-idle": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.5,
  },
  "timer-ring": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.35,
  },
  "ring-timer": {
    scale: 1.4,
    y: 7.5,
    bounce: 0.35,
  },
  "timer-idle": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.3,
  },
  "battery-idle": {
    scale: 0.7,
    scaleX: 0.9,
    y: -5.0,
    bounce: 0.5,
  },
  "idle-music": {
    scale: 0.5,
    y: 7.5,
    bounce: 0,
  },
  "music-idle": {
    scale: 0.7,
    y: -30.0,
    bounce: 0,
  },
  "call-call2": {
    scale: 0.7,
    // scaleY:0.1,
    y: -7.5,
    bounce: 0,
  },
  "call2-call": {
    scale: 0.7,
    y: -7.5,
    bounce: 0,
  },
  "call-idle": {
    scale: 0.7,
    y: -7.5,
    bounce: 0,
  },
  "call2-idle": {
    scale: 0.7,
    y: -7.5,
    bounce: 0,
  },
};

export default function DynamicIsland() {
  const [view, setView] = useState("idle");
  // The variantKey is set using a combination of the old view and the new view
  const [variantKey, setVariantKey] = useState("idle");

  const content = useMemo(() => {
    switch (view) {
      case "ring":
        return <Ring />;
      case "timer":
        return <Timer />;
      case "music":
        return <AppleMusicBar />;
      case "battery":
        return <BatteryPercentage />;
      case "call":
        return <PhoneCall />;
      case "call2":
        return <PhoneCallIncoming />;
      case "idle":
        return <div className="h-7" />;
    }
    // Add default return for exhaustive checks, though the switch covers all 'view' states
    return null;
  }, [view]);

  // Fallback check to ensure a bounce value exists if variantKey isn't in BOUNCE_VARIANTS
  const bounceValue = BOUNCE_VARIANTS[variantKey] ?? BOUNCE_VARIANTS["idle"];
  const animationCustom = ANIMATION_VARIANTS[variantKey] ?? {};

  return (
    <div className="h-[360px]">
      <div className="relative flex h-full w-full flex-col justify-between">
        <motion.div
          layout
          transition={{
            type: "spring",
            // 3. USE the safely resolved bounceValue
            bounce: bounceValue,
          }}
          style={{ borderRadius: 32 }}
          className="mx-auto w-fit min-w-[100px] overflow-hidden rounded-full bg-black"
        >
          <motion.div
            transition={{
              type: "spring",
              // 4. USE the safely resolved bounceValue
              bounce: bounceValue,
            }}
            initial={{
              scale: 0.9,
              opacity: 0,
              filter: "blur(5px)",
              originX: 0.5,
              originY: 0.5,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              originX: 0.5,
              originY: 0.5,
              transition: {
                delay: 0.05,
              },
            }}
            key={view}
          >
            {content}
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute left-1/2 top-0 flex h-[200px] w-[300px] -translate-x-1/2 items-start justify-center">
          <AnimatePresence
            mode="popLayout"
            // 5. USE the safely resolved custom animation object
            custom={animationCustom}
          >
            <motion.div
              initial={{ opacity: 0 }}
              exit="exit"
              variants={variants}
              key={view}
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex w-[800px] flex-wrap justify-center gap-4">
          {["idle", "music", "battery", "call", "call2"].map(
            (v) => (
              <button
                type="button"
                className="ease h-10 w-32 cursor-pointer rounded-full bg-white px-2.5 py-1.5 text-sm font-medium capitalize text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 transition hover:bg-gray-50 active:scale-95"
                onClick={() => {
                  // Set the variant key to be 'oldView-newView'
                  setVariantKey(`${view}-${v}`);
                  // Then set the new view
                  setView(v);
                }}
                key={v}
              >
                {v}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

const variants = {
  exit: (transition: VariantsMap) => {
    // Added type for 'transition'
    return {
      ...transition,
      opacity: [1, 0],
      filter: "blur(5px)",
    };
  },
};
