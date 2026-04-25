import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";
import FoodCardSkeleton from "../../Components/FoodCardSkeleton";

const OrderedFood = () => {
  const { email } = useParams();
  const { data: foods = [], isLoading } = useQuery({
    queryKey: ["ordered-food", email],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/ordered/${email}`);
      return data;
    },
    enabled: !!email,
  });
  const [loadData, setLoadData] = useState([]);

  useEffect(() => {
    setLoadData(foods);
  }, [foods]);

  const handleDelete = async (id) => {
    const { data } = await axiosInstance.delete(`/order/${id}`);
    if (data.deletedCount > 0) {
      Swal.fire({
        title: "Success!",
        text: "Food delete",
        icon: "success",
        confirmButtonText: "OK",
      });
      const remaining = loadData.filter((food) => food._id !== id);
      setLoadData(remaining);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 py-8">
      <h2 className="text-3xl md:text-5xl text-center font-bold text-black">
        My Ordered Food
      </h2>
      <hr className="mx-auto w-[190px] border-[3px] border-secondary rounded-lg mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-10">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <FoodCardSkeleton key={index} />
            ))
          : loadData.map((food) => (
              <div
                key={food._id}
                className="card card-compact bg-base-100 shadow-xl border-[3px] border-primary p-5"
              >
                <figure>
                  <img
                    src={food.image}
                    alt="food"
                    className="h-[200px] w-full rounded-b-lg"
                  />
                </figure>
                <div className="mt-3">
                  <div className="flex gap-2 items-center text-[#ffc107]">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                  <h2 className="text-xl font-semibold pt-2">{food.name}</h2>
                  <p className="text-base font-medium">
                    <span className="font-bold">Category:</span> {food.category}
                  </p>
                  <p className="text-base font-medium">
                    <span className="font-bold">MadeBy:</span> {food.madeBy}
                  </p>
                  <p className="text-base font-medium">
                    <span className="font-bold">Buying Date:</span> {food.date}
                  </p>
                  <p className="text-2xl font-semibold mb-4">
                    <span className="font-bold text-primary">$ </span>
                    {food.price}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="btn bg-primary w-full normal-case text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      {!isLoading && loadData.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-lg font-medium text-gray-500">
            No ordered food found for this account.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderedFood;
