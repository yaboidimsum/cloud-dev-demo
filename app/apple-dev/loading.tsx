import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogsLoading() {
  return (
    <div className="mx-auto max-w-4xl pt-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center tracking-tighter text-zinc-400 transition duration-150 ease-in-out hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4 " /> Back to Home
      </Link>
      <div className="flex flex-col gap-2">
        <div className="mb-6 h-8 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
        <div className="mb-6 h-8 w-96 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Generate 6 skeleton cards */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700"
          >
            {/* Image placeholder */}
            <div className="relative h-48 w-full animate-pulse bg-zinc-200 dark:bg-zinc-700" />

            {/* Content area */}
            <div className="p-4">
              {/* Title placeholder */}
              <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />

              {/* Date placeholder */}
              <div className="mb-3 h-4 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />

              {/* Description placeholder */}
              <div className="mb-4 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-700" />
              </div>

              {/* Tags placeholder */}
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
                <div className="h-6 w-14 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
