import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BlogDetailSkeleton() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col pl-2 pt-8">
      {/* Back link */}
      <Link
        href="/blogs/"
        className="mb-8 inline-flex items-center tracking-tighter text-zinc-400 hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Link>

      {/* Cover image skeleton */}
      <div className="mb-8 h-[400px] w-full animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-900" />

      {/* Blog header skeleton */}
      <div className="mb-8">
        {/* Title skeleton */}
        <div className="mb-4 h-10 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />

        {/* Date and author info skeleton */}
        <div className="mb-4 flex items-center">
          {/* Author image skeleton */}
          <div className="mr-3 h-10 w-10 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-900" />
          {/* Date skeleton */}
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
        </div>

        {/* Abstract skeleton - multiple lines */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-6">
        {/* Heading skeletons */}
        <div className="h-7 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />

        {/* Paragraph skeletons */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
        </div>

        {/* Another heading skeleton */}
        <div className="h-6 w-1/2 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />

        {/* More paragraph skeletons */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
        </div>

        {/* Code block skeleton */}
        <div className="h-32 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />

        {/* Final paragraphs */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
        </div>
      </div>
    </div>
  );
}
