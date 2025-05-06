import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogsLoading() {
  return (
    <div className="mx-auto max-w-4xl pl-12 pt-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center text-gray-400 hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      <h1 className="mb-8 text-3xl font-bold">Blogs</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Generate 6 skeleton cards */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
          >
            {/* Image placeholder */}
            <div className="relative h-48 w-full animate-pulse bg-gray-200 dark:bg-gray-700" />

            {/* Content area */}
            <div className="p-4">
              {/* Title placeholder */}
              <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

              {/* Date placeholder */}
              <div className="mb-3 h-4 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

              {/* Description placeholder */}
              <div className="mb-4 space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>

              {/* Tags placeholder */}
              <div className="flex flex-wrap gap-2">
                <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
                <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
