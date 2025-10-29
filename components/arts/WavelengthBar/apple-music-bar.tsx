"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// ▶️ Play SVG
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 13" fill="currentColor" className={className}>
      <path d="M0.9375 13.2422C1.25 13.2422 1.51562 13.1172 1.82812 12.9375L10.9375 7.67188C11.5859 7.28906 11.8125 7.03906 11.8125 6.625C11.8125 6.21094 11.5859 5.96094 10.9375 5.58594L1.82812 0.3125C1.51562 0.132812 1.25 0.015625 0.9375 0.015625C0.359375 0.015625 0 0.453125 0 1.13281V12.1172C0 12.7969 0.359375 13.2422 0.9375 13.2422Z" />
    </svg>
  );
}

// ⏸ Pause SVG
function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 13" fill="currentColor" className={className}>
      <path d="M1.03906 12.7266H2.82031C3.5 12.7266 3.85938 12.3672 3.85938 11.6797V1.03906C3.85938 0.328125 3.5 0 2.82031 0H1.03906C0.359375 0 0 0.359375 0 1.03906V11.6797C0 12.3672 0.359375 12.7266 1.03906 12.7266ZM6.71875 12.7266H8.49219C9.17969 12.7266 9.53125 12.3672 9.53125 11.6797V1.03906C9.53125 0.328125 9.17969 0 8.49219 0H6.71875C6.03125 0 5.67188 0.359375 5.67188 1.03906V11.6797C5.67188 12.3672 6.03125 12.7266 6.71875 12.7266Z" />
    </svg>
  );
}

// ⏮ Previous Track SVG
function PrevIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12.5 6.42a.84.84 0 00-1.13.23l-8.47 7.74a.84.84 0 000 1.1l8.47 7.74a.84.84 0 001.36-.67V7.1a.84.84 0 00-.23-.68zM20.5 6.42a.84.84 0 00-1.13.23l-8.47 7.74a.84.84 0 000 1.1l8.47 7.74a.84.84 0 001.36-.67V7.1a.84.84 0 00-.23-.68z" />
    </svg>
  );
}

// ⏭ Next Track SVG
function NextIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.5 6.42a.84.84 0 011.13.23l8.47 7.74a.84.84 0 010 1.1l-8.47 7.74a.84.84 0 01-1.36-.67V7.1a.84.84 0 01.23-.68zM3.5 6.42a.84.84 0 011.13.23l8.47 7.74a.84.84 0 010 1.1l-8.47 7.74a.84.84 0 01-1.36-.67V7.1a.84.84 0 01.23-.68z" />
    </svg>
  );
}

// 🔊 Waveform Animation
function Waveform() {
  const [bars, setBars] = useState<number[]>(new Array(6).fill(40));

  useEffect(() => {
    const interval = setInterval(() => {
      setBars(bars.map(() => Math.random() * 80 + 20));
    }, 200);
    return () => clearInterval(interval);
  }, [bars]);

  return (
    <div className="flex h-5 items-center gap-[2px]">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          animate={{ height: `${height}%` }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="w-[2px] rounded-full bg-gradient-to-t from-[#C1A5A4] to-[#715150]"
        />
      ))}
    </div>
  );
}

// 🎵 Main Component
export default function AppleMusicBar() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <motion.div
      className="flex w-[360px] flex-col gap-2 rounded-[32px] bg-black/90 px-4 py-3 text-white shadow-lg backdrop-blur-md"
      initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
      transition={{ duration: 0.25 }}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <img
            src="https://i.scdn.co/image/ab67616d0000b2732c375e0d057495f0cc6711a5"
            alt="Album Art"
            className="h-10 w-10 rounded-md object-cover"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-[14px] font-medium">TV Car Chase</span>
            <span className="text-[12px] text-white/60">Sunday(1994)</span>
          </div>
        </div>
        <Waveform />
      </div>

      {/* Progress Bar */}
      <div className="mt-1 flex items-center gap-2">
        <span className="text-[10px] text-white/50">1:50</span>
        <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/20">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "40%" }}
            transition={{ duration: 0.8 }}
            className="absolute left-0 top-0 h-full rounded-full bg-white"
          />
        </div>
        <span className="text-[10px] text-white/50">-2:54</span>
      </div>

      {/* Controls */}
      <div className="mt-1 flex items-center justify-center gap-5">
        <button className="flex h-7 w-7 items-center justify-center text-white/70 transition hover:text-white">
          <PrevIcon className="h-4 w-4" />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          {isPlaying ? (
            <PauseIcon className="h-4 w-4" />
          ) : (
            <PlayIcon className="h-4 w-4" />
          )}
        </button>

        <button className="flex h-7 w-7 items-center justify-center text-white/70 transition hover:text-white">
          <NextIcon className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
}
