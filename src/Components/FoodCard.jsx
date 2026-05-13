import { useContext, useState } from "react";
import "./FoodCard.css";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import placeholderImage from "../assets/images/placeholder.png";
import { AuthContext } from "../Providers/AuthProvider";

export default function FoodCard({ food = {} }) {
  const {
    _id,
    image = placeholderImage,
    category = "",
    name = "",
    description = "",
    rating = 0.0,
    reviews = [],
    price = 0,
    available = false,
    prepTime = "0 Min",
    calories = 0,
  } = food;
  const reviewCount = reviews.length;

  const { user } = useContext(AuthContext);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const wished = wishlist?.includes(_id);
  let alertTimeout;

  const showCustomAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);

    clearTimeout(alertTimeout);

    alertTimeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleWishlist = (e, productId) => {
    e.stopPropagation();

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.includes(productId);

    if (exists) {
      wishlist = wishlist.filter((id) => id !== productId);

      if (wishlist.length === 0) {
        localStorage.removeItem("wishlist");
      } else {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }

      showCustomAlert("Removed from wishlist successfully!");
    } else {
      wishlist.push(productId);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      showCustomAlert("Added to wishlist successfully!");
    }
  };

  const handleCart = (e, productId, quantity) => {
    e.stopPropagation();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += quantity;

      showCustomAlert("Quantity updated in cart!");
    } else {
      cart.push({
        id: productId,
        cart: quantity,
      });

      showCustomAlert("Added to cart successfully!");
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleDetails = (id) => {
    if (user?.role === "user") {
      navigate(`/allFood/${id}`);
    } else {
      navigate(`/dashboard/manage-food/${id}`);
    }
  };

  return (
    <div className="fc-card" onClick={() => handleDetails(_id)}>
      {/* Image */}
      <div className="fc-image-area">
        <img
          src={image || placeholderImage}
          alt={name}
          loading="lazy"
          decoding="async"
          width="400"
          height="300"
          className="w-full aspect-[4/3] object-cover rounded-xl"
          onError={(e) => (e.currentTarget.src = placeholderImage)}
        />

        <span
          className={`fc-badge-avail ${available ? "fc-avail" : "fc-unavail"}`}
        >
          {available ? "Available" : "Unavailable"}
        </span>

        <span className="fc-badge-time">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            width="11"
            height="11"
          >
            <circle cx="8" cy="8" r="6.5" />
            <polyline points="8,4 8,8 10.5,10" />
          </svg>
          {prepTime}
        </span>

        <button
          className={`fc-wishlist ${wished ? "fc-wished" : ""}`}
          onClick={(e) => handleWishlist(e, _id)}
          aria-label="Save to wishlist"
        >
          <svg
            viewBox="0 0 24 24"
            width="15"
            height="15"
            fill={wished ? "var(--color-primary)" : "none"}
            stroke={wished ? "var(--color-primary)" : "currentColor"}
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
                fill="var(--color-star)"
              >
                <polygon points="10,1 12.9,7 19.5,7.6 14.5,12 16.2,18.5 10,15 3.8,18.5 5.5,12 0.5,7.6 7.1,7" />
              </svg>
            ))}
            <span className="fc-rating-val">{rating}</span>
          </div>
          <span className="fc-dot" />
          <span className="fc-reviews">{reviewCount} reviews</span>
          <span className="fc-dot" />
          <span className="fc-calories">{calories} kcal</span>
        </div>

        {/* Bottom row */}
        {user?.role === "user" && (
          <>
            <div className="fc-divider" />

            <div className="fc-bottom">
              <div className="fc-price-block">
                <p className="fc-price-label">Price</p>
                <p className="fc-price">
                  <span className="fc-currency">৳ </span>
                  {price?.toFixed(2)}
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

                <button
                  className="fc-add-btn"
                  aria-label="Add to cart"
                  onClick={(e) => handleCart(e, _id, qty)}
                >
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
          </>
        )}
      </div>

      {showAlert && (
        <div className="fixed bottom-5 right-5 z-50 w-auto max-w-sm">
          <div
            role="alert"
            className="alert alert-success alert-soft shadow-lg text-white py-3"
          >
            <span>{alertMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}

FoodCard.propTypes = {
  food: PropTypes.object.isRequired,
};
