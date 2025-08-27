import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectsLoading() {
  return (
    <div className="mx-auto max-w-4xl pt-8">
      {/* Back link */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center tracking-tighter text-gray-400 transition duration-150 ease-in-out hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      {/* Header skeleton */}
      <div className="flex flex-col gap-2">
        {/* AppleLocation placeholder */}
        <div className="h-5 w-80 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        {/* Title placeholder */}
        <div className="h-10 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Description placeholder */}
      <div className="mb-10 mt-6 space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Project cards skeleton */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700"
          >
            {/* Image placeholder */}
            <div className="relative h-40 w-full animate-pulse bg-zinc-200 dark:bg-zinc-700" />

            {/* Content area */}
            <div className="p-4">
              {/* Title placeholder */}
              <div className="mb-3 h-6 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              {/* Description lines */}
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              </div>
              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
