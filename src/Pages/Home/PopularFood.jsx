import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import FoodCard2 from "../../Components/FoodCard2";
import FoodCardSkeleton2 from "../../Components/FoodCardSkeleton2";

const PopularFood = () => {
  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["popular-food"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/popularFood");
      return Array.isArray(data) ? data.slice(0, 4) : [];
    },
  });

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h3 className="text-3xl md:text-5xl text-center font-bold text-black">
        Top Food
      </h3>
      <hr className="mx-auto w-[100px] md:w-[150px] border-[3px] border-secondary rounded-lg mb-10" />
      <div className="grid md:grid-cols-2 px-5 lg:px-0 lg:grid-cols-4 gap-7">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <FoodCardSkeleton2 key={index} variant="popularFood" />
            ))
          : foods?.map((food) => (
              <FoodCard2
                key={food._id}
                food={food}
                // showAvailability
                // actionLabel="Details"
                // onAction={handleDetails}
              />
            ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/allFood"
          className="btn normal-case text-primary border-2 border-primary"
        >
          See more
        </Link>
      </div>
    </div>
  );
};

export default PopularFood;
