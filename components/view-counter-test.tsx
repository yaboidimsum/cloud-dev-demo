"use client";

import { useState } from "react";

export default function ViewCounterTest({ slug, type }: { slug: string; type: "project" | "blog" }) {
  const [manualViews, setManualViews] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Function to manually check current view count
  const checkViews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/views?slug=${slug}&type=${type}`);
      if (!response.ok) throw new Error("Failed to fetch views");
      const data = await response.json();
      setManualViews(data.views);
    } catch (err) {
      console.error("Error checking views:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to manually increment view count
  const incrementViews = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/views?slug=${slug}&type=${type}`, {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to update views");
      const data = await response.json();
      setManualViews(data.views);
    } catch (err) {
      console.error("Error incrementing views:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-md my-4 bg-gray-50 dark:bg-gray-800">
      <h3 className="font-semibold mb-2">View Counter Test</h3>
      <p>Manual view count: {manualViews !== null ? manualViews : "Not checked"}</p>
      <div className="flex gap-2 mt-4">
        <button 
          onClick={checkViews}
          disabled={loading}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Check Views"}
        </button>
        <button 
          onClick={incrementViews}
          disabled={loading}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Increment Views"}
        </button>
      </div>
    </div>
  );
}