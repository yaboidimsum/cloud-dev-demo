"use client";
import { useState, useEffect } from "react";

export function useViewCounter(slug: string, type: "project" | "blog") {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const response = await fetch(`/api/views?slug=${slug}&type=${type}`);
        if (!response.ok) throw new Error("Failed to fetch views");
        const data = await response.json();
        setViews(data.views);
      } catch (err) {
        console.error("Error fetching views:", err);
        setError("Failed to load view count");
        setViews(0); // Set to 0 as fallback
      }
    };

    // Defer to idle time so hydration isn't blocked by the view-count request.
    const ric = (
      window as Window & {
        requestIdleCallback?: (cb: () => void) => number;
      }
    ).requestIdleCallback;
    const schedule = ric
      ? (cb: () => void) => ric(cb)
      : (cb: () => void) => setTimeout(cb, 1) as unknown as number;
    const id = schedule(fetchViews);

    return () => {
      const cancelRic = (
        window as Window & {
          cancelIdleCallback?: (id: number) => void;
        }
      ).cancelIdleCallback;
      if (cancelRic) cancelRic(id);
      else clearTimeout(id);
    };
  }, [slug, type]);

  return { views, error };
}
