import { useContext, useState } from "react";
import "./FoodDetails.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BookingDetailsSkeleton from "../../Components/BookingDetailsSkeleton";
import { ImQuotesLeft } from "react-icons/im";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import axiosInstance from "../../api/axiosInstance";
import { AuthContext } from "../../Providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchWishlists } from "../../utils/fetchFunction";

export default function FoodDetails() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [qty, setQty] = useState(1);
  const [cart, setCart] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  let alertTimeout;

  const { data: wishlistData = [] } = useQuery({
    queryKey: ["all-wishlist"],
    queryFn: () => fetchWishlists(user),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!user,
  });

  const wished = user
    ? wishlistData.some((item) => item?.foodId === id)
    : wishlistData.includes(id);

  const { data: food, isLoading } = useQuery({
    queryKey: ["food-details", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/foods/${id}`);
      return data?.data;
    },
  });

  // const handleOrder = (foodId) => {
  //   navigate(`/purchase/${foodId}`);
  // };

  const showCustomAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);

    clearTimeout(alertTimeout);

    alertTimeout = setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const wishlistMutation = useMutation({
    mutationFn: async (productId) => {
      return axiosInstance.post("/wishlist", {
        foodId: productId,
        email: user?.email,
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["all-wishlist"]);
    },
  });

  const handleWishlist = (productId) => {
    if (user) {
      wishlistMutation.mutate(productId);
      showCustomAlert(`${wished ? "Remove from" : "Add in"} Wishlist.`);
      return;
    }

    // localStorage logic stays same
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlist.includes(productId);

    if (exists) {
      wishlist = wishlist.filter((id) => id !== productId);
      showCustomAlert("Removed from wishlist successfully!");
    } else {
      wishlist.push(productId);
      showCustomAlert("Added to wishlist successfully!");
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const handleCart = () => {
    const newCart = !cart;
    setCart(newCart);
    showCustomAlert(
      newCart
        ? "Added to cart successfully!"
        : "Removed from cart successfully!",
    );
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      {isLoading ? (
        <BookingDetailsSkeleton />
      ) : (
        <div>
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
                <span className="fd-review-count">
                  {food?.reviews?.length} reviews
                </span>
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
                <span className="fd-price-label mb-1">Price</span>
                <span className="fd-price">
                  <sup className="fd-currency font-normal">৳</sup>
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
                  onClick={() => handleWishlist(food?._id)}
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
                  className={`fd-order-btn ${cart ? "fd-added" : ""}`}
                  onClick={handleCart}
                >
                  {cart ? `✓ Added (${qty})` : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      <div className="text-center my-8">
        <h1 className="text-3xl md:text-5xl font-bold text-black">Reviews</h1>
        <hr className="mx-auto w-[130px] md:w-[180px] border-[3px] border-secondary rounded-lg my-3" />
        <p className="text-gray-600 max-w-2xl mx-auto">
          Fresh ideas, practical kitchen tips, and food business insights to
          help you cook better and serve smarter.
        </p>
      </div>

      <Swiper
        className="testimonial-swiper"
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={30}
        loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        {isLoading
          ? [...Array(5)].map((_, i) => (
              <SwiperSlide key={i} className="h-auto">
                <div className="border-[3px] border-secondary rounded-lg mt-7 p-7 relative animate-pulse h-full min-h-[250px] flex flex-col justify-between">
                  {/* Review text skeleton */}
                  <div className="space-y-3">
                    <div className="h-4 bg-base-300 rounded w-full"></div>
                    <div className="h-4 bg-base-300 rounded w-5/6"></div>
                    <div className="h-4 bg-base-300 rounded w-4/6"></div>
                    <div className="h-4 bg-base-300 rounded w-3/4"></div>
                  </div>

                  {/* Name skeleton */}
                  <div className="mt-5">
                    <div className="h-5 w-32 bg-base-300 rounded"></div>
                  </div>

                  {/* Quote icon skeleton */}
                  <div className="rounded-full bg-base-300 w-10 h-10 absolute bottom-2 right-2"></div>
                </div>
              </SwiperSlide>
            ))
          : food?.reviews?.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div className="border-[3px] border-secondary rounded-lg mt-7 p-7 relative h-full min-h-[250px] flex flex-col justify-between">
                  <p className="flex-grow">{item.review}</p>

                  <div className="flex gap-3 mt-5 items-center">
                    <h3 className="font-semibold">{item.name}</h3>
                  </div>

                  <ImQuotesLeft className="rounded-full bg-secondary w-10 h-10 p-2 absolute bottom-2 right-2" />
                </div>
              </SwiperSlide>
            ))}
      </Swiper>

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
