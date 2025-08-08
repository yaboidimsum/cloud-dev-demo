"use client";

import Link from "next/link";

export default function HomeSkeleton() {
  return (
    <div className="mx-auto max-w-4xl pt-8">
      <div className="mb-12 w-full">
        {/* Introduction section skeleton */}
        <div>
          <div className="mb-1 h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="mb-2 h-9 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="mb-6 h-4 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
        </div>

        <div className="space-y-6">
          {/* Description paragraphs skeleton */}
          <div className="mb-2 space-y-2">
            <div className="h-5 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
            <div className="h-5 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
            <div className="h-5 w-4/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          </div>

          <div className="mb-6 space-y-2">
            <div className="h-5 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
            <div className="h-5 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
            <div className="h-5 w-4/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          </div>

          {/* Availability and email button skeleton */}
          <div className="mb-12 flex flex-wrap gap-4">
            <div className="h-10 w-32 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-900" />
            <div className="h-10 w-32 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-900" />
          </div>

          {/* Animated beam skeleton */}
          <div className="h-64 w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-900" />

          {/* Contribution graph skeleton */}
          <div className="mb-12 w-full">
            <div className="mb-4 h-8 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
            <div className="h-40 w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-900" />
          </div>

          {/* Timeline skeleton (commented out in original) */}
          <div className="mb-12" />

          {/* Social links section skeleton */}
          <div className="mb-12">
            <div className="mb-4 h-5 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />

            <div className="flex flex-wrap gap-2">
              {/* GitHub button skeleton */}
              <div className="h-10 w-28 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-900" />

              {/* LinkedIn button skeleton */}
              <div className="h-10 w-32 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-900" />

              {/* Resume button skeleton */}
              <div className="h-10 w-28 animate-pulse rounded-md bg-zinc-200 dark:bg-zinc-900" />
            </div>
          </div>

          {/* Projects section skeleton */}
          <div>
            <div className="mb-4 h-5 w-64 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />

            {/* Link to projects */}
            <Link href="/projects" className="text-blue-400 hover:underline">
              <div className="h-5 w-24 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
            </Link>
          </div>

          {/* Blog posts section skeleton (commented out in original) */}
          <div className="mt-16" />
        </div>
      </div>
    </div>
  );
}
