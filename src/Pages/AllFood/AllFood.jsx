import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "../../api/axiosInstance";
import FoodCard from "../../Components/FoodCard";
import FoodCardSkeleton from "../../Components/FoodCardSkeleton";

const AllFood = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("none");
  const foodPerPage = 9;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // const { data: totalFoodData = [], isLoading: isTotalLoading } = useQuery({
  //   queryKey: ["all-food-total"],
  //   queryFn: async () => {
  //     const { data } = await axiosInstance.get("/allFood");
  //     return data;
  //   },
  // });

  const fetchAllFoods = async () => {
    const response = await fetch("/json/allFood.json");

    if (!response.ok) {
      throw new Error("Failed to fetch food data");
    }

    return response.json();
  };

  const { data: totalFoodData = [], isLoading: isTotalLoading } = useQuery({
    queryKey: ["all-foods"],
    queryFn: fetchAllFoods,
  });

  console.log("totalFoodData", totalFoodData);

  const noOfPage = Math.ceil((totalFoodData?.length || 0) / foodPerPage);
  const pages = [];
  for (let i = 0; i < noOfPage; i++) {
    pages.push(i);
  }

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    setSearchTerm(name.trim().toLowerCase());
    setCurrentPage(0);
  };

  const hasFilterApplied =
    !!searchTerm ||
    categoryFilter !== "all" ||
    availabilityFilter !== "all" ||
    priceSort !== "none";

  const pagedFoods = totalFoodData?.slice(
    currentPage * foodPerPage,
    (currentPage + 1) * foodPerPage,
  );

  const baseFoods = hasFilterApplied ? totalFoodData : pagedFoods;

  const categories = [
    "all",
    ...new Set(totalFoodData?.map((food) => food.category).filter(Boolean)),
  ];

  const displayFoods = [...baseFoods]
    .filter((food) =>
      searchTerm ? food?.name?.toLowerCase().includes(searchTerm) : true,
    )
    .filter((food) =>
      categoryFilter !== "all" ? food?.category === categoryFilter : true,
    )
    .filter((food) => {
      if (availabilityFilter === "available") return Number(food?.quantity) > 0;
      if (availabilityFilter === "stockout") return Number(food?.quantity) <= 0;
      return true;
    })
    .sort((a, b) => {
      if (priceSort === "low-to-high")
        return Number(a?.price) - Number(b?.price);
      if (priceSort === "high-to-low")
        return Number(b?.price) - Number(a?.price);
      return 0;
    });

  console.log("baseFoods", baseFoods);
  console.log("displayFoods", displayFoods);

  const isGridLoading = isTotalLoading || (!hasFilterApplied && isTotalLoading);

  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="mt-5 flex justify-end">
        <div className="w-full md:w-auto flex items-center gap-2 md:justify-end">
          <label className="font-semibold text-primary">Sort By:</label>
          <select
            value={priceSort}
            onChange={(e) => {
              setPriceSort(e.target.value);
              setCurrentPage(0);
            }}
            className="select select-bordered border-2 border-primary w-full md:w-[220px]"
          >
            <option value="none">Default Price</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-5 items-start">
        <div className="lg:col-span-1 rounded-lg p-4 bg-base-100 shadow">
          <h3 className="text-xl font-bold text-primary mb-4">Filters</h3>

          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2">Search Food</p>
              <form onSubmit={handleForm}>
                <div className="flex">
                  <input
                    type="text"
                    name="name"
                    value={searchTerm}
                    placeholder="Burger, Pizza, Pasta..."
                    className="pl-2 border-2 p-2 border-primary rounded-l-lg w-full"
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="text-white bg-primary border-2 py-2 px-4 border-primary rounded-r-lg">
                    Go
                  </button>
                </div>
              </form>
            </div>

            <div>
              <p className="font-semibold mb-2">Category</p>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(0);
                }}
                className="select select-bordered border-2 border-primary w-full"
              >
                {categories?.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <p className="font-semibold mb-2">Availability</p>
              <select
                value={availabilityFilter}
                onChange={(e) => {
                  setAvailabilityFilter(e.target.value);
                  setCurrentPage(0);
                }}
                className="select select-bordered border-2 border-primary w-full"
              >
                <option value="all">All Availability</option>
                <option value="available">Available</option>
                <option value="stockout">Stock Out</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
                setAvailabilityFilter("all");
                setPriceSort("none");
                setCurrentPage(0);
              }}
              className="btn w-full bg-primary text-white normal-case"
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {isGridLoading
              ? Array.from({ length: foodPerPage })?.map((_, index) => (
                  <FoodCardSkeleton key={index} />
                ))
              : displayFoods?.map((food) => (
                  <FoodCard key={food._id} food={food} />
                ))}
          </div>

          <div className="flex gap-5 justify-center m-7">
            {!hasFilterApplied &&
              pages?.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePage(page)}
                  className={
                    currentPage === page ? "bg-primary btn text-white" : "btn"
                  }
                >
                  {page + 1}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFood;
