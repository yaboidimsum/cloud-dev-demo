"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";

export default function ViewTracker({ slug, type }: { slug: string; type: "project" | "blog" }) {
  useEffect(() => {
    // Check if this page has been viewed in this session
    const viewedKey = `viewed-${type}-${slug}`;
    const hasViewed = Cookies.get(viewedKey);
    
    if (!hasViewed) {
      // Set a cookie to mark this page as viewed
      Cookies.set(viewedKey, "true", { expires: 1 }); // Expires in 1 day
      
      // Increment the view count
      fetch(`/api/views?slug=${slug}&type=${type}`, {
        method: "POST",
      }).catch(err => {
        console.error("Failed to increment view count:", err);
      });
    }
  }, [slug, type]);
  
  // This component doesn't render anything
  return null;
}