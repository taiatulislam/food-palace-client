import { useQuery } from "@tanstack/react-query";
import FoodCardSkeleton from "../../Components/FoodCardSkeleton";
import FoodCard from "../../Components/FoodCard";
import axiosInstance from "../../api/axiosInstance";

const AddedFood = () => {
  // const { email } = useParams();

  // const { data: foods = [], isLoading } = useQuery({
  //   queryKey: ["added-food", email],
  //   queryFn: async () => {
  //     const { data } = await axiosInstance.get(`/addedFood/${email}`);
  //     return data;
  //   },
  //   enabled: !!email,
  // });

  const fetchAllFoods = async () => {
    const response = await axiosInstance.get("/foods");

    if (!response.ok) {
      throw new Error("Failed to fetch food data");
    }

    return response.json();
  };

  const { data: totalFoodData = [], isLoading } = useQuery({
    queryKey: ["all-foods"],
    queryFn: fetchAllFoods,
  });

  // const handleUpdate = (id) => {
  //   navigate(`/updateFood/${id}`);
  // };

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-10">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <FoodCardSkeleton key={index} variant="popularFood" />
            ))
          : totalFoodData?.map((food) => (
              <FoodCard key={food._id} food={food} />
            ))}
      </div>

      {!isLoading && totalFoodData.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-lg font-medium text-gray-500">
            No food found for this account.
          </p>
        </div>
      )}
    </div>
  );
};

export default AddedFood;
