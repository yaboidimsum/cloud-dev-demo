"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Wavelength } from "./wavelength";
import Image from "next/image";

// 🧠 Hook: Handles animation state & sequencing logic
function useInstaStoryStatus() {
  const [hovered, setHovered] = useState(false);

  const containerVariants = {
    on: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: 1, // forward: small → big → card
      },
    },
    off: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1, // reverse: card → big → small
      },
    },
  };

  const itemVariants = {
    off: {
      opacity: 0,
      scale: 0.9,
      y: 8,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    on: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 20,
        mass: 1,
      },
    },
  };

  return { hovered, setHovered, containerVariants, itemVariants };
}

// 🎨 UI Component
export default function InstaStoryStatus({
  image = "https://images.genius.com/4d7a3bfcf312d0fe2fcbdff4064c449d.1000x1000x1.jpg",
  title = "If It Only Gets Better",
  artist = "Joji",
  user = "George Millers",
}: {
  image?: string;
  title?: string;
  artist?: string;
  user?: string;
}) {
  const { hovered, setHovered, containerVariants, itemVariants } =
    useInstaStoryStatus();

  return (
    <motion.div
      className="relative flex cursor-pointer select-none flex-col items-center justify-center gap-3 transition-transform duration-300 ease-out"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* --- Animated Dots + Card --- */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="off"
        animate={hovered ? "on" : "off"}
      >
        {/* --- SMALL DOT --- */}
        <motion.div
          variants={itemVariants}
          className="absolute left-6 top-8 z-10 h-1.5 w-1.5 rounded-2xl bg-white"
        />

        {/* --- BIG DOT --- */}
        <motion.div
          variants={itemVariants}
          className="absolute left-3 top-3.5 z-10 h-4 w-4 rounded-2xl bg-white"
        />

        {/* --- FLOATING CARD --- */}
        <motion.div
          variants={itemVariants}
          className="absolute -top-7 z-20 flex w-fit flex-col items-center justify-center rounded-xl bg-white px-3 py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
          style={{
            transformOrigin: "left center",
          }}
        >
          <div className="flex h-5 w-full items-center justify-center gap-2">
            <div className="origin-center">
              <Wavelength />
            </div>

            {/* Text container */}
            <div className="relative h-5 w-[90px] overflow-hidden">
              {/* Fade mask */}
              <div
                className="pointer-events-none absolute inset-0 z-10"
                style={{
                  background: `
        linear-gradient(to right,
          rgba(255,255,255,1) 0%,
          rgba(255,255,255,0) 5%,
          rgba(255,255,255,0) 90%,
          rgba(255,255,255,1) 100%)
      `,
                }}
              />

              {/* Seamless marquee */}
              <motion.div
                className="absolute flex whitespace-nowrap text-[12px] font-semibold"
                animate={{
                  // move one full "copy" left, pause, then continue
                  // x: ["0%", "-33.333%", "-33.333%", "-66.666%"],
                  x: ["0%", "-32.333%", "-32.333%", "-66.666%"],
                }}
                transition={{
                  duration: 8, // 8s per full loop = snappy but readable
                  ease: "linear",
                  times: [0, 0.4, 0.6, 1], // pause at 40–50%
                  repeat: Infinity,
                }}
              >
                <span className="pr-[16px] text-black will-change-transform">
                  {title}
                </span>
                <span className="pr-[16px] text-black will-change-transform">
                  {title}
                </span>
                <span className="pr-[16px] text-black will-change-transform">
                  {title}
                </span>
              </motion.div>
            </div>
          </div>

          <span className="pt-[2px] text-[10px] font-medium text-gray-600">
            {artist}
          </span>
        </motion.div>
      </motion.div>

      {/* --- Profile image --- */}
      <div className="relative flex h-28 w-28 overflow-hidden rounded-full shadow-[0_3px_8px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out group-hover:scale-105">
        <Image
          src={image}
          alt={user}
          fill
          className="rounded-full object-cover"
        />
      </div>

      <span className="text-sm font-medium">{user}</span>
    </motion.div>
  );
}
