import { useState } from "react";
import "./CartPage.css";
import { useNavigate } from "react-router-dom";

const INITIAL_ITEMS = [
  {
    id: 1,
    name: "Tom Yum Thai Soup",
    category: "Soups · Thai",
    image:
      "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&q=70",
    unitPrice: 19,
    qty: 1,
    tags: ["Spicy", "Gluten-free"],
  },
  {
    id: 2,
    name: "Banana Leaf Grilled Fish",
    category: "Grilled · Main",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&q=70",
    unitPrice: 15,
    qty: 2,
    tags: ["High protein", "320 kcal"],
  },
  {
    id: 3,
    name: "Garden Harvest Salad",
    category: "Salads · Light",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&q=70",
    unitPrice: 12,
    qty: 1,
    tags: ["Vegan", "Dairy-free"],
  },
];

const PROMO_CODE = "SAVE10";
const PROMO_DISCOUNT = 0.1;
const TAX_RATE = 0.05;
const DELIVERY_FEE = 2.99;

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

export default function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [deliveryMode, setDeliveryMode] = useState("delivery");
  const [promoInput, setPromoInput] = useState("");
  const [promoState, setPromoState] = useState("idle");
  const [checkingOut, setCheckingOut] = useState(false);

  const promoApplied = promoState === "valid";

  /* ---- Calculations ---- */
  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const delivery = deliveryMode === "delivery" ? DELIVERY_FEE : 0;
  const discount = promoApplied ? subtotal * PROMO_DISCOUNT : 0;
  const tax = (subtotal - discount + delivery) * TAX_RATE;
  const total = subtotal - discount + delivery + tax;
  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  /* ---- Handlers ---- */
  const changeQty = (id, delta) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
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
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      {/* Header */}

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-black">Cart</h1>
        <hr className="mx-auto w-[100px] md:w-[100px] border-[3px] border-secondary rounded-lg my-3" />
        <p className="text-gray-600 max-w-2xl mx-auto">
          Review your order before checkout
        </p>
      </div>

      <div className="cp-layout">
        {/* Left — Cart Items */}
        <div className="cp-left">
          {items.length === 0 ? (
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
                      ${(item.unitPrice * item.qty).toFixed(2)}
                    </span>
                    <div className="cp-qty-row">
                      <button
                        className="cp-qty-btn"
                        onClick={() => changeQty(item.id, -1)}
                      >
                        −
                      </button>
                      <span className="cp-qty-num">{item.qty}</span>
                      <button
                        className="cp-qty-btn"
                        onClick={() => changeQty(item.id, +1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cp-remove-btn"
                      onClick={() => removeItem(item.id)}
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
          <p className="cp-summary-title">Order Summary</p>

          {/* Delivery / Pickup toggle */}
          <div className="cp-delivery-opts">
            <div
              className={`cp-d-opt ${deliveryMode === "delivery" ? "cp-d-active" : ""}`}
              onClick={() => setDeliveryMode("delivery")}
            >
              <div className="cp-d-label">Delivery</div>
              <div className="cp-d-sub">$2.99</div>
            </div>
            <div
              className={`cp-d-opt ${deliveryMode === "pickup" ? "cp-d-active" : ""}`}
              onClick={() => setDeliveryMode("pickup")}
            >
              <div className="cp-d-label">Pickup</div>
              <div className="cp-d-sub">Free</div>
            </div>
          </div>

          {/* Promo code */}
          <div className="cp-promo-wrap">
            <input
              className={`cp-promo-input ${promoState === "valid" ? "cp-promo-valid" : promoState === "invalid" ? "cp-promo-invalid" : ""}`}
              placeholder="Promo code"
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

          {/* Rows */}
          <div className="cp-summary-rows">
            <div className="cp-summary-row">
              <span className="cp-s-label">Subtotal</span>
              <span className="cp-s-val">${subtotal.toFixed(2)}</span>
            </div>
            <div className="cp-summary-row">
              <span className="cp-s-label">Delivery</span>
              <span className="cp-s-val">
                {deliveryMode === "delivery" ? "$2.99" : "Free"}
              </span>
            </div>
            {promoApplied && (
              <div className="cp-summary-row">
                <span className="cp-s-label">Promo (SAVE10)</span>
                <span className="cp-s-val cp-s-discount">
                  −${discount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="cp-summary-row">
              <span className="cp-s-label">Tax (5%)</span>
              <span className="cp-s-val">${tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="cp-divider" />

          <div className="cp-total-row">
            <span className="cp-total-label">Total</span>
            <span className="cp-total-val">${total.toFixed(2)}</span>
          </div>

          <button
            className={`cp-checkout-btn ${checkingOut ? "cp-checkout-loading" : ""}`}
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            {checkingOut ? "Processing…" : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
}
