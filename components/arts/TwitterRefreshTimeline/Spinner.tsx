"use client";

import { clsx } from "clsx";

interface SpinnerProps {
  /** Color of the spinner bars */
  color?: string;
  /** Size of the spinner in pixels */
  size?: number;
  /** Animation speed in seconds (lower = faster) */
  speed?: number;
  /** Optional extra classes */
  className?: string;
}

const bars = Array(12).fill(0);

export function Spinner({
  color = "#1D9BF0",
  size = 20,
  speed = 1.2, // Default speed
  className,
}: SpinnerProps) {
  return (
    <div
      className={clsx("flex items-center justify-center", className)}
      style={
        {
          "--spinner-size": `${size}px`,
          "--spinner-color": color,
          height: `var(--spinner-size)`,
          width: `var(--spinner-size)`,
        } as React.CSSProperties
      }
    >
      <div
        className="relative left-1/2 top-1/2"
        style={{
          height: "var(--spinner-size)",
          width: "var(--spinner-size)",
        }}
      >
        {bars.map((_, i) => {
          const delay = -speed + i * (speed / 12); // proportional delay
          const rotation = i * 30; // 360/12 = 30deg per bar
          return (
            <div
              key={i}
              className="absolute rounded-[6px]"
              style={{
                animation: `spinBar ${speed}s linear infinite`,
                animationDelay: `${delay}s`,
                background: "var(--spinner-color)",
                height: "8%",
                width: "24%",
                left: "-10%",
                top: "-3.9%",
                transform: `rotate(${rotation}deg) translate(146%)`,
                transformOrigin: "center center",
              }}
            />
          );
        })}
      </div>

      {/* Inline keyframes for fade animation */}
      <style jsx>{`
        @keyframes spinBar {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0.15;
          }
        }
      `}</style>
    </div>
  );
}
