"use client";

export default function SkillsSkeleton() {
  const SkillBadgeSkeleton = () => {
    return (
      <div className="mb-2 mr-2 inline-flex h-8 w-28 animate-pulse items-center space-x-1.5 rounded-md bg-gray-200 px-3 py-1.5 text-sm dark:bg-zinc-900" />
    );
  };

  const SectionTitleSkeleton = () => (
    <div className="mb-3 mt-6 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-zinc-900" />
  );

  return (
    <div className="mx-auto max-w-4xl pt-8">
      <div className="mb-12">
        {/* Title skeleton */}
        <div className="mx-auto mb-2 h-9 w-32 animate-pulse rounded bg-gray-200 dark:bg-zinc-900" />

        {/* Subtitle skeleton */}
        <div className="mx-auto mb-12 h-4 w-48 animate-pulse rounded bg-gray-200 dark:bg-zinc-900" />

        {/* Description paragraphs skeleton */}
        <div className="mb-8 space-y-2">
          <div className="space-y-2">
            <div className="h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-zinc-900" />
            <div className="h-5 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-zinc-900" />
            <div className="h-5 w-4/6 animate-pulse rounded bg-gray-200 dark:bg-zinc-900" />
          </div>

          <div className="mt-4 space-y-2">
            <div className="h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-zinc-900" />
            <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-zinc-900" />
          </div>
        </div>

        <div>
          {/* LANGUAGES section */}
          <SectionTitleSkeleton />
          <div className="flex flex-wrap">
            {[...Array(5)].map((_, i) => (
              <SkillBadgeSkeleton key={`lang-${i}`} />
            ))}
          </div>

          {/* FRAMEWORKS section */}
          <SectionTitleSkeleton />
          <div className="flex flex-wrap">
            {[...Array(3)].map((_, i) => (
              <SkillBadgeSkeleton key={`frame-${i}`} />
            ))}
          </div>

          {/* LIBRARIES section */}
          <SectionTitleSkeleton />
          <div className="flex flex-wrap">
            {[...Array(2)].map((_, i) => (
              <SkillBadgeSkeleton key={`lib-${i}`} />
            ))}
          </div>

          {/* TOOLS section */}
          <SectionTitleSkeleton />
          <div className="flex flex-wrap">
            {[...Array(3)].map((_, i) => (
              <SkillBadgeSkeleton key={`tool-${i}`} />
            ))}
          </div>

          {/* PLATFORMS section */}
          <SectionTitleSkeleton />
          <div className="flex flex-wrap">
            {[...Array(3)].map((_, i) => (
              <SkillBadgeSkeleton key={`platform-${i}`} />
            ))}
          </div>

          {/* Footer text skeleton */}
          <div className="mt-8 h-4 w-56 animate-pulse rounded bg-gray-200 dark:bg-zinc-900" />
        </div>
      </div>
    </div>
  );
}
