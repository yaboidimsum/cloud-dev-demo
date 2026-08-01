import Link from "next/link";
import { X } from "lucide-react";

export default function ArtDetailLoading() {
  return (
    <div className="mx-auto max-w-2xl px-6 sm:px-4 pt-12 pb-24">
      {/* Detail Header Skeleton */}
      <header className="flex items-center justify-between gap-4 mb-10">
        <div className="h-5 w-1/3 rounded bg-zinc-200 dark:bg-zinc-900/60 animate-pulse" />
        <Link
          href="/art"
          aria-label="Close"
          className="relative flex items-center justify-center rounded-md p-1.5 transition-[background-color,color,transform] duration-150 ease-out hover:bg-zinc-100 dark:hover:bg-zinc-900 active:scale-[0.96] text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          <X className="h-4 w-4" />
        </Link>
      </header>

      {/* Focus Showcase Preview Area Skeleton */}
      <div className="relative mx-auto w-full overflow-hidden rounded-[12px] border border-zinc-200 dark:border-zinc-800/80 bg-zinc-200 dark:bg-zinc-900/50 aspect-[1344/620] animate-pulse mb-10" />

      {/* Breakdown Details Copy Skeleton */}
      <div className="flex flex-col gap-4">
        <div className="h-4 w-1/4 rounded bg-zinc-200 dark:bg-zinc-900/60 animate-pulse mt-4" />
        <div className="h-3.5 w-full rounded bg-zinc-200 dark:bg-zinc-900/40 animate-pulse" />
        <div className="h-3.5 w-5/6 rounded bg-zinc-200 dark:bg-zinc-900/40 animate-pulse" />
        <div className="h-3.5 w-4/5 rounded bg-zinc-200 dark:bg-zinc-900/40 animate-pulse" />
      </div>
    </div>
  );
}
