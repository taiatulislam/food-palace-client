import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: food, isLoading } = useQuery({
    queryKey: ["food-details", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/foodDetails/${id}`);
      return data;
    },
  });

  const handleOrder = (foodId) => {
    navigate(`/purchase/${foodId}`);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-5">
        <div className="flex items-center gap-5">
          <div className="w-2/5 skeleton h-screen rounded-lg" />
          <div className="w-3/5 border-2 border-primary rounded-lg px-5 py-6 space-y-4">
            <div className="skeleton h-8 w-2/3" />
            <div className="skeleton h-6 w-1/2" />
            <div className="skeleton h-6 w-1/3" />
            <div className="skeleton h-6 w-2/5" />
            <div className="skeleton h-6 w-4/5" />
            <div className="skeleton h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-5">
      <div className="flex gap-2">
        <div className="w-2/5 h-[500px]">
          <img
            src={food?.image}
            alt="food"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-3/5 border-2 border-primary rounded-lg px-5">
          <h2 className="text-2xl my-3">
            <span className="font-semibold">Food Name:</span> {food?.name}
          </h2>
          <p className="text-lg my-3">
            <span className="font-semibold">Food Category:</span>{" "}
            {food?.category}
          </p>
          <p className="text-lg my-3">
            <span className="font-semibold">Food Price: $</span> {food?.price}
          </p>
          <p className="text-lg my-3">
            <span className="font-semibold">Made By:</span>
          </p>
          <p className="text-lg my-3">
            <span className="font-semibold">Food Origin:</span> {food?.origin}
          </p>
          <p className="text-lg my-3">
            <span className="font-semibold">Description:</span> {food?.details}
          </p>
          <button
            onClick={() => handleOrder(food?._id)}
            className="btn normal-case text-white bg-primary w-full my-3"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
