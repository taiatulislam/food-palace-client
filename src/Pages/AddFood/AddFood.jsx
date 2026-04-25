import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import axiosInstance from "../../api/axiosInstance";

const pageBackgroundStyle = {
  backgroundImage:
    "linear-gradient(135deg, rgba(0, 0, 0, 0.82), rgba(20, 53, 69, 0.55)), url(https://i.ibb.co/0t43r4M/top-view-fresh-delicious-chinese-food-dark-background.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center bottom",
};

const AddFood = () => {
  const { user } = useContext(AuthContext);

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const origin = form.origin.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const image = form.image.value;
    const details = form.details.value;
    const madeBy = form.madeBy.value;

    const addFood = {
      name,
      category,
      origin,
      price,
      quantity,
      image,
      details,
      madeBy,
    };

    const { data } = await axiosInstance.post("/addFood/", addFood);
    if (data.insertedId) {
      Swal.fire({
        title: "Success!",
        text: "Food Added Successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      form.reset();
    }
  };

  return (
    <div
      className="py-10 px-4 md:px-6"
      style={pageBackgroundStyle}
    >
      <div className="max-w-7xl mx-auto">
        <div className="w-full md:w-3/4 lg:w-1/2 pb-5 bg-black/45 backdrop-blur-sm rounded-xl border border-white/20">
          <h2 className="text-4xl md:text-5xl pb-5 font-bold text-center mt-3 text-primary">
            Add Food Page
          </h2>
          <form className="px-6 md:px-10" onSubmit={handleAdd}>
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Food Name</span>
              </label>
              <input type="text" name="name" className="input" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Food Category</span>
              </label>
              <input type="text" name="category" className="input" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Food Origin</span>
              </label>
              <input type="text" name="origin" className="input" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Food Price</span>
              </label>
              <input type="number" name="price" className="input" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Food Quantity</span>
              </label>
              <input type="number" name="quantity" className="input" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Photo URL</span>
              </label>
              <input type="text" name="image" className="input" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Add By</span>
              </label>
              <input
                type="text"
                name="madeBy"
                defaultValue={user?.email}
                className="input"
                readOnly
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="text-md text-white">Description</span>
              </label>
              <textarea
                name="details"
                rows="4"
                className="rounded-lg p-2"
                required
              />
            </div>
            <div className="form-control mt-5">
              <button
                type="submit"
                className="btn bg-primary border-none text-white text-md font-medium normal-case"
              >
                Add Food
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddFood;
