import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FoodCard from "../../Components/FoodCard";
import FoodCardSkeleton from "../../Components/FoodCardSkeleton";
import axiosInstance from "../../api/axiosInstance";

const AllFood = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [priceSort, setPriceSort] = useState("none");
  const foodPerPage = 9;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const fetchAllFoods = async () => {
    let url = `/foods?}`;

    if (searchTerm) {
      url += `name=${searchTerm}&page=${currentPage}`;
    } else {
      url += `page=${currentPage}`;
    }

    const response = await axiosInstance.get(url);

    if (!response.data.success) {
      throw new Error("Failed to fetch food data");
    }

    return response.data;
  };

  const { data: totalFoodData = {}, isLoading: isTotalLoading } = useQuery({
    queryKey: ["all-foods", currentPage, searchTerm],
    queryFn: fetchAllFoods,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const noOfPage = totalFoodData?.meta?.totalPages || 0;
  const pages = Array.from({ length: noOfPage }, (_, index) => index + 1);

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const hasFilterApplied =
    !!searchTerm ||
    categoryFilter !== "all" ||
    availabilityFilter !== "all" ||
    priceSort !== "none";

  const baseFoods = totalFoodData?.data || [];

  const categories = [
    "all",
    ...new Set(
      totalFoodData?.data?.map((food) => food.category).filter(Boolean),
    ),
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

  const isGridLoading = isTotalLoading || (!hasFilterApplied && isTotalLoading);

  return (
    <div className="max-w-7xl mx-auto px-5">
      <div className="text-center my-8">
        <h1 className="text-3xl md:text-5xl font-bold text-black">All Food</h1>
        <hr className="mx-auto w-[100px] md:w-[100px] border-[3px] border-secondary rounded-lg my-3" />
      </div>

      <div className="mt-5 flex justify-end">
        <div className="w-full md:w-auto flex items-center gap-2 md:justify-end">
          <label className="font-semibold text-primary text-nowrap">
            Sort By:
          </label>
          <select
            value={priceSort}
            onChange={(e) => {
              setPriceSort(e.target.value);
              setCurrentPage(1);
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
              <input
                type="text"
                name="name"
                value={searchTerm}
                placeholder="Burger, Pizza, Pasta..."
                className="pl-2 border-2 p-2 border-primary rounded-lg w-full"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div>
              <p className="font-semibold mb-2">Category</p>
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
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
                  setCurrentPage(1);
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
                setCurrentPage(1);
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
                  {page}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFood;
