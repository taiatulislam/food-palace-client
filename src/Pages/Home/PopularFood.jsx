import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "../../api/axiosInstance";
import FoodCard from "../../Components/FoodCard";
import FoodCardSkeleton from "../../Components/FoodCardSkeleton";

const PopularFood = () => {
  // const { data: foods = [], isLoading } = useQuery({
  //   queryKey: ["popular-food"],
  //   queryFn: async () => {
  //     const { data } = await axiosInstance.get("/popularFood");
  //     return Array.isArray(data) ? data.slice(0, 4) : [];
  //   },
  // });

  const fetchPopularFood = async () => {
    const response = await fetch("/json/popularFood.json");

    if (!response.ok) {
      throw new Error("Failed to fetch food data");
    }

    return response.json();
  };

  const { data: popularFood = [], isLoading } = useQuery({
    queryKey: ["popular-food"],
    queryFn: fetchPopularFood,
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-5 lg:px-0">
      <h3 className="text-3xl md:text-5xl text-center font-bold text-black">
        Top Food
      </h3>
      <hr className="mx-auto w-[100px] md:w-[150px] border-[3px] border-secondary rounded-lg mb-10" />
      <div className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-7">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <FoodCardSkeleton key={index} variant="popularFood" />
            ))
          : popularFood?.map((food) => <FoodCard key={food._id} food={food} />)}
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
