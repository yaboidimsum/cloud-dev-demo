"use client";

import ToastPop from "./toast-pop.module.css";
import { useState, useEffect } from "react";

interface ToasterPopProp {
  indexToast: number;
}

interface CustomCSSProperties extends React.CSSProperties {
  [key: `--${string}`]: string | number;
}

export default function Toaster() {
  const [toasts, setToasts] = useState(0);

  return (
    <div className={`${ToastPop.wrapper} mt-32`}>
      <div className={`${ToastPop.toaster}`}>
        {Array.from({ length: toasts }).map((_, i) => (
          <Toast key={i} indexToast={toasts - i - 1} />
        ))}
      </div>
      <div className="flex gap-4">
        <button
          className={`${ToastPop.button} ease transform cursor-pointer duration-150 active:scale-95 dark:text-zinc-800`}
          onClick={() => {
            setToasts(toasts + 1);
          }}
        >
          Add toast
        </button>
        <button
          className={`${ToastPop.button} ease transform cursor-pointer duration-150 active:scale-95 dark:text-zinc-800`}
          onClick={() => {
            setToasts(0);
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

function Toast({ indexToast }: ToasterPopProp) {
  const [mounted, setMounted] = useState(false);
  const [localInfo, setLocalInfo] = useState("");

  useEffect(() => {
    setMounted(true);

    const now = new Date();

    // Format as DD/MM/YYYY at HH:mm
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const formattedTime = `${day}/${month}/${year} at ${hours}:${minutes}`;

    // Try to get country from locale (fallback to timezone city)
    let country = "";
    try {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale;
      const region = locale.split("-")[1]; // e.g. "en-US" → "US"
      if (region) {
        const regionName = new Intl.DisplayNames(["en"], { type: "region" });
        country = regionName.of(region) || "";
      }
    } catch {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      country = tz.split("/")[1] || "";
    }

    setLocalInfo(`${formattedTime} (${country})`);
  }, []);

  return (
    <div
      className={`${ToastPop.toast} bg-zinc-50`}
      style={{ "--index": indexToast } as CustomCSSProperties}
      data-mounted={mounted}
    >
      <span className={`${ToastPop.title}`}>Timestamp Created</span>
      <span className={`${ToastPop.description}`}>{localInfo}</span>
    </div>
  );
}
