import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const PopularFood = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetch(
      "https://food-palace-server-obvwxtfg9-md-taiatul-islam-apons-projects.vercel.app/popularFood"
    )
      .then((res) => res.json())
      .then((data) => setFoods(data.slice(0, 4)));
  }, []);

  return (
    <div className="max-w-7xl mx-auto pt-16">
      <h3 className="text-5xl text-center font-bold text-black">Top Food</h3>
      <hr className="mx-auto w-[150px] border-[3px] border-[#ffc107] rounded-lg mb-12" />
      <div className="grid md:grid-cols-2 px-5 lg:px-0 lg:grid-cols-4 gap-7">
        {foods.map((food) => (
          <div
            key={food._id}
            className="flex flex-col bg-base-100 shadow-xl border-4 border-[#ffc107] rounded-lg p-5"
          >
            <img
              src={food.image}
              alt="food"
              className="h-[200px] w-full rounded-lg"
            />
            <div className="flex flex-col">
              <div className="flex gap-3 items-center pt-3">
                <FaStar className="text-[#ffc107] text-lg" />
                <FaStar className="text-[#ffc107] text-lg" />
                <FaStar className="text-[#ffc107] text-lg" />
                <FaStar className="text-[#ffc107] text-lg" />
                <FaStar className="text-[#ffc107] text-lg" />
              </div>
              <h2 className="text-xl font-semibold py-2">{food.name}</h2>
              <p className="text-lg font-medium">
                <span className="text-[#dc3545] font-bold text-xl">$ </span>
                {food.price}
              </p>
              <button className="bg-[#ffc107] w-full rounded-lg py-2 mt-3 font-medium">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="my-10 text-center">
        <Link
          to="/allFood"
          className="btn normal-case text-[#dc3545] border-2 border-[#dc3545]"
        >
          See all
        </Link>
      </div>
    </div>
  );
};

export default PopularFood;
