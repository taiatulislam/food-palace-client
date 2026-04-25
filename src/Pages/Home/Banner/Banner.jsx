import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "./Banner.css";

import { FaStar } from "react-icons/fa";
import BannerCard from "../../../Components/BannerCard";
import { Link } from "react-router-dom";

import bannerBG from "../../../assets/images/patron-black.jpg";
import foodBG from "../../../assets/images/patron.jpg";

import banner1 from "../../../assets/images/banner/banner-1.webp";
import banner2 from "../../../assets/images/banner/banner-2.webp";
import banner3 from "../../../assets/images/banner/banner-3.webp";
import banner4 from "../../../assets/images/banner/banner-4.webp";

const Banner = () => {
  return (
    <div
      className="md:h-screen flex items-center"
      style={{
        backgroundImage: `url(${bannerBG})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl w-full mx-auto">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={320}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="max-w-7xl mx-auto flex items-center justify-between mt-16">
              <img
                src={foodBG}
                alt="bg"
                className="h-[50%] md:h-[80%] w-[55%] rounded-l-full absolute right-0 -z-10"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                sizes="55vw"
              />

              <div>
                <h3 className="text-primary text-lg lg:text-2xl font-semibold">
                  Fastest Delivery & Easy Pickup
                </h3>
                <h1 className="text-secondary text-3xl md:text-5xl lg:text-8xl font-bold">
                  Kings Burger
                </h1>
                <p className="text-lg lg:text-2xl text-white max-w-lg my-1 md:my-5">
                  Good food starts with good ingredients. We only bring you the
                  best.
                </p>
                {/* button and rating div*/}
                <div className="flex flex-col-reverse md:flex-row item-center gap-2 md:gap-10">
                  <Link to="/allFood">
                    <button className="bg-primary text-white p-3 font-semibold rounded-lg">
                      View Our Menu
                    </button>
                  </Link>
                  {/* Rating */}
                  <div className="flex gap-3 items-center">
                    <FaStar className="text-secondary text-base md:text-xl" />
                    <FaStar className="text-secondary text-base md:text-xl" />
                    <FaStar className="text-secondary text-base md:text-xl" />
                    <FaStar className="text-secondary text-base md:text-xl" />
                    <FaStar className="text-secondary text-base md:text-xl" />
                  </div>
                </div>
              </div>

              {/* Discount */}
              <div>
                <p className="text-black text-2xl font-bold text-center rounded-full w-[100px] lg:w-[170px] h-[100px] lg:h-[170px] bg-secondary border-2 border-black absolute bottom-10 md:bottom-4">
                  upto <br /> <span className="text-2xl lg:text-7xl">20%</span>{" "}
                  <br />
                  OFF
                </p>
                <img
                  src={banner1}
                  alt="burger"
                  className="w-[600px] lg:max-w-xl z-10 max-w"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  sizes="(max-width: 768px) 70vw, 600px"
                />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <BannerCard
              foodImage={banner2}
              foodName={"Delicious Food"}
            ></BannerCard>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <BannerCard
              foodImage={banner3}
              foodName={"Food Platter"}
            ></BannerCard>
          </SwiperSlide>

          {/* Slide 4 */}
          <SwiperSlide>
            <BannerCard
              foodImage={banner4}
              foodName={"Garlic Pizza"}
            ></BannerCard>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
