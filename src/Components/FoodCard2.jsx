import { useState } from "react";
import "./FoodCard2.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function FoodCard2({ food }) {
  const {
    image = food?.image ||
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    category = food?.category || "",
    name = food?.name || "",
    description = food?.description ||
      "Tender white fish fillet grilled in banana leaf with lemon, herbs & seasoned potatoes.",
    rating = food?.rating || 0.0,
    reviews = food?.reviews || 0,
    price = food?.price || 0,
    available = food?.available || false,
  } = food;
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const navigate = useNavigate();

  const handleDetails = (id) => {
    navigate(`/allFood/${id}`);
  };

  return (
    <div className="fc-card" onClick={() => handleDetails(food?._id)}>
      {/* Image */}
      <div className="fc-image-area">
        <img src={image} alt={name} className="fc-img" />

        <span
          className={`fc-badge-avail ${available ? "fc-avail" : "fc-unavail"}`}
        >
          {available ? "Available" : "Unavailable"}
        </span>

        <button
          className={`fc-wishlist ${wished ? "fc-wished" : ""}`}
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
      </div>

      {/* Body */}
      <div className="fc-body">
        <p className="fc-category">{category}</p>
        <p className="fc-name">{name}</p>
        <p className="fc-desc">{description}</p>

        {/* Meta */}
        <div className="fc-meta">
          <div className="fc-stars">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                viewBox="0 0 20 20"
                width="13"
                height="13"
                fill="#EF9F27"
              >
                <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" />
              </svg>
            ))}
            <span className="fc-rating-val">{rating}</span>
          </div>
          <span className="fc-dot" />
          <span className="fc-reviews">{reviews} reviews</span>
        </div>

        <div className="fc-divider" />

        {/* Bottom row */}
        <div className="fc-bottom">
          <div className="fc-price-block">
            <p className="fc-price-label">Price</p>
            <p className="fc-price">
              <span className="fc-currency">$</span>
              {price?.toFixed(2) * qty}
            </p>
          </div>

          <div className="fc-qty-add">
            <button
              className="fc-qty-btn"
              onClick={(e) => {
                e.stopPropagation();
                setQty((q) => Math.max(1, q - 1));
              }}
            >
              −
            </button>
            <span className="fc-qty-count">{qty}</span>
            <button
              className="fc-qty-btn"
              onClick={(e) => {
                e.stopPropagation();
                setQty((q) => Math.max(1, q + 1));
              }}
            >
              +
            </button>

            <button className="fc-add-btn" aria-label="Add to cart">
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
                fill="none"
                stroke="#E1F5EE"
                strokeWidth="2"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

FoodCard2.propTypes = {
  food: PropTypes.object.isRequired,
};
