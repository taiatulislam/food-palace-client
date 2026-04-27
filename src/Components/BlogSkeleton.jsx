
export default function BlogSkeleton() {
  return (
    <div>
      <article
        className="border-2 border-primary rounded-xl overflow-hidden bg-white animate-pulse"
      >
        {/* Image skeleton */}
        <div className="w-full h-[220px] bg-gray-300" />

        <div className="p-5 space-y-3">
          {/* Category */}
          <div className="h-3 w-20 bg-gray-300 rounded" />

          {/* Title */}
          <div className="h-5 w-full bg-gray-300 rounded" />

          {/* Description lines */}
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />

          {/* Footer */}
          <div className="flex items-center justify-between mt-4">
            <div className="h-3 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-20 bg-gray-300 rounded" />
          </div>
        </div>
      </article>
    </div>
  );
}
