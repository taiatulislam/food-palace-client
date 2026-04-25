import { useState } from "react";
import "./FoodDetails2.css";
import PropTypes from "prop-types";

export default function FoodDetails2({
  image = "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&q=80",
  name = "Tom Yum Thai Soup",
  cuisine = "Thai Cuisine",
  available = true,
  rating = 4.8,
  reviews = 312,
  prepTime = "20 min",
  spiceLevel = "Medium",
  calories = 210,
  description = "Tom Yum is a bold, aromatic Thai soup famed for its hot-and-sour profile. It features lemongrass, kaffir lime leaves, galangal, and fresh chili, balanced with shrimp or chicken in a clear or coconut-milk broth. Served with jasmine rice or crusty bread — a complete meal in a bowl.",
  origin = "Thailand",
  madeBy = "Chef Somchai",
  serves = "1–2 persons",
  category = "Soups & Stews",
  tags = [
    "Gluten-free",
    "Dairy-free",
    "High protein",
    "Lemongrass",
    "Coconut milk",
    "Aromatic herbs",
  ],
  price = 19,
}) {
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
        <img src={image} alt={name} className="fd-hero-img" />
        <div className="fd-hero-overlay" />

        <div className="fd-hero-top">
          <span className="fd-badge-cuisine">{cuisine}</span>
          <span
            className={`fd-badge-avail ${available ? "fd-avail" : "fd-unavail"}`}
          >
            {available ? "Available" : "Unavailable"}
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
            <span className="fd-rating-num">{rating}</span>
            <span className="fd-hero-dot" />
            <span className="fd-review-count">{reviews} reviews</span>
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
            <span className="fd-stat-value">{prepTime}</span>
          </div>
          <div className="fd-stat-card">
            <span className="fd-stat-icon">🌶</span>
            <span className="fd-stat-label">Spice level</span>
            <span className="fd-stat-value">{spiceLevel}</span>
          </div>
          <div className="fd-stat-card">
            <span className="fd-stat-icon">🔥</span>
            <span className="fd-stat-label">Calories</span>
            <span className="fd-stat-value">{calories} kcal</span>
          </div>
        </div>

        {/* Description */}
        <p className="fd-section-label">Description</p>
        <p className="fd-description">{description}</p>

        <div className="fd-divider" />

        {/* Details grid */}
        <p className="fd-section-label">Details</p>
        <div className="fd-info-grid">
          <div className="fd-info-item">
            <span className="fd-info-label">Origin</span>
            <span className="fd-info-val">{origin}</span>
          </div>
          <div className="fd-info-item">
            <span className="fd-info-label">Made by</span>
            <span className="fd-info-val">{madeBy}</span>
          </div>
          <div className="fd-info-item">
            <span className="fd-info-label">Serves</span>
            <span className="fd-info-val">{serves}</span>
          </div>
          <div className="fd-info-item">
            <span className="fd-info-label">Category</span>
            <span className="fd-info-val">{category}</span>
          </div>
        </div>

        <div className="fd-divider" />

        {/* Tags */}
        <p className="fd-section-label">Highlights</p>
        <div className="fd-tags-row">
          {tags.map((tag) => (
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
              {price}
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
  image: PropTypes.string,
  name: PropTypes.string,
  cuisine: PropTypes.string,
  available: PropTypes.bool,
  rating: PropTypes.number,
  reviews: PropTypes.number,
  prepTime: PropTypes.string,
  spiceLevel: PropTypes.string,
  calories: PropTypes.number,
  description:
    PropTypes.string,
  origin: PropTypes.string,
  madeBy: PropTypes.string,
  serves: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
  price: PropTypes.number,
};
