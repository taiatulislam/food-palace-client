import { useState } from "react";
import "./FoodDetails2.css";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

export default function FoodDetails2() {
  const { id } = useParams();
  // const navigate = useNavigate();

  const { data: food, isLoading } = useQuery({
    queryKey: ["food-details", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/foodDetails/${id}`);
      return data;
    },
  });

  // const handleOrder = (foodId) => {
  //   navigate(`/purchase/${foodId}`);
  // };

  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    if (!added) {
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      {/* Hero */}
      <div className="fd-hero">
        <img src={food?.image} alt={name} className="fd-hero-img" />
        <div className="fd-hero-overlay" />

        <div className="fd-hero-top">
          <span className="fd-badge-cuisine">{food?.cuisine}</span>
          <span
            className={`fd-badge-avail ${food?.available ? "fd-avail" : "fd-unavail"}`}
          >
            {food?.available ? "Available" : "Unavailable"}
          </span>
        </div>

        <div className="fd-hero-bottom">
          <h1 className="fd-dish-name">{name}</h1>
          <div className="fd-hero-meta">
            <div className="fd-stars">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 20 20"
                  width="12"
                  height="12"
                  fill="#EF9F27"
                >
                  <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" />
                </svg>
              ))}
            </div>
            <span className="fd-rating-num">{food?.rating}</span>
            <span className="fd-hero-dot" />
            <span className="fd-review-count">{food?.reviews} reviews</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="fd-body">
        {/* Quick stats */}
        <div className="fd-quick-stats">
          <div className="fd-stat-card">
            <span className="fd-stat-icon">🕐</span>
            <span className="fd-stat-label">Prep time</span>
            <span className="fd-stat-value">{food?.prepTime}</span>
          </div>
          <div className="fd-stat-card">
            <span className="fd-stat-icon">🌶</span>
            <span className="fd-stat-label">Spice level</span>
            <span className="fd-stat-value">{food?.spiceLevel}</span>
          </div>
          <div className="fd-stat-card">
            <span className="fd-stat-icon">🔥</span>
            <span className="fd-stat-label">Calories</span>
            <span className="fd-stat-value">{food?.calories} kcal</span>
          </div>
        </div>

        {/* Description */}
        <p className="fd-section-label">Description</p>
        <p className="fd-description">{food?.description}</p>

        <div className="fd-divider" />

        {/* Details grid */}
        <p className="fd-section-label">Details</p>
        <div className="fd-info-grid">
          <div className="fd-info-item">
            <span className="fd-info-label">Origin</span>
            <span className="fd-info-val">{food?.origin}</span>
          </div>
          <div className="fd-info-item">
            <span className="fd-info-label">Made by</span>
            <span className="fd-info-val">{food?.madeBy}</span>
          </div>
          <div className="fd-info-item">
            <span className="fd-info-label">Serves</span>
            <span className="fd-info-val">{food?.serves}</span>
          </div>
          <div className="fd-info-item">
            <span className="fd-info-label">Category</span>
            <span className="fd-info-val">{food?.category}</span>
          </div>
        </div>

        <div className="fd-divider" />

        {/* Tags */}
        <p className="fd-section-label">Highlights</p>
        <div className="fd-tags-row">
          {food?.tags?.map((tag) => (
            <span key={tag} className="fd-tag">
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom action bar */}
        <div className="fd-bottom-bar">
          <div className="fd-price-block">
            <span className="fd-price-label">Price</span>
            <span className="fd-price">
              <sup className="fd-currency">$</sup>
              {food?.price}
            </span>
          </div>

          <div className="fd-right-actions">
            <div className="fd-qty-wrap">
              <button
                className="fd-qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="fd-qty-num">{qty}</span>
              <button
                className="fd-qty-btn"
                onClick={() => setQty((q) => q + 1)}
              >
                +
              </button>
            </div>

            <button
              className={`fd-wishlist-btn ${wished ? "fd-wished" : ""}`}
              onClick={() => setWished(!wished)}
              aria-label="Save to wishlist"
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill={wished ? "#E24B4A" : "none"}
                stroke={wished ? "#E24B4A" : "currentColor"}
                strokeWidth="1.5"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>

            <button
              className={`fd-order-btn ${added ? "fd-added" : ""}`}
              onClick={handleAddToCart}
            >
              {added ? `✓ Added (${qty})` : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

FoodDetails2.propTypes = {
  food: PropTypes.object.isRequired,
};
