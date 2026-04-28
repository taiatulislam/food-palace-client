import { useQuery } from "@tanstack/react-query";
import FoodCardSkeleton from "./FoodCardSkeleton";
import FoodCard from "./FoodCard";

const RecentlyViewed = () => {
  const fetchRecentView = async () => {
    const response = await fetch("/json/popularFood.json");

    if (!response.ok) {
      throw new Error("Failed to fetch food data");
    }

    return response.json();
  };

  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["recent-view"],
    queryFn: fetchRecentView,
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-5 lg:px-0">
      <h3 className="text-3xl md:text-5xl text-center font-bold text-black">
        Recently Viewed
      </h3>
      <hr className="mx-auto w-[100px] md:w-[150px] border-[3px] border-secondary rounded-lg mb-10" />
      <div className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-7">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <FoodCardSkeleton key={index} variant="popularFood" />
            ))
          : foods?.map((food) => <FoodCard key={food._id} food={food} />)}
      </div>
    </div>
  );
};

export default RecentlyViewed;
