import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ArtsLoading() {
  return (
    <div className="mx-auto max-w-4xl pt-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center tracking-tighter text-zinc-400 transition duration-150 ease-in-out hover:text-zinc-600 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>

      <div className="mb-8 flex items-center gap-2">
        <h1 className="text-3xl font-medium tracking-tighter">Arts</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Generate 6 skeleton cards matching ArtCard layout */}
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col justify-between"
          >
            {/* Visual content placeholder (aspect-video) */}
            <div className="relative aspect-video w-full animate-pulse bg-zinc-200 dark:bg-zinc-900/50" />

            {/* Content area */}
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                {/* Title placeholder */}
                <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-zinc-200 dark:bg-zinc-900" />
              </div>

              {/* Tags placeholder (at the bottom) */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <div className="h-5 w-12 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
                <div className="h-5 w-16 animate-pulse rounded-full bg-zinc-100 dark:bg-zinc-900" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
