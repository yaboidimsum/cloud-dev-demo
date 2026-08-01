import Link from "next/link";
import { X } from "lucide-react";

export default function ArtsLoading() {
  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-4 pt-12 pb-24">
      {/* Vault-style Header Skeleton */}
      <header className="flex items-center justify-between gap-4 mb-8">
        <h1 className="font-semibold text-base text-zinc-900 dark:text-zinc-50">Arts</h1>
        <Link
          href="/"
          aria-label="Close"
          className="relative flex items-center justify-center rounded-md p-1.5 transition-[background-color,color,transform] duration-150 ease-out hover:bg-zinc-100 dark:hover:bg-zinc-900 active:scale-[0.96] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <X className="h-4 w-4" />
        </Link>
      </header>

      {/* Single-Column Grid Skeleton */}
      <div className="grid grid-cols-1 gap-y-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-2"
          >
            {/* Aspect-video preview skeleton */}
            <div className="mx-auto w-full overflow-hidden rounded-[12px] border border-zinc-100 dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-900/50 aspect-video animate-pulse" />

            {/* Bottom metadata skeleton */}
            <div className="flex items-center justify-between gap-3 px-1 pt-2.5 pb-1">
              <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-900/60 animate-pulse" />
              <div className="h-3.5 w-1/5 rounded bg-zinc-200 dark:bg-zinc-900/40 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
