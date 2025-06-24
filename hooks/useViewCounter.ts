"use client";
import { useState, useEffect } from "react";

export function useViewCounter(slug: string, type: "project" | "blog") {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // First, fetch the current view count
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

    fetchViews();

    // Set a timer to increment the view after 5 minutes
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/views?slug=${slug}&type=${type}`, {
          method: "POST",
        });

        if (!response.ok) throw new Error("Failed to update views");

        const data = await response.json();
        setViews(data.views);
      } catch (err) {
        console.error("Error updating views:", err);
        setError("Failed to update view count");
        // Keep the current view count on error
      }
    }, 3 * 60 * 1000); // 5 minutes in milliseconds

    return () => clearTimeout(timer);
  }, [slug, type]);

  return { views, error };
}
