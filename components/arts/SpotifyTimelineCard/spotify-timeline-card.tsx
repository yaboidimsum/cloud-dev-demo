"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useId, useState } from "react";
import { Wavelength } from "./wavelength";

interface SpotifyTimelineCardProps {
  user: string;
  song: string;
  artist: string;
  album: string;
  profileImage: string;
  albumImage: string;
  gradientColor: string; // e.g. "#170F05" or "rgb(200,100,50)"
}

export default function SpotifyTimelineCard({
  user,
  song,
  artist,
  album,
  profileImage,
  albumImage,
  gradientColor,
}: SpotifyTimelineCardProps) {
  const [isHover, setIsHover] = useState(false);
  const instanceId = useId();

  return (
    <motion.div
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
      className="relative flex h-[250px] w-[1200px] overflow-hidden bg-[#121212] transition-colors duration-500"
    >
      <AnimatePresence mode="sync" initial={false}>
        {/* --- Hover overlay gradient --- */}
        {isHover && (
          <motion.div
            key="hover-gradient"
            className="pointer-events-none absolute inset-0 z-[5] origin-right"
            style={{
              background: `linear-gradient(to right, #121212, ${gradientColor}, rgba(18,18,18,0))`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.1 } }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* --- LEFT: Text and profile --- */}
      <div className="relative flex w-full bg-[#121212]">
        <div className="relative z-10 flex flex-1 items-center gap-10 pl-14">
          <div className="left-33 top-17 border-1 absolute z-[10] h-5 w-5 rounded-full border-zinc-800 bg-blue-600"></div>
          <div className="flex gap-10">
            {/* Profile */}
            <div className="relative mt-4 h-[100px] w-[100px] overflow-hidden rounded-full bg-black">
              <Image
                src={profileImage}
                alt={artist}
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <span className="mb-2 text-[40px] font-semibold text-white">
                {user}
              </span>
              <div className="text-[28px] font-medium text-neutral-300">
                <div className="flex items-center gap-1">
                  <span>{song}</span>
                  <div className="h-1.5 w-1.5 rounded-full bg-neutral-300"></div>
                  <span>{artist}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                  >
                    <rect
                      x="1"
                      y="1"
                      width="58"
                      height="58"
                      rx="29"
                      stroke="white"
                      strokeWidth="2"
                    />
                    <rect
                      x="21"
                      y="21"
                      width="18"
                      height="18"
                      rx="9"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                  <span> {album}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT: Album image & animation --- */}
      <div className="relative flex h-full w-[45%] flex-shrink-0 justify-end bg-[#121212]">
        {/* --- Wavelength transition --- */}
        <AnimatePresence mode="wait" initial={false}>
          {" "}
          <motion.div layout className="relative flex items-end">
            {" "}
            {isHover ? (
              <motion.div
                key={"wavelength"}
                layoutId={`wavelength-${instanceId}`}
                className=" top-15 absolute right-10 z-[6] h-5 "
              >
                {" "}
                <Wavelength instanceId={instanceId} />{" "}
              </motion.div>
            ) : (
              <motion.div
                key="static"
                layoutId={`wavelength-${instanceId}`}
                className="top-15 absolute right-10 z-[6] flex h-5 items-end justify-end gap-[2px]"
              >
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    layoutId={`bar-${instanceId}-${i}`} // 🧩 same as Wavelength component
                    layout
                    className={`w-[0.25rem] rounded-full bg-white/50 ${
                      i === 0
                        ? "h-[1.25rem]" // 20px → 1.25rem
                        : i === 1
                        ? "h-[0.75rem]" // 12px → 0.75rem
                        : i === 2
                        ? "h-[0.25rem]" // 4px → 0.25rem
                        : "h-[0.5rem]" // 8px → 0.5rem
                    }`}
                  />
                ))}
              </motion.div>
            )}{" "}
          </motion.div>{" "}
        </AnimatePresence>
        {/* --- Album image reveal --- */}
        <AnimatePresence mode="sync" initial={false}>
          {isHover && (
            <motion.div
              key="album-container"
              className="absolute inset-0"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                transition: { delay: 0.05 },
              }}
              exit={{
                opacity: 0,
                filter: "blur(12px)",
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Gradient overlay for album fade */}
              <motion.div
                key="gradient-2"
                className="pointer-events-none absolute inset-0 z-[5]"
                style={{
                  background: `linear-gradient(to right, ${gradientColor}, rgba(18,18,18,0))`,
                }}
              />

              {/* Album image */}
              <motion.div key="album" className="absolute inset-0">
                <Image
                  src={albumImage}
                  alt={album}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 50%" }}
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
