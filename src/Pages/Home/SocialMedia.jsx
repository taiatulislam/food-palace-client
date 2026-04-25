import { FaInstagram } from "react-icons/fa6";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import social1 from "../../assets/images/social/photo-gallery-1.webp";
import social2 from "../../assets/images/social/photo-gallery-2.webp";
import social3 from "../../assets/images/social/photo-gallery-3.webp";
import social4 from "../../assets/images/social/photo-gallery-4.webp";
import social5 from "../../assets/images/social/photo-gallery-5.webp";

const SocialMedia = () => {
  return (
    <div className="container mx-auto text-center">
      <FaInstagram className="rounded-full text-white bg-primary w-14 h-14 p-2 mx-auto mb-3" />
      <h2 className="text-3xl md:text-5xl font-semibold">
        Follow @FoodPalace{" "}
      </h2>
      <p className="py-1">Join Our Community to inspire your desire</p>
      <div>
        <Swiper
          direction="horizontal"
          spaceBetween={10}
          controller={{ control: (swiper) => (window.swiper = swiper) }}
          slidesPerView={2}
          breakpoints={{
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          className="w-full mt-5"
        >
          <SwiperSlide className="text-white">
            <img src={social1} alt="Food" />
          </SwiperSlide>
          <SwiperSlide className="text-white">
            <img src={social2} alt="Food" />
          </SwiperSlide>
          <SwiperSlide className="text-white">
            <img src={social3} alt="Food" />
          </SwiperSlide>
          <SwiperSlide className="text-white">
            <img src={social4} alt="Food" />
          </SwiperSlide>
          <SwiperSlide className="text-white">
            <img src={social5} alt="Food" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SocialMedia;
