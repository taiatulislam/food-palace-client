import { FaInstagram } from "react-icons/fa6";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const SocialMedia = () => {
  return (
    <div className="container mx-auto text-center">
      <FaInstagram className="rounded-full text-white bg-[#dc3545] w-14 h-14 p-2 mx-auto mb-3" />
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
            <img
              src="https://i.ibb.co/8BzLBgv/photo-gallery-1.jpg"
              alt="Food"
            />
          </SwiperSlide>
          <SwiperSlide className="text-white">
            <img
              src="https://i.ibb.co/XW8tdKf/photo-gallery-2.jpg"
              alt="Food"
            />
          </SwiperSlide>
          <SwiperSlide className="text-white">
            <img
              src="https://i.ibb.co/CzDCSw3/photo-gallery-3.jpg"
              alt="Food"
            />
          </SwiperSlide>
          <SwiperSlide className="text-white">
            <img
              src="https://i.ibb.co/C0QZWVQ/photo-gallery-4.jpg"
              alt="Food"
            />
          </SwiperSlide>
          <SwiperSlide className="text-white">
            <img
              src="https://i.ibb.co/GRpXJ13/photo-gallery-5.jpg"
              alt="Food"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SocialMedia;
