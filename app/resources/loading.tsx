import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ResourcesLoading() {
  return (
    <div className="mx-auto max-w-4xl pt-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center tracking-tighter text-zinc-400 transition duration-150 ease-in-out hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-medium tracking-tighter text-zinc-900 dark:text-zinc-50">
          Resources
        </h1>
        <p className="mb-8 text-sm tracking-tighter text-zinc-500 dark:text-zinc-400">
          A curated collection of design guidelines, courses, and utilities that I learn from and use in daily engineering work.
        </p>

        {/* Categories tabs placeholder */}
        <div className="flex gap-2 mb-8">
          <div className="h-8 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-8 w-28 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-8 w-28 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Generate 6 skeleton cards matching Resources Card layout */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between"
            >
              {/* Image banner placeholder (aspect-video) */}
              <div className="relative aspect-video w-full animate-pulse bg-zinc-200 dark:bg-zinc-900/50" />

              {/* Content area */}
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  {/* Top Meta & Icon */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-10 w-10 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-900" />
                    <div className="h-5 w-12 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
                  </div>

                  {/* Title placeholder */}
                  <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />

                  {/* Description placeholder */}
                  <div className="mb-4 space-y-2">
                    <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
                  </div>
                </div>

                {/* Footer tags placeholder */}
                <div className="mt-auto pt-2 flex flex-wrap gap-1.5">
                  <div className="h-5 w-12 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
                  <div className="h-5 w-16 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
