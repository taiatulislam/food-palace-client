import { useEffect, useState } from "react";
import "./Wishlist.css";
import FoodCardSkeleton from "../../Components/FoodCardSkeleton";
import FoodCard from "../../Components/FoodCard";
import { useQuery } from "@tanstack/react-query";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Soups", value: "soups" },
  { label: "Grilled", value: "grilled" },
  { label: "Salads", value: "salads" },
  { label: "Desserts", value: "desserts" },
];

function HeartEmptyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="#D4537E"
      strokeWidth="1.5"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

/* ── Main page ──────────────────────────────────────── */
export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchAllFoods = async () => {
    const response = await fetch("/json/allFood.json");

    if (!response.ok) {
      throw new Error("Failed to fetch food data");
    }

    return response.json();
  };

  const { data: totalFoodData = [], isLoading } = useQuery({
    queryKey: ["all-foods"],
    queryFn: fetchAllFoods,
  });

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (totalFoodData.length > 0) {
      const matchedItems = totalFoodData.filter((item) =>
        storedWishlist.includes(item._id),
      );

      setItems(matchedItems);
    }
  }, [items]);

  /* stats */
  const totalValue = items.reduce((s, i) => s + i.price, 0);
  const avgRating = items.length
    ? (items.reduce((s, i) => s + i.rating, 0) / items.length).toFixed(1)
    : "—";

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-0 my-10">
      {/* Header */}
      <div className="text-center my-8">
        <h1 className="text-3xl md:text-5xl font-bold text-black">
          My Wishlist
        </h1>
        <hr className="mx-auto w-[100px] md:w-[100px] border-[3px] border-secondary rounded-lg my-3" />
        <p className="text-gray-600 max-w-2xl mx-auto">
          Dishes you&apos;ve saved for later
        </p>
      </div>

      {/* Stats */}
      <div className="wl-stats-row">
        <div className="wl-stat-card">
          <span className="wl-stat-label">Saved items</span>
          <span className="wl-stat-value">{items.length}</span>
        </div>
        <div className="wl-stat-card">
          <span className="wl-stat-label">Total value</span>
          <span className="wl-stat-value">৳ {totalValue}</span>
        </div>
        <div className="wl-stat-card">
          <span className="wl-stat-label">Avg. rating</span>
          <span className="wl-stat-value">{avgRating}</span>
        </div>
      </div>

      {/* Filter chips */}
      <div className="wl-filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={`wl-chip ${filter === f.value ? "wl-chip-active" : ""}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid or empty state */}
      {items.length === 0 ? (
        <div className="wl-empty">
          <div className="wl-empty-icon">
            <HeartEmptyIcon />
          </div>
          <p className="wl-empty-title">Nothing saved yet</p>
          <p className="wl-empty-sub">
            Tap the heart icon on any dish to save it here.
          </p>
        </div>
      ) : (
        <div className="grid justify-center md:grid-cols-2 lg:grid-cols-4 gap-7">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <FoodCardSkeleton key={index} variant="popularFood" />
              ))
            : items?.map((food) => <FoodCard key={food._id} food={food} />)}
        </div>
      )}
    </div>
  );
}
