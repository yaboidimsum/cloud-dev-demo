"use client";

import React, { useState, useRef } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyablePre({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const handleCopy = async () => {
    if (!preRef.current) return;
    // Copy innerText to extract raw text content cleanly
    const text = preRef.current.innerText || "";
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="relative group my-6 w-full max-w-full min-w-0 overflow-hidden">
      <pre
        ref={preRef}
        className="overflow-x-auto rounded-lg bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800 text-sm font-mono text-zinc-100"
        {...props}
      >
        {children}
      </pre>
      <button
        onClick={handleCopy}
        className="absolute right-3 top-3 p-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
        title="Copy code"
        aria-label="Copy code"
      >
        {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
      </button>
    </div>
  );
}
