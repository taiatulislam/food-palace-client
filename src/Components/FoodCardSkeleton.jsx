const FoodCardSkeleton = ({ variant = "allFood" }) => {
  const isPopular = variant === "popularFood";

  return (
    <div
      className={`bg-base-100 shadow-xl p-5 border-primary ${
        isPopular ? "flex flex-col border-4 rounded-lg" : "card card-compact border-[3px]"
      }`}
    >
      <div className={`skeleton bg-base-300 h-[200px] w-full ${isPopular ? "rounded-lg" : "rounded-b-lg"}`} />
      <div className={`${isPopular ? "flex flex-col pt-3" : "mt-3"}`}>
        <div className="flex gap-2 items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton bg-base-300 h-4 w-4 rounded-full" />
          ))}
        </div>
        <div className={`skeleton bg-base-300 mt-2 ${isPopular ? "h-6 w-3/4" : "h-7 w-4/5"}`} />
        <div className={`skeleton bg-base-300 mt-2 ${isPopular ? "h-5 w-1/3" : "h-7 w-1/3"}`} />
        {!isPopular && <div className="skeleton bg-base-300 mt-2 h-6 w-1/2" />}
        <div className={`skeleton bg-base-300 w-full ${isPopular ? "h-10 mt-3 rounded-lg" : "h-12 mt-4"}`} />
      </div>
    </div>
  );
};

export default FoodCardSkeleton;
