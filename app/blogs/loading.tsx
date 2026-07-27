import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogsLoading() {
  return (
    <div className="mx-auto max-w-4xl pt-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center text-gray-400 hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      <h1 className="mb-8 text-3xl font-bold">Blogs</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Generate 6 skeleton cards matching ProjectCard layout */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950"
          >
            {/* Image placeholder (aspect-video) */}
            <div className="relative aspect-video w-full animate-pulse bg-zinc-200 dark:bg-zinc-900" />

            {/* Content area */}
            <div className="p-4">
              {/* Tags placeholder (at the top) */}
              <div className="mb-4 flex flex-wrap gap-2">
                <div className="h-5 w-12 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
                <div className="h-5 w-16 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
                <div className="h-5 w-14 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
              </div>

              {/* Title placeholder */}
              <div className="mb-1 h-6 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />

              {/* Date placeholder */}
              <div className="mb-4 h-4 w-1/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />

              {/* Description/Abstract placeholder (line-clamp-2 shape) */}
              <div className="mb-4 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
                <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
              </div>

              <hr className="border-zinc-200 dark:border-zinc-800 my-4" />

              {/* Footer views/likes placeholder */}
              <div className="flex justify-between">
                <div className="flex gap-8">
                  <div className="h-4 w-16 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
                  <div className="h-4 w-14 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
