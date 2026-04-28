import { useEffect, useState } from "react";
import "./CartPage.css";
import RecentlyViewed from "../../Components/RecentlyViewed";
import PropTypes from "prop-types";

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
}) {
  const [promoInput, setPromoInput] = useState("");
  const [promoState, setPromoState] = useState("idle");
  const [checkingOut, setCheckingOut] = useState(false);

  const promoApplied = promoState === "valid";

  const calculateSubtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
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
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
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
    setStep(2);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="cp-layout">
        {/* Left — Cart Items */}
        <div className="cp-left">
          {isLoading ? (
            <div className="cp-item-list">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="cp-item-card animate-pulse">
                  {/* Image Skeleton */}
                  <div
                    className="bg-base-300 rounded-lg"
                    style={{ width: "90px", height: "90px" }}
                  ></div>

                  {/* Content Skeleton */}
                  <div className="cp-item-info flex-1">
                    <div className="h-3 bg-base-300 rounded w-20 mb-3"></div>
                    <div className="h-5 bg-base-300 rounded w-40 mb-3"></div>

                    <div className="flex gap-2">
                      <div className="h-6 w-14 bg-base-300 rounded-full"></div>
                      <div className="h-6 w-16 bg-base-300 rounded-full"></div>
                      <div className="h-6 w-12 bg-base-300 rounded-full"></div>
                    </div>
                  </div>

                  {/* Right Skeleton */}
                  <div className="cp-item-right">
                    <div className="h-5 w-16 bg-base-300 rounded mb-4"></div>

                    <div className="flex gap-2 items-center mb-4">
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
            <div className="cp-item-list">
              {items.map((item) => (
                <div key={item.id} className="cp-item-card">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cp-item-img"
                  />

                  <div className="cp-item-info">
                    <p className="cp-item-cat">{item.category}</p>
                    <p className="cp-item-name">{item.name}</p>

                    <div className="cp-item-tags">
                      {item.tags.map((tag) => (
                        <span key={tag} className="cp-item-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="cp-item-right">
                    <span className="cp-item-price">
                      ৳{(item.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="cp-qty-row">
                      <button
                        className="cp-qty-btn"
                        onClick={() => changeQty(item._id, -1)}
                      >
                        −
                      </button>

                      <span className="cp-qty-num">{item.quantity}</span>

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
        <div className="cp-summary-card">
          {isLoading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-base-300 rounded w-40"></div>

              <div className="flex gap-4">
                <div className="h-16 flex-1 bg-base-300 rounded-lg"></div>
                <div className="h-16 flex-1 bg-base-300 rounded-lg"></div>
              </div>

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
};
