export default function ClientContentSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_250px]">
      {/* Main content skeleton */}
      <div className="space-y-6">
        {/* Multiple paragraph skeletons */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-2">
            {i % 3 === 0 && (
              <div className="h-7 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            )}
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div
              className={`h-4 w-${
                i % 2 === 0 ? "5/6" : "4/5"
              } animate-pulse rounded bg-gray-200 dark:bg-gray-700`}
            />
          </div>
        ))}
      </div>

      {/* Table of contents skeleton */}
      <div className="hidden md:block">
        <div className="sticky top-8">
          <div className="mb-4 h-5 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-4 w-${
                  i % 3 === 0 ? "full" : i % 3 === 1 ? "5/6" : "4/5"
                } animate-pulse rounded bg-gray-200 dark:bg-gray-700`}
                style={{ marginLeft: i % 2 === 0 ? "0" : "12px" }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
