import { useContext, useEffect, useState } from "react";
import "./CartPage.css";
import RecentlyViewed from "../../Components/RecentlyViewed";
import PropTypes from "prop-types";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

export default function CartPage({
  setStep,
  PROMO_CODE,
  PROMO_DISCOUNT,
  subtotal,
  setSubtotal,
  setPromo,
  items,
  setItems,
  isLoading,
  isFetching,
}) {
  const { user } = useContext(AuthContext);
  const [promoInput, setPromoInput] = useState("");
  const [promoState, setPromoState] = useState("idle");
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();

  const promoApplied = promoState === "valid";

  const calculateSubtotal = items.reduce((s, i) => s + i.price * i.cart, 0);
  const discount = promoApplied ? calculateSubtotal * PROMO_DISCOUNT : 0;
  const total = calculateSubtotal - discount;

  useEffect(() => {
    setSubtotal(calculateSubtotal);
    setPromo(discount);
  }, [calculateSubtotal, discount, setSubtotal, setPromo]);

  const changeQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, cart: Math.max(1, item.cart + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter((item) => String(item.id) !== String(id));

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const applyPromo = () => {
    if (promoInput.trim().toUpperCase() === PROMO_CODE) {
      setPromoState("valid");
    } else {
      setPromoState("invalid");
    }
  };

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => setCheckingOut(false), 2000);

    if (user) {
      setStep(2);
    } else {
      navigate("/signIn");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-0 mb-10">
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left — Cart Items */}
        <div className="w-full xl:w-[65%]">
          {isLoading || isFetching ? (
            <div className="cp-item-list space-y-5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="cp-item-card animate-pulse flex flex-col sm:flex-row gap-4"
                >
                  {/* Image Skeleton */}
                  <div className="bg-base-300 rounded-lg w-full sm:w-[90px] h-[180px] sm:h-[90px] shrink-0"></div>

                  {/* Content Skeleton */}
                  <div className="cp-item-info flex-1">
                    <div className="h-3 bg-base-300 rounded w-20 mb-3"></div>
                    <div className="h-5 bg-base-300 rounded w-40 mb-3"></div>

                    <div className="flex flex-wrap gap-2">
                      <div className="h-6 w-14 bg-base-300 rounded-full"></div>
                      <div className="h-6 w-16 bg-base-300 rounded-full"></div>
                      <div className="h-6 w-12 bg-base-300 rounded-full"></div>
                    </div>
                  </div>

                  {/* Right Skeleton */}
                  <div className="cp-item-right flex flex-row sm:flex-col justify-between sm:justify-start gap-4">
                    <div className="h-5 w-16 bg-base-300 rounded"></div>

                    <div className="flex gap-2 items-center">
                      <div className="h-8 w-8 bg-base-300 rounded"></div>
                      <div className="h-5 w-8 bg-base-300 rounded"></div>
                      <div className="h-8 w-8 bg-base-300 rounded"></div>
                    </div>

                    <div className="h-8 w-8 bg-base-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="cp-empty">
              <div className="cp-empty-icon">🛒</div>
              <p className="cp-empty-text">Your cart is empty</p>
            </div>
          ) : (
            <div className="cp-item-list space-y-5">
              {items.map((item) => (
                <div key={item.id} className="cp-item-card flex flex-row gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cp-item-img w-full sm:w-[90px] h-[220px] sm:h-[90px] object-cover rounded-lg"
                  />

                  <div className="cp-item-info flex-1">
                    <p className="cp-item-cat">{item.category}</p>
                    <p className="cp-item-name">{item.name}</p>

                    <div className="cp-item-tags flex flex-wrap gap-2 mt-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="cp-item-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="cp-item-right flex flex-row sm:flex-col justify-between sm:justify-start gap-4">
                    <span className="cp-item-price">
                      ৳{(item.price * item.cart).toFixed(2)}
                    </span>

                    <div className="cp-qty-row">
                      <button
                        className="cp-qty-btn"
                        onClick={() => changeQty(item._id, -1)}
                      >
                        −
                      </button>

                      <span className="cp-qty-num">{item.cart}</span>

                      <button
                        className="cp-qty-btn"
                        onClick={() => changeQty(item._id, +1)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="cp-remove-btn"
                      onClick={() => removeItem(item._id)}
                      aria-label="Remove item"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — Order Summary */}
        <div className="w-full xl:w-[35%]">
          <div className="cp-summary-card sticky top-6">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-base-300 rounded w-40"></div>

                <div className="h-12 bg-base-300 rounded-lg w-full"></div>

                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 bg-base-300 rounded w-24"></div>
                    <div className="h-4 bg-base-300 rounded w-16"></div>
                  </div>
                ))}

                <div className="h-[1px] bg-base-300 w-full"></div>

                <div className="flex justify-between">
                  <div className="h-5 bg-base-300 rounded w-20"></div>
                  <div className="h-5 bg-base-300 rounded w-24"></div>
                </div>

                <div className="h-12 bg-base-300 rounded-lg w-full"></div>
              </div>
            ) : (
              <>
                <p className="cp-summary-title">Order Summary</p>

                {/* Promo code */}
                <div className="cp-promo-wrap">
                  <input
                    className={`cp-promo-input ${
                      promoState === "valid"
                        ? "cp-promo-valid"
                        : promoState === "invalid"
                          ? "cp-promo-invalid"
                          : ""
                    }`}
                    placeholder="Promo code (SAVE10)"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoState("idle");
                    }}
                    onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                  />

                  <button className="cp-promo-btn" onClick={applyPromo}>
                    Apply
                  </button>
                </div>

                {promoState === "invalid" && (
                  <p className="cp-promo-error">Invalid promo code</p>
                )}

                {promoState === "valid" && (
                  <p className="cp-promo-success">10% discount applied!</p>
                )}

                {/* Summary rows */}
                <div className="cp-summary-rows">
                  <div className="cp-summary-row">
                    <span className="cp-s-label">Subtotal</span>
                    <span className="cp-s-val">৳{subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="cp-summary-row">
                      <span className="cp-s-label">Promo (SAVE10)</span>
                      <span className="cp-s-val cp-s-discount">
                        −৳{discount.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="cp-divider" />

                <div className="cp-total-row">
                  <span className="cp-total-label">Total</span>
                  <span className="cp-total-val">৳{total.toFixed(2)}</span>
                </div>

                <button
                  className={`cp-checkout-btn ${
                    checkingOut ? "cp-checkout-loading" : ""
                  }`}
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                >
                  {checkingOut ? "Processing…" : "Proceed to Checkout"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <RecentlyViewed />
    </div>
  );
}

CartPage.propTypes = {
  setStep: PropTypes.function,
  PROMO_CODE: PropTypes.string,
  PROMO_DISCOUNT: PropTypes.number,
  subtotal: PropTypes.number,
  setSubtotal: PropTypes.function,
  setPromo: PropTypes.function,
  items: PropTypes.array,
  setItems: PropTypes.function,
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
};
