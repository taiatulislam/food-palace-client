import { useEffect, useState } from "react";
import "../CheckoutPage/CheckoutPage.css";
import CartPage from "./CartPage";
import CheckoutPage from "../CheckoutPage/CheckoutPage";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";

const DELIVERY_OPTIONS = [
  { id: "standard", label: "Standard", sub: "30–45 min", fee: 50.0 },
  { id: "express", label: "Express", sub: "15–20 min", fee: 100.0 },
  { id: "pickup", label: "Pickup", sub: "Ready in 60 min", fee: 0 },
];

const PROMO_CODE = "SAVE10";
const PROMO_DISCOUNT = 0.1;

export default function CartSteps() {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [promo, setPromo] = useState(0);
  const [delivery, setDelivery] = useState("standard");

  const fetchCartFood = async () => {
    const response = await fetch("/json/cart.json");

    if (!response.ok) {
      throw new Error("Failed to fetch food data");
    }

    return response.json();
  };

  const {
    data: cartFood = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["cart-food"],
    queryFn: fetchCartFood,
    staleTime: 0,
  });

  useEffect(() => {
    if (cartFood?.length > 0) {
      setItems(cartFood);
    }
  }, [cartFood]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  function IconCheck() {
    return (
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="#1D9E75"
        strokeWidth="2"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }

  function StepBar() {
    const steps = ["Delivery", "Payment", "Confirm"];

    return (
      <div className="ck-steps w-full overflow-x-auto justify-center">
        <div className="flex items-center min-w-max md:min-w-0 md:w-full justify-between px-2">
          {steps.map((label, i) => {
            const num = i + 1;
            const done = num < step;
            const active = num === step;

            return (
              <div
                key={label}
                className={`flex items-center ${
                  i === steps.length - 1 ? "flex-none" : "flex-1"
                }`}
              >
                {/* Step */}
                <div className="flex flex-col items-center relative min-w-[70px] sm:min-w-[90px] md:[600px]">
                  <div
                    className={`ck-step-num ${
                      done ? "done" : active ? "active" : "idle"
                    } ${step > num ? "cursor-pointer" : ""}`}
                    onClick={() => step > num && setStep(num)}
                  >
                    {done ? (
                      <svg
                        viewBox="0 0 12 12"
                        width="10"
                        height="10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="2,6 5,9 10,3" />
                      </svg>
                    ) : (
                      num
                    )}
                  </div>

                  <span
                    className={`ck-step-label ${
                      active ? "active" : ""
                    } text-xs sm:text-sm text-center mt-2 whitespace-nowrap`}
                  >
                    {label}
                  </span>
                </div>

                {/* Connector Line */}
                {i < steps.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-2 sm:mx-3 min-w-[30px] ${
                      done ? "bg-secondary" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {step === 1 && (
        <SectionTitle
          name={"Cart"}
          subTitle={"Review your order before checkout"}
        />
      )}
      {step === 2 && (
        <SectionTitle
          name={"Checkout"}
          subTitle={"Complete your order in a few easy steps"}
        />
      )}
      {step === 3 && (
        <SectionTitle name={"Confirm"} subTitle={"Order has been placed!"} />
      )}

      <div className="max-w-[900px] mx-auto">
        <StepBar />
      </div>

      {step === 1 && (
        <CartPage
          setStep={setStep}
          PROMO_CODE={PROMO_CODE}
          PROMO_DISCOUNT={PROMO_DISCOUNT}
          subtotal={subtotal}
          setSubtotal={setSubtotal}
          setPromo={setPromo}
          items={items}
          setItems={setItems}
          isLoading={isLoading}
          isFetching={isFetching}
        />
      )}
      {step === 2 && (
        <CheckoutPage
          setStep={setStep}
          subtotal={subtotal}
          cartFood={items}
          promo={promo}
          delivery={delivery}
          setDelivery={setDelivery}
          DELIVERY_OPTIONS={DELIVERY_OPTIONS}
        />
      )}
      {step === 3 && (
        <div className="ck-page mb-10 px-5 lg:px-0">
          <div className="ck-success">
            <div className="ck-check-circle">
              <IconCheck />
            </div>
            <h2 className="ck-success-title">Order placed!</h2>
            <p className="ck-success-sub">
              Your food is being prepared.
              <br />
              Estimated delivery:{" "}
              {DELIVERY_OPTIONS.find((d) => d.id === delivery)?.sub}.
            </p>
            <span className="ck-order-num"># ORD-2026-8847</span>

            <div>
              <Link
                to="/"
                className="btn btn-sm normal-case mt-3 text-xs text-primary border-2 border-primary"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const SectionTitle = ({ name, subTitle }) => {
  return (
    <div className="text-center my-8">
      <h1 className="text-3xl md:text-5xl font-bold text-black">{name}</h1>
      <hr className="mx-auto w-[100px] md:w-[100px] border-[3px] border-secondary rounded-lg my-3" />
      <p className="text-gray-600 max-w-2xl mx-auto">{subTitle}</p>
    </div>
  );
};

SectionTitle.propTypes = {
  name: PropTypes.string,
  subTitle: PropTypes.string,
};
