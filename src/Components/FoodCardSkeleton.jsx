const FoodCardSkeleton = () => {
  return (
    <div className="fc-card">
      {/* Image area */}
      <div className="fc-image-area relative">
        <div className="skeleton w-full h-[200px] rounded-lg" />

        {/* Availability badge */}
        <div className="skeleton bg-base-200 h-5 w-20 absolute top-2 left-2 rounded-full" />

        {/* Time badge */}
        <div className="skeleton bg-base-200 h-5 w-16 absolute top-2 right-10 rounded-full" />

        {/* Wishlist button */}
        <div className="skeleton bg-base-200 w-8 h-8 absolute top-2 right-2 rounded-full" />
      </div>

      {/* Body */}
      <div className="fc-body space-y-3 mt-3">
        {/* Category */}
        <div className="skeleton bg-base-200 h-4 w-24" />

        {/* Name */}
        <div className="skeleton bg-base-200 h-5 w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="skeleton bg-base-200 h-3 w-full" />
          <div className="skeleton bg-base-200 h-3 w-5/6" />
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2">
          <div className="skeleton bg-base-200 h-4 w-20" />
          <div className="skeleton bg-base-200 h-4 w-full" />
        </div>

        {/* Divider */}
        <div className="skeleton bg-base-200 h-[1px] w-full" />

        {/* Bottom */}
        <div className="flex justify-between items-center">
          {/* Price */}
          <div className="space-y-2">
            <div className="skeleton bg-base-200 h-3 w-12" />
            <div className="skeleton bg-base-200 h-5 w-16" />
          </div>

          {/* Qty + button */}
          <div className="flex items-center gap-2">
            <div className="skeleton bg-base-200 w-10 h-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCardSkeleton;
