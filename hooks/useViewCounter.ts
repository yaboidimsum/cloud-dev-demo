"use client";
import { useState, useEffect } from "react";

export function useViewCounter(slug: string, type: "project" | "blog") {
  const [views, setViews] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch the current view count
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

    // Set up a polling interval to refresh the count periodically
    const interval = setInterval(fetchViews, 60000); // Refresh every minute
    
    return () => clearInterval(interval);
  }, [slug, type]);

  return { views, error };
}
