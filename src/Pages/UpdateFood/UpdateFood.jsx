import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

const pageBackgroundStyle = {
  backgroundImage:
    "linear-gradient(135deg, rgba(0, 0, 0, 0.82), rgba(20, 53, 69, 0.55)), url(https://i.ibb.co/0t43r4M/top-view-fresh-delicious-chinese-food-dark-background.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center bottom",
};

const UpdateFood = () => {
  const { id } = useParams();
  const { data: food = {}, isLoading } = useQuery({
    queryKey: ["update-food", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/updateFood/${id}`);
      return data;
    },
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const image = form.image.value;
    const category = form.category.value;
    const origin = form.origin.value;
    const price = form.price.value;
    const details = form.details.value;
    const quantity = form.quantity.value;

    const updateFood = {
      name,
      image,
      category,
      origin,
      price,
      details,
      quantity,
    };

    const { data } = await axiosInstance.put(
      `/updateFood/${food._id}`,
      updateFood,
    );
    if (data.modifiedCount > 0) {
      Swal.fire({
        title: "Success!",
        text: "Food Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
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
            <div className="skeleton h-24 w-full" />
          </div>
          <div className="skeleton h-[500px] w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 md:px-6" style={pageBackgroundStyle}>
      <div className="max-w-7xl mx-auto">
        <div className="w-full lg:w-4/5 pb-5 bg-black/45 backdrop-blur-sm rounded-xl border border-white/20">
          <h2 className="text-4xl md:text-5xl pb-5 font-bold text-center mt-3 text-primary">
            Update Page
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-8 px-6 md:px-10">
            <div className="w-full lg:w-1/2">
              <form onSubmit={handleUpdate}>
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
                    <span className="text-md text-white">Food Category</span>
                  </label>
                  <input
                    type="text"
                    name="category"
                    defaultValue={food.category}
                    className="input"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-md text-white">Food Origin</span>
                  </label>
                  <input
                    type="text"
                    name="origin"
                    defaultValue={food.origin}
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
                    <span className="text-md text-white">Photo URL</span>
                  </label>
                  <input
                    type="text"
                    name="image"
                    defaultValue={food.image}
                    className="input"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="text-md text-white">Description</span>
                  </label>
                  <textarea
                    name="details"
                    defaultValue={food.details}
                    rows="4"
                    className="rounded-lg p-2"
                  />
                </div>
                <div className="form-control mt-5">
                  <button
                    type="submit"
                    className="btn bg-primary border-none text-white text-md font-medium normal-case"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full lg:w-1/2">
              <figure>
                <img
                  src={food.image}
                  alt="food"
                  className="h-[300px] md:h-[500px] w-full rounded-lg object-cover"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFood;
