
export default function BookingDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto my-10 animate-pulse">
    {/* Hero Skeleton */}
    <div className="relative rounded-2xl overflow-hidden">
      <div className="w-full h-[400px] bg-gray-300" />

      <div className="absolute top-6 left-6 flex gap-3">
        <div className="h-8 w-28 bg-gray-200 rounded-full" />
        <div className="h-8 w-24 bg-gray-200 rounded-full" />
      </div>

      <div className="absolute bottom-8 left-8 space-y-4">
        <div className="h-10 w-72 bg-gray-200 rounded" />
        <div className="flex gap-3">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-28 bg-gray-200 rounded" />
        </div>
      </div>
    </div>

    {/* Body Skeleton */}
    <div className="mt-8 space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-24 bg-gray-200 rounded-xl"
          />
        ))}
      </div>

      {/* Description */}
      <div className="space-y-3">
        <div className="h-5 w-32 bg-gray-300 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
      </div>

      {/* Details */}
      <div className="space-y-4">
        <div className="h-5 w-24 bg-gray-300 rounded" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-4">
        <div className="h-5 w-28 bg-gray-300 rounded" />
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-24 bg-gray-200 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-6">
        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-300 rounded" />
          <div className="h-8 w-24 bg-gray-300 rounded" />
        </div>

        <div className="flex gap-4 items-center">
          <div className="h-12 w-32 bg-gray-200 rounded-lg" />
          <div className="h-12 w-12 bg-gray-200 rounded-full" />
          <div className="h-12 w-40 bg-gray-300 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
  )
}
