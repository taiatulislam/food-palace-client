// import { Link } from "react-router-dom";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";

const Banner = () => {
  return (
    <section
      className="h-[100vh] pt-[200px]"
      style={{
        backgroundImage: "url(https://i.ibb.co/XkKCdB0/patron-black.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
      >
        {/* Slide 1 */}
        <SwiperSlide className="text-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <img
              src="https://i.ibb.co/QdHbqft/patron.jpg"
              alt="bg"
              className="h-[80%] w-[55%] rounded-l-full absolute right-0 -z-10"
            />
            <div>
              <div>
                <h3 className="text-[#dc3545] text-2xl font-semibold">
                  Fastest Delivery & Easy Pickup
                </h3>
                <h1 className="text-[#ffc107] text-8xl font-bold">
                  Kings Burger
                </h1>
                <p className="text-2xl text-white max-w-lg my-5">
                  Good food starts with good ingredients. We only bring you the
                  best.
                </p>
                {/* button and rating div*/}
                <div className="flex item-center gap-10">
                  <button className="bg-[#dc3545] p-3 font-semibold rounded-lg">
                    View Our Menu
                  </button>
                  {/* Rating */}
                  <div className="flex gap-3 items-center">
                    <FaStar className="text-[#ffc107] text-xl" />
                    <FaStar className="text-[#ffc107] text-xl" />
                    <FaStar className="text-[#ffc107] text-xl" />
                    <FaStar className="text-[#ffc107] text-xl" />
                    <FaStar className="text-[#ffc107] text-xl" />
                    <p className="text-[#ffc107] font-semibold text-xl">4.8</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              {/* Discount */}
              <p className="text-black text-2xl font-bold text-center rounded-full w-[170px] h-[170px] bg-[#ffc107] border-2 border-black absolute bottom-4">
                upto <br /> <span className="text-7xl">20%</span> <br />
                OFF
              </p>
              <img
                src="https://i.ibb.co/2NyfDvn/bagar-img.png"
                alt="burger"
                className="max-w-xl z-10"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="text-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <img
              src="https://i.ibb.co/QdHbqft/patron.jpg"
              alt="bg"
              className="h-[80%] w-[55%] rounded-l-full absolute right-0 -z-10"
            />
            <div>
              <h3 className="text-[#dc3545] text-2xl font-bold">
                Fastest Delivery & Easy Pickup
              </h3>
              <h1 className="text-[#ffc107] text-8xl font-bold">
                Delicious Food
              </h1>
              <p className="text-2xl text-white max-w-lg my-5">
                Good food starts with good ingredients. We only bring you the
                best.
              </p>
              <button className="bg-[#dc3545] p-3 font-semibold rounded-lg">
                View Our Menu
              </button>
            </div>
            <div>
              <img
                src="https://i.ibb.co/NWXwfky/slide2-2-img.png"
                alt="stick"
                className="max-w-xl z-10"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="text-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <img
              src="https://i.ibb.co/QdHbqft/patron.jpg"
              alt="bg"
              className="h-[80%] w-[55%] rounded-l-full absolute right-0 -z-10"
            />
            <div>
              <h3 className="text-[#dc3545] text-2xl font-bold">
                Fastest Delivery & Easy Pickup
              </h3>
              <h1 className="text-[#ffc107] text-8xl font-bold">
                Food Platter
              </h1>
              <p className="text-2xl text-white max-w-lg my-5">
                Good food starts with good ingredients. We only bring you the
                best.
              </p>
              <button className="bg-[#dc3545] p-3 font-semibold rounded-lg">
                View Our Menu
              </button>
            </div>
            <div>
              <img
                src="https://i.ibb.co/LYT22VC/slide2-3-img.png"
                alt="meat box"
                className="max-w-xl z-10"
              />
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide className="text-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <img
              src="https://i.ibb.co/QdHbqft/patron.jpg"
              alt="bg"
              className="h-[80%] w-[55%] rounded-l-full absolute right-0 -z-10"
            />
            <div>
              <h3 className="text-[#dc3545] text-2xl font-bold">
                Fastest Delivery & Easy Pickup
              </h3>
              <h1 className="text-[#ffc107] text-8xl font-bold">
                Garlic Pizza
              </h1>
              <p className="text-2xl text-white max-w-lg my-5">
                Good food starts with good ingredients. We only bring you the
                best.
              </p>
              <button className="bg-[#dc3545] p-3 font-semibold rounded-lg">
                View Our Menu
              </button>
            </div>
            <div>
              <img
                src="https://i.ibb.co/rcTKYVf/slide2-4-img.png"
                alt="pizza"
                className="max-w-xl z-10"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
