"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, ArrowLeft } from "lucide-react";

export default function ArtDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the runtime error for debugging
    console.error("Runtime art component error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-4 pt-24 pb-24 flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30 text-red-500 mb-4 border border-red-200/50 dark:border-red-900/30">
        <AlertCircle className="h-6 w-6" />
      </div>

      <h2 className="font-semibold text-base text-zinc-900 dark:text-zinc-50 mb-2">
        Error Loading Showcase
      </h2>
      
      <p className="max-w-md text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
        The interactive showcase encountered a runtime rendering exception. This can occur due to local audio hardware blockages, canvas context initializations, or browser sandbox constraints.
      </p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-[0.98] transition-all cursor-pointer shadow-sm"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Retry Loading</span>
        </button>

        <Link
          href="/art"
          className="inline-flex h-8 items-center gap-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 px-3 text-xs font-medium text-zinc-50 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.98] transition-all shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Art Vault</span>
        </Link>
      </div>
    </div>
  );
}
