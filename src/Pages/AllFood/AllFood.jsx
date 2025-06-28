import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";

const AllFood = () => {
  const allFoods = useLoaderData();
  const [foods, setFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const foodPerPage = 9;
  const NoOfPages = Math.ceil(allFoods.length / foodPerPage);
  const navigate = useNavigate();

  // page number generate
  const pages = [];
  for (let i = 0; i < NoOfPages; i++) {
    pages.push(i);
  }

  // load food for specific page
  useEffect(() => {
    fetch(
      `https://food-palace-server-obvwxtfg9-md-taiatul-islam-apons-projects.vercel.app/allFoodPage?page=${currentPage}&size=${foodPerPage} `
    )
      .then((res) => res.json())
      .then((data) => setFoods(data));
  }, [currentPage]);

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  // get search data
  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;

    const smallLetter = name.charAt(0).toUpperCase() + name.slice(1);

    fetch(
      `https://food-palace-server-obvwxtfg9-md-taiatul-islam-apons-projects.vercel.app/allFood/${smallLetter}`
    )
      .then((res) => res.json())
      .then((data) => setFoods(data));
  };

  // handle details button
  const handleDetails = (id) => {
    navigate(`/allFood/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="text-center mt-5">
        <form onSubmit={handleForm}>
          <input
            type="text"
            name="name"
            placeholder="Burger, Pizza, Paste ....."
            className="pl-2 border-2 p-2 border-[#dc3545] rounded-l-lg w-2/3"
          />
          <button className="text-white bg-[#dc3545] border-2 py-2 px-5 border-[#dc3545] rounded-r-lg">
            Search
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10">
        {foods.map((food) => (
          <div
            key={food._id}
            className="card card-compact bg-base-100 shadow-xl border-[3px] border-[#dc3545] p-5"
          >
            <figure>
              <img
                src={food.image}
                alt="food"
                className="md:h-[200px] w-full rounded-b-lg"
              />
            </figure>
            <div className="mt-3">
              <h2 className="text-xl font-semibold">{food.name}</h2>
              <p className="text-2xl font-semibold">
                <span className="font-bold text-[#dc3545]">$ </span>
                {food?.price}
              </p>
              <p
                className={`text-lg font-medium ${
                  food?.quantity > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {food?.quantity > 0 ? "Available" : "Stock Out"}
              </p>
              <div className="flex gap-2 items-center text-[#ffc107]  mb-4 pt-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleDetails(food._id)}
                  className="btn bg-[#dc3545] w-full normal-case text-white"
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-5 justify-center mt-7">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePage(page)}
            className={
              currentPage === page ? "bg-[#dc3545] btn text-white" : "btn"
            }
          >
            {page + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllFood;
