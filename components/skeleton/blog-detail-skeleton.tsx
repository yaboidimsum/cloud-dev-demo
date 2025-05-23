import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function BlogDetailSkeleton() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col pl-2 pt-8">
      {/* Back link */}
      <Link href="/blogs/" className="mb-8 inline-flex items-center text-gray-400 hover:text-white">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Link>

      {/* Cover image skeleton */}
      <div className="h-[400px] w-full mb-8 rounded-lg bg-gray-200 animate-pulse dark:bg-gray-700" />

      {/* Blog header skeleton */}
      <div className="mb-8">
        {/* Title skeleton */}
        <div className="h-10 w-3/4 mb-4 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />

        {/* Date and author info skeleton */}
        <div className="flex items-center mb-4">
          {/* Author image skeleton */}
          <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse dark:bg-gray-700 mr-3" />
          {/* Date skeleton */}
          <div className="h-4 w-32 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
        </div>

        {/* Abstract skeleton - multiple lines */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
          <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
          <div className="h-4 w-4/6 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="space-y-6">
        {/* Heading skeletons */}
        <div className="h-7 w-2/3 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />

        {/* Paragraph skeletons */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
          <div className="h-4 w-full rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
          <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
        </div>

        {/* Another heading skeleton */}
        <div className="h-6 w-1/2 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />

        {/* More paragraph skeletons */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
          <div className="h-4 w-full rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
          <div className="h-4 w-4/5 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
        </div>

        {/* Code block skeleton */}
        <div className="h-32 w-full rounded bg-gray-200 animate-pulse dark:bg-gray-700" />

        {/* Final paragraphs */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
          <div className="h-4 w-5/6 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
          <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse dark:bg-gray-700" />
        </div>
      </div>
    </div>
  )
}
