import { useState } from "react";
import "./CheckoutPage.css";
import PropTypes from "prop-types";

const PAYMENT_METHODS = [
  { id: "card", label: "Card" },
  { id: "bkash", label: "bKash" },
  { id: "cash", label: "Cash" },
];

const TAX_RATE = 0.05;

function IconPin() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="10"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconTruck() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="10"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

function IconCard() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="10"
      height="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

export default function CheckoutPage({
  setStep,
  subtotal,
  cartFood,
  promo,
  DELIVERY_OPTIONS,
  delivery,
  setDelivery,
}) {
  const [payMethod, setPayMethod] = useState("card");
  const [placing, setPlacing] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    division: "",
    zip: "",
    phone: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const fee = DELIVERY_OPTIONS.find((d) => d.id === delivery)?.fee ?? 50;
  const tax = (subtotal + fee) * TAX_RATE;
  const total = subtotal + fee + tax - promo;

  const handlePlace = () => {
    setPlacing(true);
    setStep(3);
    setTimeout(() => {}, 1400);
  };

  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div className="ck-layout">
        {/* ── Left column ── */}
        <div className="ck-left">
          {/* Delivery address */}
          <div className="ck-section">
            <div className="ck-sec-title">
              <div className="ck-sec-icon">
                <IconPin />
              </div>
              Delivery address
            </div>
            <div className="ck-field-row">
              <div className="ck-field-group">
                <label className="ck-label">First name</label>
                <input
                  className="ck-input"
                  placeholder="Taiatul"
                  value={form.firstName}
                  onChange={set("firstName")}
                />
              </div>
              <div className="ck-field-group">
                <label className="ck-label">Last name</label>
                <input
                  className="ck-input"
                  placeholder="Islam"
                  value={form.lastName}
                  onChange={set("lastName")}
                />
              </div>
            </div>
            <div className="ck-field-row ck-full">
              <div className="ck-field-group">
                <label className="ck-label">Street address</label>
                <input
                  className="ck-input"
                  placeholder="Naogaon Sadar"
                  value={form.address}
                  onChange={set("address")}
                />
              </div>
            </div>
            <div className="ck-field-row ck-tri">
              <div className="ck-field-group">
                <label className="ck-label">City</label>
                <input
                  className="ck-input"
                  placeholder="Naogaon"
                  value={form.city}
                  onChange={set("city")}
                />
              </div>
              <div className="ck-field-group">
                <label className="ck-label">Division</label>
                <input
                  className="ck-input"
                  placeholder="Rajshahi"
                  value={form.division}
                  onChange={set("division")}
                />
              </div>
              <div className="ck-field-group">
                <label className="ck-label">ZIP</label>
                <input
                  className="ck-input"
                  placeholder="6500"
                  value={form.zip}
                  onChange={set("zip")}
                />
              </div>
            </div>
            <div className="ck-field-row ck-full" style={{ marginBottom: 0 }}>
              <div className="ck-field-group">
                <label className="ck-label">Phone number</label>
                <input
                  className="ck-input"
                  placeholder="+880 1XXX-XXXXXX"
                  value={form.phone}
                  onChange={set("phone")}
                />
              </div>
            </div>
          </div>

          {/* Delivery method */}
          <div className="ck-section">
            <div className="ck-sec-title">
              <div className="ck-sec-icon">
                <IconTruck />
              </div>
              Delivery method
            </div>
            <div className="ck-delivery-opts">
              {DELIVERY_OPTIONS.map((opt) => (
                <div
                  key={opt.id}
                  className={`ck-d-opt ${delivery === opt.id ? "ck-d-active" : ""}`}
                  onClick={() => setDelivery(opt.id)}
                >
                  <div className="ck-d-top">
                    <span className="ck-d-name">{opt.label}</span>
                    <div className="ck-d-right">
                      <span className="ck-d-price">
                        {opt.fee === 0 ? "Free" : `৳${opt.fee.toFixed(2)}`}
                      </span>
                      <div
                        className={`ck-radio ${delivery === opt.id ? "ck-radio-checked" : ""}`}
                      />
                    </div>
                  </div>
                  <span className="ck-d-sub">{opt.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="ck-section" style={{ marginBottom: 0 }}>
            <div className="ck-sec-title">
              <div className="ck-sec-icon">
                <IconCard />
              </div>
              Payment method
            </div>
            <div className="ck-pay-methods">
              {PAYMENT_METHODS.map((m) => (
                <div
                  key={m.id}
                  className={`ck-pay-opt ${payMethod === m.id ? "ck-pay-active" : ""}`}
                  onClick={() => setPayMethod(m.id)}
                >
                  <div className="ck-pay-icon">
                    {m.id === "card" && (
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="1" y="4" width="22" height="16" rx="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                    )}
                    {m.id === "bkash" && (
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    )}
                    {m.id === "cash" && (
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M17 9V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2m2 4h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm7-5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="ck-pay-label">{m.label}</div>
                </div>
              ))}
            </div>

            {payMethod === "card" && (
              <>
                <div className="ck-field-row ck-full">
                  <div className="ck-field-group">
                    <label className="ck-label">Cardholder name</label>
                    <input
                      className="ck-input"
                      placeholder="Rafiq Ahmed"
                      value={form.cardName}
                      onChange={set("cardName")}
                    />
                  </div>
                </div>
                <div className="ck-field-row ck-card-row">
                  <div className="ck-field-group">
                    <label className="ck-label">Card number</label>
                    <input
                      className="ck-input"
                      placeholder="•••• •••• •••• ••••"
                      maxLength={19}
                      value={form.cardNumber}
                      onChange={set("cardNumber")}
                    />
                  </div>
                  <div className="ck-field-group">
                    <label className="ck-label">Expiry</label>
                    <input
                      className="ck-input"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={form.expiry}
                      onChange={set("expiry")}
                    />
                  </div>
                  <div className="ck-field-group">
                    <label className="ck-label">CVV</label>
                    <input
                      className="ck-input"
                      placeholder="•••"
                      maxLength={3}
                      type="password"
                      value={form.cvv}
                      onChange={set("cvv")}
                    />
                  </div>
                </div>
              </>
            )}

            {payMethod === "bkash" && (
              <div className="ck-field-row ck-full" style={{ marginBottom: 0 }}>
                <div className="ck-field-group">
                  <label className="ck-label">bKash number</label>
                  <input className="ck-input" placeholder="+880 1XXX-XXXXXX" />
                </div>
              </div>
            )}

            {payMethod === "cash" && (
              <p className="ck-cash-note">
                Pay with cash when your order arrives. Please have the exact
                amount ready.
              </p>
            )}
          </div>
        </div>

        {/* ── Right column — order summary ── */}
        <div className="ck-summary-card">
          <p className="ck-sum-title">Your order</p>

          {cartFood.map((item) => (
            <div key={item.id} className="ck-oc-item">
              <img src={item.image} alt={item.name} className="ck-oc-img" />
              <div className="ck-oc-info">
                <div className="ck-oc-name">{item.name}</div>
                <div className="ck-oc-qty">× {item.quantity}</div>
              </div>
              <span className="ck-oc-price">৳{item.price * item.quantity}</span>
            </div>
          ))}

          <div className="ck-oc-divider" />

          <div className="ck-oc-row">
            <span className="ck-oc-lbl">Subtotal</span>
            <span className="ck-oc-val">৳{subtotal.toFixed(2)}</span>
          </div>
          <div className="ck-oc-row">
            <span className="ck-oc-lbl">Delivery</span>
            <span className="ck-oc-val">
              {fee === 0 ? "Free" : `৳${fee.toFixed(2)}`}
            </span>
          </div>
          {promo > 0 && (
            <div className="ck-oc-row">
              <span className="ck-oc-lbl">Promo</span>
              <span className="ck-oc-val-err">-৳{promo.toFixed(2)}</span>
            </div>
          )}
          <div className="ck-oc-row">
            <span className="ck-oc-lbl">Tax (5%)</span>
            <span className="ck-oc-val">৳{tax.toFixed(2)}</span>
          </div>

          <div className="ck-oc-divider" />

          <div className="ck-oc-total-row">
            <span className="ck-oc-total-lbl">Total</span>
            <span className="ck-oc-total-val">৳{total.toFixed(2)}</span>
          </div>

          <button
            className={`ck-place-btn ${placing ? "ck-placing" : ""}`}
            onClick={handlePlace}
            disabled={placing}
          >
            {placing ? "Placing order…" : "Place order"}
          </button>
        </div>
      </div>
    </div>
  );
}

CheckoutPage.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.function,
  PROMO_CODE: PropTypes.string,
  PROMO_DISCOUNT: PropTypes.number,
  subtotal: PropTypes.number,
  setSubtotal: PropTypes.function,
  cartFood: PropTypes.array,
  promo: PropTypes.number,
  DELIVERY_OPTIONS: PropTypes.array,
  delivery: PropTypes.string,
  setDelivery: PropTypes.function,
};
