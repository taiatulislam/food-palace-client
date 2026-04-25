import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

const Purchase = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { data: food = {}, isLoading } = useQuery({
    queryKey: ["purchase-food", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/purchase/${id}`);
      return data;
    },
  });

  const handlePurchase = async (e) => {
    e.preventDefault();
    const form = e.target;
    const purchaseFood = {
      ...food,
      _id: null,
      userName: user?.displayName,
      userEmail: user?.email,
      date: e.target.date.value,
    };

    const { data } = await axiosInstance.post("/purchase", purchaseFood);
    if (data.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "Item Purchased Successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      form.reset();
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto py-10 px-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="skeleton h-10 w-1/2" />
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="skeleton h-12 w-full" />
            ))}
            <div className="skeleton h-12 w-full" />
          </div>
          <div className="skeleton h-[500px] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="pt-5 rounded-b-lg"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/0t43r4M/top-view-fresh-delicious-chinese-food-dark-background.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
      }}
    >
      <div className="flex flex-col">
        <div className="pb-5">
          <h2 className="text-5xl font-bold text-center mt-3 text-primary">
            Order Page
          </h2>
          <div className="flex items-center">
            <div className="w-1/2">
              <form className="px-10" onSubmit={handlePurchase}>
                <div className="form-control">
                  <label className="label">
                    <span className="text-md text-white">Food Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={food.name}
                    className="input"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-md text-white">Food Price</span>
                  </label>
                  <input
                    type="text"
                    name="price"
                    defaultValue={food.price}
                    className="input"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-md text-white">Food Quantity</span>
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    defaultValue={food.quantity}
                    className="input"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-md text-white">User Name</span>
                  </label>
                  <input
                    type="text"
                    name="userName"
                    defaultValue={user?.displayName}
                    className="input"
                    readOnly
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-md text-white">User Email</span>
                  </label>
                  <input
                    type="text"
                    name="userEmail"
                    defaultValue={user?.email}
                    className="input"
                    readOnly
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-md text-white">Purchase Date</span>
                  </label>
                  <input type="date" name="date" className="input" />
                </div>
                <div className="form-control mt-5">
                  <button
                    type="submit"
                    className="btn bg-primary border-none text-white text-md font-medium normal-case"
                  >
                    Purchase
                  </button>
                </div>
              </form>
            </div>
            <div className="w-1/2">
              <figure>
                <img
                  src={food.image}
                  alt="food"
                  className="h-[500px] w-[500px] rounded-lg"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
